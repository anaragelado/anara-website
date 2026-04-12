import { useTranslations } from "next-intl";
import FadeIn from "@/components/FadeIn";
import HeroParallax from "@/components/HeroParallax";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section id="hero" className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
      {/* Parallax video layer */}
      <HeroParallax>
        {/* Mobile video (9:16 vertical) */}
        <video
          className="h-full w-full object-cover md:hidden"
          src="/assets/videos/hero-video-smartphone.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />

        {/* Desktop video (16:9 landscape) */}
        <video
          className="hidden h-full w-full object-cover md:block"
          src="/assets/videos/hero-video-desktop.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      </HeroParallax>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Text overlay */}
      <FadeIn className="relative z-10 mx-auto max-w-7xl px-4 text-center md:px-8">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
          {t("headline")}
        </h1>
        <h2 className="mt-4 font-accent text-3xl text-white/90 md:text-5xl lg:text-6xl">
          {t("subheadline")}
        </h2>
        <a
          href="#locations"
          className="mt-8 inline-block rounded-full bg-brand-yellow px-8 py-3 text-sm font-semibold text-text-primary transition-all duration-300 ease-in-out hover:scale-105 hover:bg-brand-green hover:text-white"
        >
          {t("cta")}
        </a>
      </FadeIn>
    </section>
  );
}
