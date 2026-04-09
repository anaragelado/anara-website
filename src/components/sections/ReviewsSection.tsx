import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import FadeIn from "@/components/FadeIn";
import { reviews } from "@/data/reviews";

const RATINGS = [
  {
    location: "Charneca (HQ)",
    rating: 4.7,
    stars: 5,
    url: "https://maps.app.goo.gl/2eSjBQy21V8MnQ9U7",
  },
  {
    location: "Costa de Caparica",
    rating: 5.0,
    stars: 5,
    url: "https://maps.app.goo.gl/qWspRKD1hvDDoyhq6",
  },
] as const;

function StarRating({ count = 5, size = 18 }: { count?: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} strokeWidth={0} fill="#FDDB00" />
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function ReviewsSection() {
  const t = useTranslations("reviews");

  return (
    <SectionWrapper id="reviews">
      <FadeIn className="text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-2 font-accent text-2xl text-text-secondary md:text-3xl">
          {t("subtitle")}
        </p>
      </FadeIn>

      {/* Google Review badges */}
      <FadeIn delay={0.1} className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {RATINGS.map((r) => (
          <a
            key={r.location}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-background-secondary px-5 py-3 shadow-sm transition-all duration-300 ease-in-out hover:border-highlight-pink hover:shadow-md"
          >
            <GoogleIcon />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{r.rating.toFixed(1)}</span>
                <StarRating count={r.stars} size={14} />
              </div>
              <p className="text-xs text-text-secondary">
                {r.location} · {t("basedOn")}
              </p>
            </div>
          </a>
        ))}
      </FadeIn>

      {/* Review cards */}
      <FadeIn delay={0.2} className="mt-10 grid gap-6 md:grid-cols-2">
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
      </FadeIn>
    </SectionWrapper>
  );
}
