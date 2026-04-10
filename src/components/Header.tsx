"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Menu } from "lucide-react";
import { getLocationStatus, type DayHours, type LocationStatus } from "@/data/locations";

const NAV_LINKS = [
  { id: "story", key: "story" },
  { id: "menu", key: "menu" },
  { id: "takeaway", key: "takeaway" },
  { id: "locations", key: "locations" },
] as const;

/** Section IDs tracked by the active-section observer */
export const SECTION_IDS = NAV_LINKS.map((l) => l.id);

interface LocationHours {
  id: string;
  hours: DayHours[];
}

interface HeaderProps {
  onMobileMenuOpen: () => void;
  locationHours: LocationHours[];
  activeSection: string;
}

/**
 * Badge state — derived from per-location statuses.
 * Priority: closingSoon > open > openSoon > closed
 */
type BadgeState =
  | "both" | "hq" | "mobile"
  | "closingBoth" | "closingHq" | "closingMobile"
  | "openingSoonBoth" | "openingSoonHq" | "openingSoonMobile"
  | "closed";

function deriveBadgeState(hq: LocationStatus, mobile: LocationStatus): BadgeState {
  const hqClosing = hq === "closingSoon";
  const mobileClosing = mobile === "closingSoon";
  const hqOpen = hq === "open" || hq === "closingSoon";
  const mobileOpen = mobile === "open" || mobile === "closingSoon";
  const hqSoon = hq === "openSoon";
  const mobileSoon = mobile === "openSoon";

  // Priority 1: closing soon (most urgent)
  if (hqClosing && mobileClosing) return "closingBoth";
  if (hqClosing) return "closingHq";
  if (mobileClosing) return "closingMobile";

  // Priority 2: open
  if (hqOpen && mobileOpen) return "both";
  if (hqOpen) return "hq";
  if (mobileOpen) return "mobile";

  // Priority 3: opening soon
  if (hqSoon && mobileSoon) return "openingSoonBoth";
  if (hqSoon) return "openingSoonHq";
  if (mobileSoon) return "openingSoonMobile";

  return "closed";
}

function useBadgeState(locationHours: LocationHours[]): { state: BadgeState; mounted: boolean } {
  const [state, setState] = useState<BadgeState>("closed");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => {
      const hqData = locationHours.find((l) => l.id === "hq");
      const mobileData = locationHours.find((l) => l.id === "mobile");
      const hq: LocationStatus = hqData ? getLocationStatus(hqData.hours) : "closed";
      const mobile: LocationStatus = mobileData ? getLocationStatus(mobileData.hours) : "closed";
      setState(deriveBadgeState(hq, mobile));
    };
    check();
    const interval = setInterval(check, 60_000);
    return () => clearInterval(interval);
  }, [locationHours]);

  return { state, mounted };
}

const badgeLabelKey: Record<BadgeState, string> = {
  both: "openAll",
  hq: "openHq",
  mobile: "openMobile",
  closingBoth: "closingSoonAll",
  closingHq: "closingSoonHq",
  closingMobile: "closingSoonMobile",
  openingSoonBoth: "openSoonAll",
  openingSoonHq: "openSoonHq",
  openingSoonMobile: "openSoonMobile",
  closed: "closedNow",
};

function badgeDotClass(state: BadgeState): string {
  if (state.startsWith("closing")) return "bg-brand-yellow animate-pulse";
  if (state === "both" || state === "hq" || state === "mobile") return "bg-brand-green animate-pulse";
  if (state.startsWith("opening")) return "bg-brand-yellow";
  return "bg-red-400";
}

function OpenBadge({ locationHours }: { locationHours: LocationHours[] }) {
  const t = useTranslations("nav");
  const { state, mounted } = useBadgeState(locationHours);

  if (!mounted) return null;

  return (
    <a
      href="#locations"
      className="inline-flex items-center gap-1.5 rounded-full border border-gray-100 px-2.5 py-1 text-xs font-medium transition-all duration-300 ease-in-out hover:border-highlight-green"
    >
      <span
        className={`h-2 w-2 flex-shrink-0 rounded-full transition-colors duration-300 ${badgeDotClass(state)}`}
      />
      <span className="whitespace-nowrap transition-all duration-300">
        {t(badgeLabelKey[state])}
      </span>
    </a>
  );
}

export default function Header({ onMobileMenuOpen, locationHours, activeSection }: HeaderProps) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-background-secondary transition-shadow duration-300 ${
        scrolled ? "shadow-xl shadow-black/5" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        {/* Logo + Open badge */}
        <div className="flex items-center gap-3">
          <a href="#hero" className="flex-shrink-0">
            <Image
              src="/assets/logo.svg"
              alt="Anara Gelado Artesanal"
              width={120}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </a>
          <OpenBadge locationHours={locationHours} />
        </div>

        {/* Desktop Anchor Links */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map(({ id, key }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`transition-all duration-300 ease-in-out hover:text-brand-green ${
                activeSection === id
                  ? "text-base font-bold text-brand-green"
                  : "text-sm font-medium text-text-primary"
              }`}
            >
              {t(key)}
            </a>
          ))}
        </nav>

        {/* Desktop Right: CTA */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="#locations"
            className="rounded-full bg-brand-yellow px-5 py-2 text-sm font-semibold text-text-primary transition-all duration-300 ease-in-out hover:scale-105 hover:bg-brand-green hover:text-white"
          >
            {t("visitUs")}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={onMobileMenuOpen}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
