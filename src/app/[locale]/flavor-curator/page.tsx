import { setRequestLocale } from "next-intl/server";
import fs from "fs";
import path from "path";
import CuratorClient from "@/components/flavor-curator/CuratorClient";

export default async function FlavorCuratorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const imagesDir = path.join(process.cwd(), 'public/assets/images');
  let files: string[] = [];
  try {
    if (fs.existsSync(imagesDir)) {
      files = fs.readdirSync(imagesDir).filter(f => f.startsWith('cone-') && f.endsWith('.jpg'));
    }
  } catch (error) {
    console.error("Error reading images:", error);
  }

  const problematicFiles: string[] = [];
  const groupedRecord: Record<string, string[]> = {};

  files.forEach(file => {
    // Completely ignore and exclude any files containing -no-v
    if (file.includes('-no-v')) {
      return; 
    }
    
    // Identify problematic files
    if (file.includes('-didnt-i-sent')) {
      problematicFiles.push(file);
      return;
    }

    // Extract slug: cone-[slug]-[vX].jpg
    // Example: cone-chocolate-belga-v1.jpg
    const match = file.match(/^cone-(.+)-v\d+\.jpg$/);
    if (match) {
      const slug = match[1];
      if (!groupedRecord[slug]) groupedRecord[slug] = [];
      groupedRecord[slug].push(file);
    }
  });

  const groupedFlavors = Object.entries(groupedRecord).map(([slug, images]) => {
    // Basic title case parsing for display
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    // Sort images naturally so v1 comes before v2
    return { slug, name, images: images.sort() };
  });

  // Sort flavors alphabetically by Name
  groupedFlavors.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="w-full bg-[var(--color-background-primary)]">
      <CuratorClient groupedFlavors={groupedFlavors} problematicFiles={problematicFiles} />
    </main>
  );
}
