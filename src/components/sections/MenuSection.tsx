import { useTranslations } from "next-intl";
import Image from "next/image";
import { Leaf } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import FadeIn from "@/components/FadeIn";
import { flavors } from "@/data/flavors";

export default function MenuSection() {
  const t = useTranslations("menu");

  return (
    <SectionWrapper id="menu">
      {/* Section header */}
      <FadeIn className="text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-2 font-accent text-2xl text-text-secondary md:text-3xl">
          {t("subtitle")}
        </p>
      </FadeIn>

      {/* Gluten-free note */}
      <p className="mt-6 text-center text-sm text-text-secondary">
        {t("glutenFreeNote")}
      </p>

      {/* Flavor grid */}
      <FadeIn delay={0.1} className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
        {flavors.map((flavor) => (
          <div key={flavor.id} className="group relative">
            {/* Flavor of the week badge */}
            {flavor.flavorOfTheWeek && (
              <span className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 rounded-full bg-brand-yellow px-4 py-1 text-xs font-semibold text-text-primary shadow-sm">
                {t("flavorOfTheWeek")}
              </span>
            )}

            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={flavor.image}
                alt={flavor.imageAlt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Name + badges */}
            <div className="mt-3 text-center">
              <p className="text-sm font-medium md:text-base">
                {t(`flavors.${flavor.id}`)}
              </p>
              <div className="mt-1 flex items-center justify-center gap-2">
                {flavor.vegan && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-green/10 px-3 py-0.5 text-xs font-medium text-brand-green">
                    <Leaf size={12} strokeWidth={1.5} />
                    {t("vegan")}
                  </span>
                )}
                {flavor.id !== "cookies-cream" && (
                  <span className="inline-flex items-center rounded-full bg-brand-yellow/10 px-3 py-0.5 text-xs font-medium text-text-secondary">
                    {t("glutenFree")}
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
