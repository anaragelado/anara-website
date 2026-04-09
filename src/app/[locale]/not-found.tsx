import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <div className="text-center">
        <p className="font-accent text-6xl text-brand-yellow md:text-8xl">404</p>
        <h1 className="mt-4 font-heading text-2xl font-bold tracking-tight md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-text-secondary">{t("subtitle")}</p>
        <a
          href="/"
          className="mt-8 inline-block rounded-full bg-brand-yellow px-8 py-3 text-sm font-semibold text-text-primary transition-all duration-300 ease-in-out hover:scale-105 hover:bg-brand-green hover:text-white"
        >
          {t("cta")}
        </a>
      </div>
    </main>
  );
}
