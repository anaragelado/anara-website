import { useTranslations } from "next-intl";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import FadeIn from "@/components/FadeIn";

export default function StorySection() {
  const t = useTranslations("story");

  return (
    <SectionWrapper id="story">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Image column */}
        <FadeIn direction="left" className="relative">
          <Image
            src="/assets/images/ingredient-fresh-mangoes-crates-overhead.jpg"
            alt={t("imageAlt")}
            width={640}
            height={480}
            className="w-full rounded-3xl object-cover"
          />
          {/* Small accent image overlapping */}
          <Image
            src="/assets/images/product-double-scoop-chocolate-strawberry-cone.jpg"
            alt="Gelado artesanal de chocolate e morango"
            width={240}
            height={240}
            className="absolute -bottom-6 -right-4 hidden w-40 rounded-2xl shadow-xl shadow-black/5 md:block lg:w-48"
          />
        </FadeIn>

        {/* Text column */}
        <FadeIn delay={0.15}>
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
      </div>
    </SectionWrapper>
  );
}
