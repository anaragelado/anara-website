"use client";

import { useState, useEffect, type ReactNode } from "react";
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

  useEffect(() => {
    const elements = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] }
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
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
      />
      {children}
    </>
  );
}
