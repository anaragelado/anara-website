"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/SectionWrapper";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";
import { Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { instagramPosts } from "@/data/instagramPosts";
import { creations as CREATION_ITEMS } from "@/data/creations";

export default function CreationsSection() {
  const t = useTranslations("creations");
  const tMenu = useTranslations("menu");

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

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

      {/* Intro text with inline Instagram link */}
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

      {/* ─── Embla Carousel (true infinite loop) ─── */}
      <FadeIn delay={0.15} className="mt-10 -mx-4 md:-mx-8">
        <div className="relative">
          {/* Embla viewport */}
          <div className="overflow-hidden px-4 md:px-8" ref={emblaRef}>
            <div className="flex gap-4 md:gap-6">
              {instagramPosts.map((post, index) => (
                <a
                  key={index}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square flex-[0_0_45vw] min-w-0 overflow-hidden rounded-2xl shadow-md transition-transform duration-300 hover:scale-[1.02] sm:flex-[0_0_35vw] md:flex-[0_0_22vw] lg:flex-[0_0_18vw]"
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
          </div>

          {/* Left arrow — always visible (infinite loop) */}
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Scroll left"
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-text-primary shadow-md transition-all hover:scale-105 hover:shadow-lg md:left-4"
          >
            <ChevronLeft size={20} strokeWidth={1.75} />
          </button>

          {/* Right arrow — always visible (infinite loop) */}
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Scroll right"
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-text-primary shadow-md transition-all hover:scale-105 hover:shadow-lg md:right-4"
          >
            <ChevronRight size={20} strokeWidth={1.75} />
          </button>
        </div>
      </FadeIn>

      {/* ─── Creations cone grid: 2 cols mobile → 3 cols desktop ─── */}
      <FadeIn delay={0.2} className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
        {CREATION_ITEMS.map((item) => (
          <div key={item.key} className="group relative flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md rounded-2xl bg-background-secondary p-3">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={item.image}
                alt={t(`items.${item.key}`)}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
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
