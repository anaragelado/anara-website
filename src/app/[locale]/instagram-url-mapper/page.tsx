import { setRequestLocale } from "next-intl/server";
import InstagramUrlMapperClient from "@/components/instagram-url-mapper/InstagramUrlMapperClient";
import files from "@/data/instagram-manifest.json";

export default async function InstagramUrlMapperPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="w-full min-h-screen bg-[var(--color-background-primary)]">
      <InstagramUrlMapperClient files={files} />
    </main>
  );
}
