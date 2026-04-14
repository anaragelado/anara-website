"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/SectionWrapper";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";

/** Pixels per second the strip auto-scrolls. */
const SCROLL_SPEED = 40;

const INSTAGRAM_IMAGES = [
  "/assets/images/Instagram-Baunilha com calda de Abrunho.webp",
  "/assets/images/Instagram-Bolo de Cenoura.webp",
  "/assets/images/Instagram-Café c- Laranja Cardamomo e Brownie.webp",
  "/assets/images/Instagram-Cereja do Fundão.jpg",
  "/assets/images/Instagram-Chocolate Masala com Laranja do Alg..jpg",
  "/assets/images/Instagram-Chocolate ped. chocolate Framboesa.webp",
  "/assets/images/Instagram-Doce de Leite Argentino c -Amendoas.jpg",
  "/assets/images/Instagram-Figo Pingo de Mel.webp",
  "/assets/images/Instagram-Kombucha de Maracijá.webp",
  "/assets/images/Instagram-Laranja do Alg. c- clementina e hortela.jpg",
  "/assets/images/Instagram-Limao com Pepino e Hortela.jpg",
  "/assets/images/Instagram-Manga com Coentros.webp",
  "/assets/images/Instagram-Mascarpone Manjericão.jpg",
  "/assets/images/Instagram-Melancia Especial.webp",
  "/assets/images/Instagram-Morango Natas com calda Morango.webp",
  "/assets/images/Instagram-Morango com pedaços Chocolate.webp",
  "/assets/images/Instagram-Natas com Toffee e Pinhoes.webp",
  "/assets/images/Instagram-Pastel de Nata.jpg",
  "/assets/images/Instagram-Requeijao c- Figos caramelizados.jpg",
  "/assets/images/Instagram-Salame de Chocolate.webp",
  "/assets/images/Instagram-Tarte de Maçã.webp",
  "/assets/images/Instagram-Tiramisu de Caramelo Sagado.webp",
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

  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [leftConstraint, setLeftConstraint] = useState(0);
  const isDragging = useRef(false);
  const x = useMotionValue(0);

  // Compute max drag distance whenever the layout changes.
  useEffect(() => {
    const compute = () => {
      if (!containerRef.current || !stripRef.current) return;
      const overflow =
        stripRef.current.scrollWidth - containerRef.current.offsetWidth;
      setLeftConstraint(-Math.max(overflow, 0));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Auto-scroll: advance x leftward each frame; loop back to 0 at the end.
  useAnimationFrame((_, delta) => {
    if (isDragging.current || leftConstraint === 0) return;
    const next = x.get() - (SCROLL_SPEED * delta) / 1000;
    x.set(next <= leftConstraint ? 0 : next);
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

      {/* ─── Horizontal auto-scrolling drag strip — Instagram Creations ─── */}
      <FadeIn delay={0.15} className="mt-10">
        <div ref={containerRef} className="overflow-hidden">
          <motion.div
            ref={stripRef}
            style={{ x, touchAction: "pan-y" }}
            drag="x"
            dragConstraints={{ left: leftConstraint, right: 0 }}
            dragElastic={0.05}
            dragMomentum={false}
            onDragStart={() => { isDragging.current = true; }}
            onDragEnd={() => { isDragging.current = false; }}
            className="flex gap-3 cursor-grab active:cursor-grabbing select-none"
          >
            {INSTAGRAM_IMAGES.map((src, i) => (
              <div key={i} className="relative w-44 flex-shrink-0 aspect-square md:w-52 overflow-hidden rounded-2xl shadow-sm border border-black/5">
                <Image
                  src={src}
                  alt={`${t("igSliderLabel")} ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 176px, 208px"
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
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
