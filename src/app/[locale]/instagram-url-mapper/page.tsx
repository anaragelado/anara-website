import fs from "fs";
import path from "path";
import { setRequestLocale } from "next-intl/server";
import InstagramUrlMapperClient from "@/components/instagram-url-mapper/InstagramUrlMapperClient";

export default async function InstagramUrlMapperPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const imagesDir = path.join(process.cwd(), "public/assets/images");
  let files: string[] = [];
  try {
    const all = fs.readdirSync(imagesDir);
    files = all
      .filter((f) => /^instagram-/i.test(f) && /\.(jpg|jpeg|png|webp)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, "pt", { sensitivity: "base" }));
  } catch (e) {
    console.error("Could not read images directory", e);
  }

  return (
    <main className="w-full min-h-screen bg-[var(--color-background-primary)]">
      <InstagramUrlMapperClient files={files} />
    </main>
  );
}
