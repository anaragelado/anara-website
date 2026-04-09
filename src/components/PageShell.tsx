"use client";

import { useState, type ReactNode } from "react";
import Header from "./Header";
import MobileMenu from "./MobileMenu";

export default function PageShell({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Header onMobileMenuOpen={() => setMobileMenuOpen(true)} />
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      {children}
    </>
  );
}
