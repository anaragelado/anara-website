"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Playfair_Display,
  Amatic_SC,
  Montserrat,
  Caveat,
  Cormorant_Garamond,
  Work_Sans,
  Bodoni_Moda,
} from "next/font/google";

/* ── Font instances (module scope, required by next/font) ── */

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-test-playfair",
  display: "swap",
});

const playfairItalic = Playfair_Display({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-test-playfair-italic",
  display: "swap",
});

const amatic = Amatic_SC({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-test-amatic",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-test-montserrat",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-test-caveat",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-test-cormorant",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-test-worksans",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-test-bodoni",
  display: "swap",
});

/* ── Font pairing definitions ── */

interface FontOption {
  label: string;
  h1Class: string;
  h1Weight: string;
  h2Class: string;
  h2Weight: string;
  description: string;
}

const OPTIONS: FontOption[] = [
  {
    label: "Opt 1",
    h1Class: "var(--font-test-playfair)",
    h1Weight: "font-bold",
    h2Class: "var(--font-test-amatic)",
    h2Weight: "font-normal",
    description: "Playfair Display + Amatic SC (current)",
  },
  {
    label: "Opt 2",
    h1Class: "var(--font-test-montserrat)",
    h1Weight: "font-light",
    h2Class: "var(--font-test-caveat)",
    h2Weight: "font-normal",
    description: "Montserrat Light + Caveat",
  },
  {
    label: "Opt 3",
    h1Class: "var(--font-test-cormorant)",
    h1Weight: "font-semibold",
    h2Class: "var(--font-test-worksans)",
    h2Weight: "font-light",
    description: "Cormorant Garamond + Work Sans",
  },
  {
    label: "Opt 4",
    h1Class: "var(--font-test-bodoni)",
    h1Weight: "font-normal",
    h2Class: "var(--font-test-playfair-italic)",
    h2Weight: "font-normal italic",
    description: "Bodoni Moda + Playfair Display Italic",
  },
  {
    label: "Opt 5",
    h1Class: "var(--font-test-worksans)",
    h1Weight: "font-light",
    h2Class: "var(--font-test-amatic)",
    h2Weight: "font-bold",
    description: "Work Sans Light + Amatic SC",
  },
];

/* ── All CSS variable classes combined ── */

const FONT_VARS = [
  playfair.variable,
  playfairItalic.variable,
  amatic.variable,
  montserrat.variable,
  caveat.variable,
  cormorant.variable,
  workSans.variable,
  bodoni.variable,
].join(" ");

export default function FontTestPage() {
  const t = useTranslations("hero");
  const [activeOption, setActiveOption] = useState(0);
  const option = OPTIONS[activeOption];

  return (
    <div className={FONT_VARS}>
      {/* Font-test header */}
      <div className="sticky top-0 z-50 bg-background-secondary shadow-xl shadow-black/5">
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-3 md:justify-center md:px-8">
          {OPTIONS.map((opt, i) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => setActiveOption(i)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ease-in-out ${
                activeOption === i
                  ? "bg-brand-yellow text-text-primary"
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {/* Active option description */}
        <div className="border-t border-gray-100 bg-background-primary px-4 py-2 text-center text-xs text-text-secondary">
          {option.description}
        </div>
      </div>

      {/* Hero section replica */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        {/* Mobile video */}
        <video
          className="absolute inset-0 h-full w-full object-cover md:hidden"
          src="/assets/videos/hero-video-smartphone.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        {/* Desktop video */}
        <video
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
          src="/assets/videos/hero-video-desktop.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Text */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center md:px-8">
          <h1
            className={`text-4xl tracking-tight text-white md:text-6xl lg:text-7xl ${option.h1Weight}`}
            style={{ fontFamily: option.h1Class }}
          >
            {t("headline")}
          </h1>
          <h2
            className={`mt-4 text-3xl text-white/90 md:text-5xl lg:text-6xl ${option.h2Weight}`}
            style={{ fontFamily: option.h2Class }}
          >
            {t("subheadline")}
          </h2>
          <a
            href="#"
            className="mt-8 inline-block rounded-full bg-brand-yellow px-8 py-3 text-sm font-semibold text-text-primary transition-all duration-300 ease-in-out hover:scale-105 hover:bg-brand-green hover:text-white"
          >
            {t("cta")}
          </a>
        </div>
      </section>
    </div>
  );
}
