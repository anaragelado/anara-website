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

      {/* Description */}
      <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-text-secondary md:text-base">
        {t("description")}
      </p>

      {/* Flavor grid */}
      <FadeIn delay={0.1} className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
        {flavors.map((flavor) => (
          <div key={flavor.id} className="group relative flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md rounded-2xl bg-background-secondary p-3">

            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={flavor.image}
                alt={flavor.imageAlt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
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
