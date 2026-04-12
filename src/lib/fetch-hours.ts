import { locations as fallbackLocations, type DayHours, type Location } from "@/data/locations";

/**
 * Map full day names (from the Google Sheet) to the 3-letter abbreviations
 * used by our Location data model.
 */
const DAY_ABBREV: Record<string, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

interface CsvRow {
  location_id: string;
  day: string;
  status: string;
  open_time: string;
  close_time: string;
  /** Optional vague UI text. Column may be absent in older sheet versions. */
  custom_display_text?: string;
}

/**
 * Split one CSV line into fields, correctly handling double-quoted values
 * that may contain commas (e.g. `"After lunch, until dinner"`).
 * Also handles escaped double-quotes inside quoted fields (`""` → `"`).
 */
function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped double-quote inside a quoted field.
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      fields.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current.trim()); // flush the final field
  return fields;
}

/**
 * Parse raw CSV text into typed rows.
 * Handles the headers: location_id, location_name, day, status, open_time, close_time
 * Optional 7th column: custom_display_text (quoted strings with commas supported).
 */
function parseCsv(raw: string): CsvRow[] {
  const lines = raw.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase());
  const idIdx = headers.indexOf("location_id");
  const dayIdx = headers.indexOf("day");
  const statusIdx = headers.indexOf("status");
  const openIdx = headers.indexOf("open_time");
  const closeIdx = headers.indexOf("close_time");
  // Optional 7th column — present only when the client adds vague display text.
  const displayIdx = headers.indexOf("custom_display_text");

  if ([idIdx, dayIdx, statusIdx, openIdx, closeIdx].includes(-1)) {
    throw new Error("CSV missing required columns");
  }

  return lines.slice(1).map((line) => {
    const cols = parseCsvLine(line);
    return {
      location_id: cols[idIdx],
      day: cols[dayIdx],
      status: cols[statusIdx],
      open_time: cols[openIdx],
      close_time: cols[closeIdx],
      // Only populate when the column exists and the cell is non-empty.
      custom_display_text:
        displayIdx !== -1 && cols[displayIdx] ? cols[displayIdx] : undefined,
    };
  });
}

/**
 * Convert parsed CSV rows into a map of location_id -> DayHours[].
 */
function rowsToHoursMap(rows: CsvRow[]): Record<string, DayHours[]> {
  const map: Record<string, DayHours[]> = {};

  for (const row of rows) {
    const id = row.location_id;
    if (!map[id]) map[id] = [];

    const abbrev = DAY_ABBREV[row.day.toLowerCase()];
    if (!abbrev) continue;

    const isClosed = row.status.toLowerCase() === "closed";

    // When closed, explicitly zero-out every time/display field regardless of
    // what the client left in the sheet, so ghost times can never leak through.
    map[id].push({
      day: abbrev,
      open: isClosed ? "Closed" : row.open_time,
      close: isClosed ? "" : row.close_time,
      // Suppress displayText for closed rows AND when the cell is empty.
      // isOpenNow() ignores this field entirely — it only reads open/close.
      ...(!isClosed && row.custom_display_text
        ? { displayText: row.custom_display_text }
        : {}),
    });
  }

  return map;
}

/**
 * Fetch dynamic hours from the published Google Sheet CSV.
 * Returns the full Location[] array with hours overridden from the sheet.
 * Falls back silently to hardcoded data on any failure.
 *
 * Uses Next.js `fetch` with `next.revalidate` for 1-hour ISR caching.
 */
export async function fetchLocationsWithHours(): Promise<Location[]> {
  const csvUrl = process.env.HOURS_CSV_URL;

  if (!csvUrl) {
    return fallbackLocations;
  }

  try {
    const res = await fetch(csvUrl, {
      next: { revalidate: 60 }, // DEV: short TTL for rapid iteration; raise to 3600 before final launch
    });

    if (!res.ok) {
      throw new Error(`CSV fetch failed: ${res.status}`);
    }

    const raw = await res.text();
    const rows = parseCsv(raw);
    const hoursMap = rowsToHoursMap(rows);

    // Merge dynamic hours into the static location data
    return fallbackLocations.map((loc) => ({
      ...loc,
      hours: hoursMap[loc.id] ?? loc.hours,
    }));
  } catch {
    // Silent fallback — no visible error to the user
    return fallbackLocations;
  }
}
