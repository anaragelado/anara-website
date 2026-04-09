export interface DayHours {
  day: string;
  open: string;
  close: string;
}

export interface Location {
  id: "hq" | "mobile";
  name: string;
  address: string;
  mapsUrl: string;
  lat: number;
  lng: number;
  hours: DayHours[];
}

/**
 * Static fallback hours — used when the Google Sheet is unavailable.
 * Task 3.5 will add dynamic fetching that overrides these.
 */
export const locations: Location[] = [
  {
    id: "hq",
    name: "Anara Gelado Artesanal",
    address: "Estrada da Bela Vista 144, 2820-166 Charneca de Caparica",
    mapsUrl: "https://maps.app.goo.gl/2eSjBQy21V8MnQ9U7",
    lat: 38.6290808471835,
    lng: -9.18808227289466,
    hours: [
      { day: "Mon", open: "Closed", close: "" },
      { day: "Tue", open: "12:00", close: "19:00" },
      { day: "Wed", open: "12:00", close: "19:00" },
      { day: "Thu", open: "12:00", close: "19:00" },
      { day: "Fri", open: "12:00", close: "19:00" },
      { day: "Sat", open: "12:00", close: "20:00" },
      { day: "Sun", open: "12:00", close: "20:00" },
    ],
  },
  {
    id: "mobile",
    name: "Anara Gelado Artesanal — Caparica",
    address: "Av. Gen. Humberto Delgado 3, 2825-337 Costa de Caparica",
    mapsUrl: "https://maps.app.goo.gl/qWspRKD1hvDDoyhq6",
    lat: 38.64057216634567,
    lng: -9.23595848206488,
    hours: [
      { day: "Mon", open: "Closed", close: "" },
      { day: "Tue", open: "13:00", close: "20:00" },
      { day: "Wed", open: "13:00", close: "20:00" },
      { day: "Thu", open: "13:00", close: "20:00" },
      { day: "Fri", open: "13:00", close: "20:00" },
      { day: "Sat", open: "12:00", close: "21:00" },
      { day: "Sun", open: "12:00", close: "21:00" },
    ],
  },
];

/**
 * Check if a location is currently open based on its hours and the current
 * time in the Lisbon timezone (Europe/Lisbon).
 */
export function isOpenNow(hours: DayHours[]): boolean {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Lisbon" })
  );
  const dayIndex = now.getDay(); // 0=Sun
  const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = hours.find((h) => h.day === dayMap[dayIndex]);

  if (!today || today.open === "Closed") return false;

  const [openH, openM] = today.open.split(":").map(Number);
  const [closeH, closeM] = today.close.split(":").map(Number);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}
