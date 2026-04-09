import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import SectionWrapper from "@/components/SectionWrapper";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("hero");

  return (
    <main>
      <SectionWrapper id="hero" className="flex min-h-[80vh] items-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-6xl">
            {t("headline")}
          </h1>
          <h2 className="mt-4 font-accent text-3xl text-text-secondary md:text-5xl">
            {t("subheadline")}
          </h2>
          <a
            href="#locations"
            className="mt-8 inline-block rounded-full bg-brand-yellow px-8 py-3 text-sm font-semibold text-text-primary transition-all duration-300 ease-in-out hover:scale-105"
          >
            {t("cta")}
          </a>
        </div>
      </SectionWrapper>
    </main>
  );
}
