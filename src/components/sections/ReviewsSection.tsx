import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { reviews } from "@/data/reviews";

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={18}
          strokeWidth={0}
          fill="#FDDB00"
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const t = useTranslations("reviews");

  return (
    <SectionWrapper id="reviews">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-2 font-accent text-2xl text-text-secondary md:text-3xl">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="rounded-2xl border border-gray-100 bg-background-secondary p-6 shadow-sm md:p-8"
          >
            <StarRating />
            <blockquote className="mt-4 text-base leading-relaxed text-text-secondary">
              &ldquo;{review.text}&rdquo;
            </blockquote>
            <p className="mt-4 text-sm font-semibold text-text-primary">
              {review.name}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
