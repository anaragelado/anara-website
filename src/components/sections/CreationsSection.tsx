"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/SectionWrapper";
import FadeIn from "@/components/FadeIn";

const creationsList = [
  "Baunilha com calda de Abrunho",
  "Bolo de Cenoura",
  "Café c/ Laranja Cardamomo e Brownie",
  "Cereja do Fundão",
  "Chocolate Masala com Laranja do Alg.",
  "Chocolate ped. chocolate Framboesa",
  "Doce de Leite Argentino c/ Amendoas",
  "Figo Pingo de Mel",
  "Kombucha de Maracujá",
  "Laranja do Alg. c/ clementina e hortela",
  "Limao com Pepino e Hortela",
  "Manga com Coentros",
  "Mascarpone Manjericão",
  "Melancia Especial",
  "Morango Natas com calda Morango",
  "Morango com pedaços Chocolate",
  "Natas com Toffee e Pinhoes",
  "Pastel de Nata",
  "Requeijao c/ Figos caramelizados",
  "Salame de Chocolate",
  "Tarte de Maçã",
  "Tiramisu de Caramelo Salgado"
];

const COLOR_THEMES = [
  "bg-orange-500/10 text-orange-950 border-orange-500/20",
  "bg-yellow-500/15 text-yellow-950 border-yellow-500/30",
  "bg-green-600/10 text-green-950 border-green-600/20",
  "bg-amber-600/10 text-amber-950 border-amber-600/20",
  "bg-pink-500/10 text-pink-950 border-pink-500/20"
];

const CONE_COUNT = 4;

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-2xl border border-brand-green/30 bg-brand-green/10 p-3 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-green md:text-sm">
        {label}
      </p>
    </div>
  );
}

export default function CreationsSection() {
  const t = useTranslations("creations");

  const halfRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const isDragging = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  // Jump logic for infinite loop across seamless boundaries
  useEffect(() => {
    return x.on("change", (currentX) => {
      if (!halfRef.current) return;
      const wrapWidth = halfRef.current.offsetWidth;
      
      // If we've scrolled/dragged past the first half to the left
      if (currentX <= -wrapWidth) {
        x.set(currentX + wrapWidth);
      } 
      // If we drag in reverse past exactly 0 to the right
      else if (currentX > 0) {
        x.set(currentX - wrapWidth);
      }
    });
  }, [x]);

  // Frame loop
  useAnimationFrame((_, delta) => {
    if (isDragging.current || isHovered) return;
    
    // Smooth responsive speeds according to specs (40% slower on mobile -> 24px)
    const speed = window.innerWidth < 768 ? 24 : 40;
    
    // Step leftwards actively
    x.set(x.get() - (speed * delta) / 1000);
  });

  return (
    <SectionWrapper id="creations" mobileTopBorderColor="#68B34A">
      {/* Section header */}
      <FadeIn className="text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          <span
            className="mr-2.5 hidden md:inline-block h-2.5 w-2.5 rounded-full align-middle"
            style={{ backgroundColor: "#68B34A" }}
            aria-hidden="true"
          />
          {t("title")}
        </h2>
        <p className="mt-2 font-accent text-2xl text-text-secondary md:text-3xl">
          {t("subtitle")}
        </p>
      </FadeIn>

      {/* Intro text with inline Instagram link (4B.6) */}
      <FadeIn delay={0.1}>
        <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-text-secondary md:text-lg">
          {t("intro1")}{" "}
          <a
            href="https://www.instagram.com/anara.geladoartesanal"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-green transition-all duration-300 ease-in-out hover:underline"
          >
            {t("introIgLink")}
          </a>
          . {t("intro2")}
        </p>
      </FadeIn>

      {/* ─── Infinite Auto-Scroll Drag Marquee ─── */}
      <FadeIn delay={0.15} className="mt-10 overflow-hidden -mx-4 md:-mx-8">
        <motion.div
          style={{ x }}
          drag="x"
          dragElastic={0}
          dragMomentum={true}
          onDragStart={() => (isDragging.current = true)}
          onDragEnd={() => (isDragging.current = false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="flex w-max cursor-grab active:cursor-grabbing select-none"
        >
          {/* Loop Iteration 1 */}
          <div ref={halfRef} className="flex gap-4 shrink-0 min-w-max pr-4">
            {creationsList.map((flavor, index) => {
              const theme = COLOR_THEMES[index % COLOR_THEMES.length];
              return (
                <div
                  key={`h1-${index}`}
                  className={`flex h-36 w-64 flex-shrink-0 items-center justify-center rounded-2xl border px-6 text-center transition-transform hover:scale-[1.02] ${theme}`}
                >
                  <span className="text-lg font-medium tracking-wide">
                    {flavor}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Loop Iteration 2 (For seamless wrap) */}
          <div className="flex gap-4 shrink-0 min-w-max pr-4">
            {creationsList.map((flavor, index) => {
              const theme = COLOR_THEMES[index % COLOR_THEMES.length];
              return (
                <div
                  key={`h2-${index}`}
                  className={`flex h-36 w-64 flex-shrink-0 items-center justify-center rounded-2xl border px-6 text-center transition-transform hover:scale-[1.02] ${theme}`}
                >
                  <span className="text-lg font-medium tracking-wide">
                    {flavor}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </FadeIn>

      {/* ─── Secondary grid — 4 Creation Cone photo placeholders ─── */}
      <FadeIn delay={0.2} className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: CONE_COUNT }, (_, i) => (
          <div key={i} className="aspect-[3/4]">
            <Placeholder label={`${t("coneLabel")} ${i + 1}`} />
          </div>
        ))}
      </FadeIn>
    </SectionWrapper>
  );
}
