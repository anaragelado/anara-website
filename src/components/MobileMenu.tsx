"use client";

import { useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageToggle from "./LanguageToggle";

const NAV_LINKS = [
  { id: "story", key: "story" },
  { id: "menu", key: "menu" },
  { id: "takeaway", key: "takeaway" },
  { id: "locations", key: "locations" },
] as const;

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  activeSection: string;
}

export default function MobileMenu({ open, onClose, activeSection }: MobileMenuProps) {
  const t = useTranslations("nav");

  /** Close the menu first, then scroll to the target after the exit animation finishes. */
  const navigateTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      onClose();
      // Wait for the exit animation (300ms) to complete before scrolling.
      // Use window.scrollTo instead of scrollIntoView to avoid scrolling
      // intermediate containers, which can displace the sticky header.
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const headerOffset = 64;
          const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 400);
    },
    [onClose],
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[60] flex flex-col bg-background-secondary"
        >
          {/* Menu Header (Logo & Close Button) */}
          <div className="flex items-center justify-between px-4 py-3">
            <Image
              src="/assets/logo.svg"
              alt="Anara Gelado Artesanal"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center"
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-1 flex-col items-center justify-center gap-2">
            {NAV_LINKS.map(({ id, key }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => navigateTo(e, id)}
                className={`flex min-h-[44px] min-w-[44px] items-center justify-center px-6 py-3 transition-all duration-300 ease-in-out hover:text-brand-green ${
                  activeSection === id
                    ? "text-2xl font-bold text-brand-green"
                    : "text-xl font-medium text-text-primary"
                }`}
              >
                {t(key)}
              </a>
            ))}

            <a
              href="#locations"
              onClick={(e) => navigateTo(e, "locations")}
              className="mt-4 rounded-full bg-brand-yellow px-8 py-3 text-sm font-semibold text-text-primary transition-all duration-300 ease-in-out hover:scale-105 hover:bg-brand-green hover:text-white"
            >
              {t("visitUs")}
            </a>
          </nav>

          {/* Language toggle at the bottom */}
          <div className="flex justify-center pb-10">
            <LanguageToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
