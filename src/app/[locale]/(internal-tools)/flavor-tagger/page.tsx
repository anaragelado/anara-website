import { setRequestLocale } from "next-intl/server";
import TaggerClient, { FlavorItem } from "@/components/flavor-tagger/TaggerClient";
import taggerData from "@/data/flavor-tagger-images.json";

export default async function FlavorTaggerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Cast the imported JSON data to FlavorItem[]
  const initialFlavors = taggerData as FlavorItem[];

  return (
    <main className="w-full bg-[var(--color-background-primary)]">
      <TaggerClient initialFlavors={initialFlavors} />
    </main>
  );
}
