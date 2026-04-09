"use client";

import { useState, type ReactNode } from "react";
import Header from "./Header";
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

export default function PageShell({ children, locationHours }: PageShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Header
        onMobileMenuOpen={() => setMobileMenuOpen(true)}
        locationHours={locationHours}
      />
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      {children}
    </>
  );
}
