"use client";

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
          {/* Close button */}
          <div className="flex justify-end px-4 py-3">
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
                onClick={onClose}
                className={`flex min-h-[44px] min-w-[44px] items-center justify-center px-6 py-3 text-xl font-medium transition-all duration-300 ease-in-out hover:text-brand-green ${
                  activeSection === id ? "text-brand-green" : "text-text-primary"
                }`}
              >
                {t(key)}
              </a>
            ))}

            <a
              href="#locations"
              onClick={onClose}
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
