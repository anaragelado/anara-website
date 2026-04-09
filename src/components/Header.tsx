"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Menu } from "lucide-react";
const NAV_LINKS = [
  { id: "story", key: "story" },
  { id: "menu", key: "menu" },
  { id: "takeaway", key: "takeaway" },
  { id: "locations", key: "locations" },
] as const;

interface HeaderProps {
  onMobileMenuOpen: () => void;
}

export default function Header({ onMobileMenuOpen }: HeaderProps) {
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
        {/* Logo */}
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

        {/* Desktop Anchor Links */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map(({ id, key }) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm font-medium text-text-primary transition-all duration-300 ease-in-out hover:text-brand-green"
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
