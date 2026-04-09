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
}

/**
 * Parse raw CSV text into typed rows.
 * Handles the headers: location_id, location_name, day, status, open_time, close_time
 */
function parseCsv(raw: string): CsvRow[] {
  const lines = raw.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const idIdx = headers.indexOf("location_id");
  const dayIdx = headers.indexOf("day");
  const statusIdx = headers.indexOf("status");
  const openIdx = headers.indexOf("open_time");
  const closeIdx = headers.indexOf("close_time");

  if ([idIdx, dayIdx, statusIdx, openIdx, closeIdx].includes(-1)) {
    throw new Error("CSV missing required columns");
  }

  return lines.slice(1).map((line) => {
    const cols = line.split(",").map((c) => c.trim());
    return {
      location_id: cols[idIdx],
      day: cols[dayIdx],
      status: cols[statusIdx],
      open_time: cols[openIdx],
      close_time: cols[closeIdx],
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

    map[id].push({
      day: abbrev,
      open: isClosed ? "Closed" : row.open_time,
      close: isClosed ? "" : row.close_time,
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
      next: { revalidate: 3600 },
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
