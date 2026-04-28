"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/SectionWrapper";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";
import { Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { instagramPosts } from "@/data/instagramPosts";

const CREATION_ITEMS = [
  {
    key: "pastel-de-nata" as const,
    image: "/assets/images/cone-pastel-de-nata-v1.jpg",
    vegan: false,
    glutenFree: true,
  },
  {
    key: "morango-natas" as const,
    image: "/assets/images/cone-morango-natas-com-calda-de-morango-v1.webp",
    vegan: false,
    glutenFree: true,
  },
  {
    key: "carrot-cake" as const,
    image: "/assets/images/cone-carrot-cake-v1.webp",
    vegan: false,
    glutenFree: true,
  },
  {
    key: "madagascan-vanilla" as const,
    image: "/assets/images/cone-madagascan-vanilla-with-damson-swirl-v3.jpg",
    vegan: false,
    glutenFree: true,
  },
  {
    key: "natas-toffee-pinhoes" as const,
    image: "/assets/images/cone-natas-com-toffee-pinhoes-caramelizados-v2.jpg",
    vegan: false,
    glutenFree: true,
  },
];

export default function CreationsSection() {
  const t = useTranslations("creations");
  const tMenu = useTranslations("menu");

  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: "left" | "right") => {
    const container = sliderRef.current;
    if (!container) return;
    const firstCard = container.querySelector<HTMLAnchorElement>(":scope > a");
    const cardWidth = firstCard?.offsetWidth ?? 320;
    const gap = 24; // matches md:gap-6
    const amount = cardWidth + gap;
    container.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

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

      {/* ─── Instagram Feed Slider (3:4 snap-scroll) ─── */}
      <FadeIn delay={0.15} className="mt-10 -mx-4 md:-mx-8">
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-4 md:gap-6 md:px-8"
          >
            {instagramPosts.map((post, index) => (
              <a
                key={index}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square w-[45vw] flex-shrink-0 snap-center overflow-hidden rounded-2xl shadow-md transition-transform duration-300 hover:scale-[1.02] sm:w-[35vw] md:w-[22vw] lg:w-[18vw]"
              >
                <Image
                  src={post.imagePath}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 768px) 35vw, (max-width: 1024px) 22vw, 18vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </a>
            ))}
          </div>

          {/* Desktop navigation arrows */}
          <button
            type="button"
            onClick={() => scrollBy("left")}
            aria-label="Scroll left"
            className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-text-primary shadow-md transition-all hover:scale-105 hover:shadow-lg md:flex md:left-4"
          >
            <ChevronLeft size={20} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy("right")}
            aria-label="Scroll right"
            className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-text-primary shadow-md transition-all hover:scale-105 hover:shadow-lg md:flex md:right-4"
          >
            <ChevronRight size={20} strokeWidth={1.75} />
          </button>
        </div>
      </FadeIn>

      {/* ─── Creations cone grid ─── */}
      <FadeIn delay={0.2} className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:gap-6">
        {CREATION_ITEMS.map((item) => (
          <div key={item.key} className="group relative flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md rounded-2xl bg-background-secondary p-3">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={item.image}
                alt={t(`items.${item.key}`)}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm font-medium md:text-base">{t(`items.${item.key}`)}</p>
              <div className="mt-1 flex items-center justify-center gap-2">
                {item.vegan && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-green/10 px-3 py-0.5 text-xs font-medium text-brand-green">
                    <Leaf size={12} strokeWidth={1.5} />
                    {tMenu("vegan")}
                  </span>
                )}
                {item.glutenFree && (
                  <span className="inline-flex items-center rounded-full bg-brand-yellow/10 px-3 py-0.5 text-xs font-medium text-text-secondary">
                    {tMenu("glutenFree")}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </FadeIn>
    </SectionWrapper>
  );
}
