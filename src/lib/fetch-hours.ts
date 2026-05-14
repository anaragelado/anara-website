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
  /** Optional bilingual vague display text — absent in older sheet versions. */
  custom_display_text_pt?: string;
  custom_display_text_en?: string;
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
 * Required columns: location_id, location_name, day, status, open_time, close_time
 * Optional columns: custom_display_text_pt, custom_display_text_en
 */
function parseCsv(raw: string): CsvRow[] {
  const lines = raw.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase());
  const idIdx      = headers.indexOf("location_id");
  const dayIdx     = headers.indexOf("day");
  const statusIdx  = headers.indexOf("status");
  const openIdx    = headers.indexOf("open_time");
  const closeIdx   = headers.indexOf("close_time");
  // Optional bilingual display columns — absent on older sheet versions.
  const displayPtIdx = headers.indexOf("custom_display_text_pt");
  const displayEnIdx = headers.indexOf("custom_display_text_en");

  if ([idIdx, dayIdx, statusIdx, openIdx, closeIdx].includes(-1)) {
    throw new Error("CSV missing required columns");
  }

  return lines.slice(1).map((line) => {
    const cols = parseCsvLine(line);
    return {
      location_id: cols[idIdx],
      day:         cols[dayIdx],
      status:      cols[statusIdx],
      open_time:   cols[openIdx],
      close_time:  cols[closeIdx],
      custom_display_text_pt:
        displayPtIdx !== -1 && cols[displayPtIdx] ? cols[displayPtIdx] : undefined,
      custom_display_text_en:
        displayEnIdx !== -1 && cols[displayEnIdx] ? cols[displayEnIdx] : undefined,
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

    // Times are zeroed for closed rows so ghost times never leak through.
    // Display text IS allowed on closed rows — it carries intentional messages
    // like "Opening soon" that replace the default "Closed" label in the UI.
    // isOpenNow() only reads open/close, so display text never affects status.
    map[id].push({
      day:   abbrev,
      open:  isClosed ? "Closed" : row.open_time,
      close: isClosed ? ""       : row.close_time,
      ...(row.custom_display_text_pt
        ? { displayTextPt: row.custom_display_text_pt } : {}),
      ...(row.custom_display_text_en
        ? { displayTextEn: row.custom_display_text_en } : {}),
    });
  }

  return map;
}

/**
 * Fetch dynamic hours from the published Google Sheet CSV.
 * Returns the full Location[] array with hours overridden from the sheet.
 * Falls back silently to hardcoded data on any failure.
 */
export async function fetchLocationsWithHours(): Promise<Location[]> {
  // Accept either env var name in case the Vercel variable was saved under
  // the NEXT_PUBLIC_ prefix.
  const csvUrl = process.env.HOURS_CSV_URL || process.env.NEXT_PUBLIC_HOURS_CSV_URL;

  if (!csvUrl) {
    return fallbackLocations;
  }

  try {
    const res = await fetch(csvUrl, { next: { revalidate: 60 } });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const raw = await res.text();
    const rows = parseCsv(raw);
    const hoursMap = rowsToHoursMap(rows);

    // Merge dynamic hours into the static location data.
    return fallbackLocations.map((loc) => ({
      ...loc,
      hours: hoursMap[loc.id] ?? loc.hours,
    }));
  } catch {
    // Silent fallback — no visible error to the user.
    return fallbackLocations;
  }
}
