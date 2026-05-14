"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Menu } from "lucide-react";
import { getLocationStatus, type DayHours, type LocationStatus } from "@/data/locations";

const NAV_LINKS = [
  { id: "story", key: "story" },
  { id: "menu", key: "menu" },
  { id: "creations", key: "creations" },
  { id: "takeaway", key: "takeaway" },
  { id: "locations", key: "locations" },
  { id: "reviews", key: "reviews" },
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

function useLocationsStatus(locationHours: LocationHours[]) {
  const [statuses, setStatuses] = useState<{ hq: LocationStatus; mobile: LocationStatus }>({
    hq: "closed",
    mobile: "closed",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => {
      const hqData = locationHours.find((l) => l.id === "hq");
      const mobileData = locationHours.find((l) => l.id === "mobile");
      setStatuses({
        hq: hqData ? getLocationStatus(hqData.hours) : "closed",
        mobile: mobileData ? getLocationStatus(mobileData.hours) : "closed",
      });
    };
    check();
    const interval = setInterval(check, 60_000);
    return () => clearInterval(interval);
  }, [locationHours]);

  return { statuses, mounted };
}

function LocationBadge({ type, status }: { type: "hq" | "mobile"; status: LocationStatus }) {
  const tLoc = useTranslations("locations");

  const isClosed = status === "closed";
  const labelKey = status === "open" ? "openNow" : status;
  const paddingClass = isClosed ? "px-2 py-0.5" : "px-3 py-1";
  const textSize = isClosed ? "text-[10px]" : "text-xs";

  const dotClass = {
    open: "bg-brand-green",
    closingSoon: "bg-brand-yellow animate-pulse",
    openSoon: "bg-brand-yellow",
    closed: "bg-red-400",
  }[status];

  const prefix = type === "hq" ? "Charneca" : "Costa";

  return (
    <a
      href="#locations"
      className={`inline-flex items-center gap-1.5 rounded-full border border-gray-100 bg-background-secondary ${paddingClass} ${textSize} font-medium shadow-sm transition-all duration-300 ease-in-out hover:border-highlight-green`}
    >
      <span className={`h-2 w-2 flex-shrink-0 rounded-full transition-colors duration-300 ${dotClass}`} />
      <span className="whitespace-nowrap transition-all duration-300">
        <span className="font-bold mr-1">{prefix}</span>
        <span className="font-normal text-text-secondary">{tLoc(labelKey)}</span>
      </span>
    </a>
  );
}

function CombinedBadge({ status }: { status: LocationStatus }) {
  const tNav = useTranslations("nav");

  const labelKey = {
    open: "openAll",
    closingSoon: "closingSoonAll",
    openSoon: "openSoonAll",
    closed: "closedNow",
  }[status] as "openAll" | "closingSoonAll" | "openSoonAll" | "closedNow";

  const dotClass = {
    open: "bg-brand-green",
    closingSoon: "bg-brand-yellow animate-pulse",
    openSoon: "bg-brand-yellow",
    closed: "bg-red-400",
  }[status];

  const isClosed = status === "closed";
  const paddingClass = isClosed ? "px-2 py-0.5" : "px-3 py-1";
  const textSize = isClosed ? "text-[10px]" : "text-xs";

  return (
    <a
      href="#locations"
      className={`inline-flex items-center gap-1.5 rounded-full border border-gray-100 bg-background-secondary ${paddingClass} ${textSize} font-medium shadow-sm transition-all duration-300 ease-in-out hover:border-highlight-green`}
    >
      <span className={`h-2 w-2 flex-shrink-0 rounded-full transition-colors duration-300 ${dotClass}`} />
      <span className="whitespace-nowrap font-medium">{tNav(labelKey)}</span>
    </a>
  );
}

export default function Header({ onMobileMenuOpen, locationHours, activeSection }: HeaderProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const { statuses, mounted } = useLocationsStatus(locationHours);

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
      <div className="mx-auto flex max-w-7xl items-center justify-between relative px-4 py-3 md:px-8">
        {/* Mobile Centered Open badge */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
          {mounted && (
            statuses.hq === statuses.mobile ? (
              <CombinedBadge status={statuses.hq} />
            ) : (
              <div className="flex flex-col gap-0.5 items-center justify-center">
                <LocationBadge type="hq" status={statuses.hq} />
                <LocationBadge type="mobile" status={statuses.mobile} />
              </div>
            )
          )}
        </div>

        {/* Logo + Desktop Open badge */}
        <div className="flex items-center gap-3">
          <a href={`/${locale}#hero`} className="flex-shrink-0">
            <Image
              src="/assets/logo.svg"
              alt="Anara Gelado Artesanal"
              width={120}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </a>
          {mounted && (
            <div className="hidden md:flex items-center gap-2">
              {statuses.hq === statuses.mobile ? (
                <CombinedBadge status={statuses.hq} />
              ) : (
                <>
                  <LocationBadge type="hq" status={statuses.hq} />
                  <LocationBadge type="mobile" status={statuses.mobile} />
                </>
              )}
            </div>
          )}
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
