import { setRequestLocale } from "next-intl/server";
import fs from "fs";
import path from "path";
import TaggerClient from "@/components/flavor-tagger/TaggerClient";

export default async function FlavorTaggerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const directoryPath = path.join(process.cwd(), 'public/assets/temp-cones');
  
  let filenames: string[] = [];
  try {
    const files = fs.readdirSync(directoryPath);
    filenames = files.filter((file) => 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.png') || 
      file.toLowerCase().endsWith('.jpeg') ||
      file.toLowerCase().endsWith('.webp')
    );
  } catch (error) {
    console.error("Error reading directory:", error);
  }

  return (
    <main className="w-full bg-[var(--color-background-primary)]">
      <TaggerClient filenames={filenames} />
    </main>
  );
}
