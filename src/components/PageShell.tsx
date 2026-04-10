"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Header, { SECTION_IDS } from "./Header";
import MobileMenu from "./MobileMenu";
import type { DayHours } from "@/data/locations";

interface LocationHours {
  id: string;
  hours: DayHours[];
}

interface PageShellProps {
  children: ReactNode;
  locationHours: LocationHours[];
}

function useActiveSection() {
  const [active, setActive] = useState("");
  const ratios = useRef(new Map<string, number>());

  useEffect(() => {
    // Include "hero" so we can detect when the user scrolls back to the top
    const allIds = ["hero", ...SECTION_IDS];
    const elements = allIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Update the persistent ratio map with this batch of entries
        for (const entry of entries) {
          ratios.current.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }

        // Find the element with the highest intersection ratio
        let bestId = "";
        let bestRatio = 0;
        for (const [id, ratio] of ratios.current) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        // When hero wins (or nothing visible), clear active
        setActive(bestId === "hero" || bestRatio === 0 ? "" : bestId);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

export default function PageShell({ children, locationHours }: PageShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  return (
    <>
      <Header
        onMobileMenuOpen={() => setMobileMenuOpen(true)}
        locationHours={locationHours}
        activeSection={activeSection}
      />
      {/* Spacer for fixed header — hero bleeds behind it via negative margin */}
      <div className="h-16" aria-hidden="true" />
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
      />
      {children}
    </>
  );
}
