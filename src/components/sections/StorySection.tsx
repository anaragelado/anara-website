import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/SectionWrapper";
import FadeIn from "@/components/FadeIn";
import StorySlider from "@/components/StorySlider";

const storyImages = [
  {
    src: "/assets/images/ingredient-lemon-tree-with-ripe-fruits-01.jpg",
    alt: "Lemon tree with ripe fruits",
  },
  {
    src: "/assets/images/ingredient-fresh-mangoes-crates-overhead.jpg",
    alt: "Fresh mangoes in wooden crates",
  },
  {
    src: "/assets/images/ingredient-fresh-lemons-crate-overhead-01.jpg",
    alt: "Fresh lemons in a crate",
  },
  {
    src: "/assets/images/product-double-scoop-strawberry-vanilla-cone.jpg",
    alt: "Artisanal ice cream cone with strawberry and vanilla",
  },
];

export default function StorySection() {
  const t = useTranslations("story");

  return (
    <SectionWrapper id="story">
      <div className="grid gap-12 md:grid-cols-2 md:items-start md:gap-16">
        {/* Image slider column */}
        <FadeIn direction="left" className="order-2 md:order-1">
          <StorySlider images={storyImages} interval={5000} />
        </FadeIn>

        {/* Text column */}
        <FadeIn delay={0.15} className="order-1 md:sticky md:top-24 md:order-2">
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
