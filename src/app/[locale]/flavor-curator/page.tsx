import { setRequestLocale } from "next-intl/server";
import CuratorClient from "@/components/flavor-curator/CuratorClient";
import curatorData from "@/data/flavor-curator-data.json";

export default async function FlavorCuratorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { groupedFlavors, problematicFiles } = curatorData;

  return (
    <main className="w-full bg-[var(--color-background-primary)]">
      <CuratorClient groupedFlavors={groupedFlavors} problematicFiles={problematicFiles} />
    </main>
  );
}
