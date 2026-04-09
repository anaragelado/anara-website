"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Menu } from "lucide-react";
import { isOpenNow, type DayHours } from "@/data/locations";

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

type OpenState = "both" | "hq" | "mobile" | "closed";

function useOpenState(locationHours: LocationHours[]): { state: OpenState; mounted: boolean } {
  const [state, setState] = useState<OpenState>("closed");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => {
      const hqOpen = locationHours.find((l) => l.id === "hq");
      const mobileOpen = locationHours.find((l) => l.id === "mobile");
      const hq = hqOpen ? isOpenNow(hqOpen.hours) : false;
      const mobile = mobileOpen ? isOpenNow(mobileOpen.hours) : false;

      if (hq && mobile) setState("both");
      else if (mobile) setState("mobile");
      else if (hq) setState("hq");
      else setState("closed");
    };
    check();
    const interval = setInterval(check, 60_000);
    return () => clearInterval(interval);
  }, [locationHours]);

  return { state, mounted };
}

function OpenBadge({ locationHours }: { locationHours: LocationHours[] }) {
  const t = useTranslations("nav");
  const { state, mounted } = useOpenState(locationHours);

  if (!mounted) return null;

  const isOpen = state !== "closed";
  const labelKey = {
    both: "openAll",
    hq: "openHq",
    mobile: "openMobile",
    closed: "closedNow",
  }[state];

  return (
    <a
      href="#locations"
      className="inline-flex items-center gap-1.5 rounded-full border border-gray-100 px-2.5 py-1 text-xs font-medium transition-all duration-300 ease-in-out hover:border-gray-200"
    >
      <span
        className={`h-2 w-2 flex-shrink-0 rounded-full transition-colors duration-300 ${isOpen ? "bg-brand-green animate-pulse" : "bg-red-400"}`}
      />
      <span className="whitespace-nowrap transition-all duration-300">
        {t(labelKey)}
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
      className={`sticky top-0 z-50 bg-background-secondary transition-shadow duration-300 ${
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
              className={`relative text-sm font-medium transition-all duration-300 ease-in-out hover:text-brand-green ${
                activeSection === id ? "text-brand-green" : "text-text-primary"
              }`}
            >
              {t(key)}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-brand-green transition-all duration-300 ${
                  activeSection === id ? "w-full" : "w-0"
                }`}
              />
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
