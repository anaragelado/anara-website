"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/SectionWrapper";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";

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
    <SectionWrapper id="creations">
      {/* Section header */}
      <FadeIn className="text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
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

      {/* ─── Secondary grid — 4 Creation Cone photo placeholders (A/B Test Prototypes) ─── */}
      <FadeIn delay={0.2} className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
        {/* Prototype 1: Standard layout (Items 1 & 2) */}
        {[1, 2].map((i) => (
          <div key={`p1-${i}`} className="group relative flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md rounded-2xl bg-background-secondary p-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src="/assets/images/cone-carrot-cake-v1.webp"
                alt="Carrot Cake Cone"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4 text-center pb-2">
              <p className="text-sm font-bold md:text-base font-heading">
                Bolo de Cenoura
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-green/10 px-2.5 py-0.5 text-[10px] font-semibold text-brand-green uppercase tracking-wide">
                  Vegan
                </span>
                <span className="inline-flex items-center rounded-full bg-brand-yellow/10 px-2.5 py-0.5 text-[10px] font-semibold text-text-secondary uppercase tracking-wide">
                  Sem Glúten
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Prototype 2: Overlay layout (Items 3 & 4) */}
        {[3, 4].map((i) => (
          <div key={`p2-${i}`} className="group relative flex flex-col transition-all duration-300 hover:-translate-y-1 overflow-hidden rounded-2xl aspect-[3/4] hover:shadow-lg">
            <Image
              src="/assets/images/cone-carrot-cake-v1.webp"
              alt="Carrot Cake Cone"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col items-center justify-end text-center">
              <p className="text-white text-base md:text-lg font-bold font-heading drop-shadow-md mb-3">
                Bolo de Cenoura
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-white uppercase tracking-wide shadow-sm">
                  Vegan
                </span>
                <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-white uppercase tracking-wide shadow-sm">
                  Sem Glúten
                </span>
              </div>
            </div>
          </div>
        ))}
      </FadeIn>
    </SectionWrapper>
  );
}
