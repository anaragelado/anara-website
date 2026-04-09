import { useTranslations } from "next-intl";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import FadeIn from "@/components/FadeIn";
import { Recycle } from "lucide-react";

export default function TakeawaySection() {
  const t = useTranslations("takeaway");

  return (
    <SectionWrapper id="takeaway" className="bg-background-primary">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Text column */}
        <FadeIn className="order-2 md:order-1">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-4 py-1.5 text-sm font-medium text-brand-green">
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

        {/* Image column */}
        <FadeIn direction="right" delay={0.15} className="order-1 md:order-2">
          <Image
            src="/assets/images/food-cart-exterior-with-anara-branding-sign.jpg"
            alt={t("imageAlt")}
            width={640}
            height={480}
            className="w-full rounded-3xl object-cover"
          />
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
