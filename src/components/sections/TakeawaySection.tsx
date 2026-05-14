"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import { useLenis } from "lenis/react";
import SectionWrapper from "@/components/SectionWrapper";
import FadeIn from "@/components/FadeIn";
import { Recycle } from "lucide-react";

export default function TakeawaySection() {
  const t = useTranslations("takeaway");

  const gridRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const offsetY = useMotionValue(0);

  // Runs on every Lenis scroll tick (desktop only — no Lenis on touch devices).
  // Manually tracks how far the text column should translate to stay visible
  // while the user scrolls through the tall image beside it.
  useLenis(() => {
    if (!gridRef.current || !textRef.current) return;

    const grid = gridRef.current.getBoundingClientRect();
    const textHeight = textRef.current.offsetHeight;
    const TOP_OFFSET = 96; // matches top-24 (24 * 4px)

    // How many pixels past the pinned position has the grid top scrolled?
    const scrolledPast = Math.max(0, TOP_OFFSET - grid.top);

    // Cap travel so the text bottom never overshoots the grid bottom.
    const maxTravel = Math.max(0, grid.height - textHeight - TOP_OFFSET);

    offsetY.set(Math.min(scrolledPast, maxTravel));
  });

  return (
    <SectionWrapper id="takeaway" className="bg-background-primary">
      <div ref={gridRef} className="grid gap-12 md:grid-cols-2 md:gap-16">

        {/* Text column — JS-driven sticky on desktop */}
        <div className="order-1">
          <motion.div
            ref={textRef}
            className="text-center md:text-left"
            style={{ y: offsetY }}
          >
            <FadeIn>
              <div className="mb-4 flex w-max mx-auto md:mx-0 items-center gap-2 rounded-full bg-brand-green/10 px-4 py-1.5 text-sm font-medium text-brand-green">
                <Recycle size={16} strokeWidth={1.5} />
                100% Recyclable
              </div>
              <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                {t("title")}
              </h2>
              <p className="mt-2 font-accent text-2xl text-text-secondary md:text-3xl">
                {t("subtitle")}
              </p>
              <p className="mt-6 text-base leading-relaxed text-text-secondary md:text-lg">
                {t("p1")}
              </p>
              <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
                {t("p2")}
              </p>
            </FadeIn>
          </motion.div>
        </div>

        {/* Image column */}
        <div className="order-2">
          <FadeIn direction="right" delay={0.15}>
            <Image
              src="/assets/images/takeaway-box-v1.webp"
              alt={t("imageAlt")}
              width={800}
              height={1067}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full rounded-3xl"
            />
          </FadeIn>
        </div>

      </div>
    </SectionWrapper>
  );
}
