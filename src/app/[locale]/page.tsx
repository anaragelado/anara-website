import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = useTranslations("hero");

  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="text-center px-4">
        <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight">
          {t("headline")}
        </h1>
        <h2 className="font-accent text-2xl md:text-4xl mt-4 text-text-secondary">
          {t("subheadline")}
        </h2>
      </div>
    </main>
  );
}
