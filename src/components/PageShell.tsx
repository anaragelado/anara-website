"use client";

import { useState, type ReactNode } from "react";
import Header from "./Header";

export default function PageShell({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Header onMobileMenuOpen={() => setMobileMenuOpen(true)} />
      {/* MobileMenu component will be added in task 2.4 */}
      {children}
    </>
  );
}
