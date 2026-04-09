import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import SectionWrapper from "@/components/SectionWrapper";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations("privacy");

  return (
    <main>
      <SectionWrapper>
        <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm text-text-secondary">{t("lastUpdated")}</p>

        <section className="mt-10 space-y-8">
          <div>
            <h2 className="text-xl font-semibold">{t("introTitle")}</h2>
            <p className="mt-3 leading-relaxed text-text-secondary">{t("introText")}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">{t("collectionTitle")}</h2>
            <p className="mt-3 leading-relaxed text-text-secondary">{t("collectionText")}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">{t("cookiesTitle")}</h2>
            <p className="mt-3 leading-relaxed text-text-secondary">{t("cookiesText")}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">{t("thirdPartyTitle")}</h2>
            <p className="mt-3 leading-relaxed text-text-secondary">{t("thirdPartyText")}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">{t("rightsTitle")}</h2>
            <p className="mt-3 leading-relaxed text-text-secondary">{t("rightsText")}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">{t("contactTitle")}</h2>
            <p className="mt-3 leading-relaxed text-text-secondary">{t("contactText")}</p>
            <a
              href="mailto:hello@anaragelado.pt"
              className="mt-1 inline-block text-brand-green transition-all duration-300 ease-in-out hover:text-highlight-sand hover:underline"
            >
              {t("contactEmail")}
            </a>
          </div>
        </section>

        <div className="mt-12">
          <a
            href="/"
            className="inline-block rounded-full bg-brand-yellow px-6 py-2.5 text-sm font-semibold text-text-primary transition-all duration-300 ease-in-out hover:scale-105 hover:bg-brand-green hover:text-white"
          >
            {t("backHome")}
          </a>
        </div>
      </SectionWrapper>
    </main>
  );
}
