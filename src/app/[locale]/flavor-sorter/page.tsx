import { setRequestLocale } from "next-intl/server";
import FlavorSorterClient from "@/components/flavor-sorter/FlavorSorterClient";
import { flavors } from "@/data/flavors";
import { creations } from "@/data/creations";

export default async function FlavorSorterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen w-full bg-[var(--color-background-primary)]">
      <FlavorSorterClient flavors={flavors} creations={creations} />
    </main>
  );
}
