"use client";

import { useState } from "react";
import Image from "next/image";

/* ── Color sequence (from Brand Guidelines) ── */

const SEQUENCE = [
  { label: "Story", color: "#FF7802" },
  { label: "Menu", color: "#FDDB00" },
  { label: "Takeaway", color: "#68B34A" },
  { label: "Reviews", color: "#DEA361" },
  { label: "Locations", color: "#EA567A" },
] as const;

const OPTIONS = [
  { label: "Opt 1", description: "Full-width color block above each section" },
  { label: "Opt 2", description: "Colored accent dot next to headline" },
  { label: "Opt 3", description: "Fixed top-edge 5-color gradient bar" },
  { label: "Opt 4", description: "Card with colored top border" },
  { label: "Opt 5", description: "Thin minimalist top border line" },
  { label: "Opt 6", description: "Instagram-style colored ring around image" },
] as const;

/* ── Dummy content for each section ── */

const DUMMY_TEXT = [
  "We use Bourbon Vanilla from Madagascar, fresh fruit with 50–75% pure content, real milk and cream — and absolutely zero artificial additives, colorings, or powders. Every flavor is handcrafted in small batches at our kitchen in Charneca de Caparica.",
  "Belgian Chocolate, Salted Pistachio, Strawberry, Mango, Bourbon Vanilla, Pastel de Nata, Lemon, Cookies & Cream, Matcha, Dark Chocolate, Coconut, Watermelon. All flavors are Gluten-Free except Oreo.",
  "Our takeaway packaging is fully recyclable. We believe delicious gelato and environmental responsibility go hand in hand. From sourcing local ingredients to eco-friendly packaging — every decision is made with the planet in mind.",
  '"Simply the best Gelado in Caparica! Highly recommend pistachio and Belgian chocolate." — Kristine. "The best ice cream on the coast! Very good, handcrafted." — Marina.',
  "HQ: Estrada da Bela Vista 144, Charneca de Caparica. Mobile Shop: Av. Gen. Humberto Delgado 3, Costa de Caparica. Our mobile shop is available for weddings, private parties, and corporate events.",
];

const SECTION_IMAGES = [
  "/assets/images/ingredient-fresh-mangoes-crates-overhead.jpg",
  "/assets/images/cone-morango-natas-com-calda-de-morango-v1.jpg",
  "/assets/images/food-cart-exterior-with-anara-branding-sign.jpg",
  "/assets/images/ambiance-sunset-customer-enjoying-gelato-cup.jpg",
  "/assets/images/food-cart-exterior-yellow-trailer-front-view.jpg",
];

/* ── Section renderers per option ── */

function SectionOpt1({
  label,
  color,
  text,
}: {
  label: string;
  color: string;
  text: string;
}) {
  return (
    <section>
      <div style={{ backgroundColor: color }} className="h-5 w-full" />
      <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
        <h2 className="font-heading text-2xl font-bold md:text-3xl">{label}</h2>
        <p className="mt-4 text-text-secondary">{text}</p>
      </div>
    </section>
  );
}

function SectionOpt2({
  label,
  color,
  text,
}: {
  label: string;
  color: string;
  text: string;
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <h2 className="flex items-center gap-3 font-heading text-2xl font-bold md:text-3xl">
        <span style={{ color }} className="text-4xl leading-none">
          &bull;
        </span>
        {label}
      </h2>
      <p className="mt-4 text-text-secondary">{text}</p>
    </section>
  );
}

function SectionOpt3({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <h2 className="font-heading text-2xl font-bold md:text-3xl">{label}</h2>
      <p className="mt-4 text-text-secondary">{text}</p>
    </section>
  );
}

function SectionOpt4({
  label,
  color,
  text,
}: {
  label: string;
  color: string;
  text: string;
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <div
        className="rounded-2xl bg-background-secondary p-6 shadow-md md:p-8"
        style={{ borderTop: `4px solid ${color}` }}
      >
        <h2 className="font-heading text-2xl font-bold md:text-3xl">{label}</h2>
        <p className="mt-4 text-text-secondary">{text}</p>
      </div>
    </section>
  );
}

function SectionOpt5({
  label,
  color,
  text,
}: {
  label: string;
  color: string;
  text: string;
}) {
  return (
    <section
      className="mx-auto max-w-5xl px-4 py-16 md:px-8"
      style={{ borderTop: `1px solid ${color}80` }}
    >
      <h2 className="font-heading text-2xl font-bold md:text-3xl">{label}</h2>
      <p className="mt-4 text-text-secondary">{text}</p>
    </section>
  );
}

function SectionOpt6({
  label,
  color,
  text,
  imageSrc,
}: {
  label: string;
  color: string;
  text: string;
  imageSrc: string;
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <div className="flex items-center gap-4">
        <div
          className="flex-shrink-0 rounded-full p-[2px]"
          style={{ background: color }}
        >
          <div className="h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={imageSrc}
              alt={label}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <h2 className="font-heading text-2xl font-bold md:text-3xl">{label}</h2>
      </div>
      <p className="mt-4 text-text-secondary">{text}</p>
    </section>
  );
}

/* ── Page ── */

export default function ColorTestPage() {
  const [activeOption, setActiveOption] = useState(0);

  return (
    <div>
      {/* Option 3: fixed gradient bar at top of viewport */}
      {activeOption === 2 && (
        <div
          className="fixed top-0 left-0 z-[70] h-2 w-full"
          style={{
            background: `linear-gradient(to right, ${SEQUENCE.map((s) => s.color).join(", ")})`,
          }}
        />
      )}

      {/* Header */}
      <div
        className={`sticky z-50 bg-background-secondary shadow-xl shadow-black/5 ${
          activeOption === 2 ? "top-2" : "top-0"
        }`}
      >
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
        <div className="border-t border-gray-100 bg-background-primary px-4 py-2 text-center text-xs text-text-secondary">
          {OPTIONS[activeOption].description}
        </div>
      </div>

      {/* Color legend */}
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3 px-4 py-6">
        {SEQUENCE.map((s) => (
          <span key={s.label} className="flex items-center gap-1.5 text-xs text-text-secondary">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            {s.label}
          </span>
        ))}
      </div>

      {/* Sections */}
      {SEQUENCE.map((s, i) => {
        const props = { label: s.label, color: s.color, text: DUMMY_TEXT[i] };

        switch (activeOption) {
          case 0:
            return <SectionOpt1 key={s.label} {...props} />;
          case 1:
            return <SectionOpt2 key={s.label} {...props} />;
          case 2:
            return <SectionOpt3 key={s.label} label={s.label} text={DUMMY_TEXT[i]} />;
          case 3:
            return <SectionOpt4 key={s.label} {...props} />;
          case 4:
            return <SectionOpt5 key={s.label} {...props} />;
          case 5:
            return (
              <SectionOpt6
                key={s.label}
                {...props}
                imageSrc={SECTION_IMAGES[i]}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
