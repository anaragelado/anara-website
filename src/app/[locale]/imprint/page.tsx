import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import SectionWrapper from "@/components/SectionWrapper";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";

export default async function ImprintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ImprintContent />;
}

function ImprintContent() {
  const t = useTranslations("imprint");

  return (
    <main>
      <SectionWrapper>
        <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          {t("title")}
        </h1>

        {/* Company Information */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">{t("companyInfo")}</h2>
          <dl className="mt-4 space-y-3 text-text-secondary">
            <div>
              <dt className="text-sm font-medium text-text-primary">{t("businessName")}</dt>
              <dd>{t("businessNameValue")}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-text-primary">{t("address")}</dt>
              <dd>{t("addressValue")}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-text-primary">{t("email")}</dt>
              <dd>
                <ObfuscatedEmail className="text-brand-green transition-all duration-300 ease-in-out hover:text-highlight-sand hover:underline" />
              </dd>
            </div>
          </dl>
        </section>

        {/* Alternative Dispute Resolution */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">{t("disputeTitle")}</h2>
          <p className="mt-3 text-text-secondary">{t("disputeText")}</p>
          <dl className="mt-4 space-y-3 text-text-secondary">
            <div>
              <dt className="text-sm font-medium text-text-primary">{t("disputeEntity")}</dt>
              <dd>{t("disputeEntityValue")}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-text-primary">{t("disputeWebsite")}</dt>
              <dd>
                <a
                  href="https://www.cniacc.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-green transition-all duration-300 ease-in-out hover:text-highlight-sand hover:underline"
                >
                  {t("disputeWebsiteValue")}
                </a>
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-text-secondary">{t("disputePortal")}</p>
        </section>

        {/* Web Design */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">{t("webDesignTitle")}</h2>
          <p className="mt-3 text-text-secondary">
            {t("webDesignBy")}{" "}
            <a
              href="https://www.videometrixs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-text-primary transition-all duration-300 ease-in-out hover:text-highlight-green"
            >
              {t("webDesignName")}
            </a>
          </p>
        </section>

        {/* Image Credits */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">{t("imageCreditsTitle")}</h2>
          <p className="mt-3 text-text-secondary">{t("imageCreditsText")}</p>
        </section>
      </SectionWrapper>
    </main>
  );
}
