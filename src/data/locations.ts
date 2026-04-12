export interface DayHours {
  day: string;
  /** Strict HH:MM time used exclusively for open/closed math. Never vague text. */
  open: string;
  /** Strict HH:MM time used exclusively for open/closed math. Never vague text. */
  close: string;
  /**
   * Optional vague display string shown in the UI instead of the raw times
   * (e.g. "After lunch until after dinner"). The open/close fields still hold
   * the real times so isOpenNow() keeps working correctly.
   */
  displayText?: string;
}

export interface Location {
  id: "hq" | "mobile";
  name: string;
  address: string;
  mapsUrl: string;
  lat: number;
  lng: number;
  image: string;
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
    image: "/assets/images/anara-gelado-artesanal-charneca-da-caparica-shop.jpg",
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
    image: "/assets/images/food-cart-exterior-yellow-trailer-front-view.jpg",
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

export type LocationStatus = "open" | "closingSoon" | "openSoon" | "closed";

/** Get the current time in Lisbon as total minutes and today's hours entry. */
function getLisbonContext(hours: DayHours[]) {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Lisbon" })
  );
  const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = hours.find((h) => h.day === dayMap[now.getDay()]);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return { today, currentMinutes };
}

/**
 * Check if a location is currently open based on its hours and the current
 * time in the Lisbon timezone (Europe/Lisbon).
 */
export function isOpenNow(hours: DayHours[]): boolean {
  return getLocationStatus(hours) === "open" || getLocationStatus(hours) === "closingSoon";
}

/**
 * Returns a granular status for a location:
 * - "open": currently open, more than 30 min until close
 * - "closingSoon": currently open, 30 min or less until close
 * - "openSoon": currently closed, opens within 1 hour
 * - "closed": closed and not opening within 1 hour
 */
export function getLocationStatus(hours: DayHours[]): LocationStatus {
  const { today, currentMinutes } = getLisbonContext(hours);

  // Guard 1: no entry for today, explicitly closed, or missing time strings.
  if (!today || !today.open || today.open === "Closed" || !today.close) return "closed";

  const [openH, openM] = today.open.split(":").map(Number);
  const [closeH, closeM] = today.close.split(":").map(Number);

  // Guard 2: malformed time strings (e.g. non-numeric after split) → treat as closed.
  if ([openH, openM, closeH, closeM].some(isNaN)) return "closed";

  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    // Currently open
    const minutesUntilClose = closeMinutes - currentMinutes;
    return minutesUntilClose <= 30 ? "closingSoon" : "open";
  }

  // Currently closed — check if opening soon
  if (currentMinutes < openMinutes) {
    const minutesUntilOpen = openMinutes - currentMinutes;
    return minutesUntilOpen <= 60 ? "openSoon" : "closed";
  }

  return "closed";
}
