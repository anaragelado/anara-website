import fs from "fs";
import path from "path";
import { setRequestLocale } from "next-intl/server";
import MasterReviewClient from "@/components/master-review/MasterReviewClient";

interface ImageGroup {
  baseSlug: string;
  files: string[];
  isUnknown: boolean;
  suggestedName: string;
}

export default async function MasterReviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const imagesDir = path.join(process.cwd(), "public/assets/new-cones");
  let files: string[] = [];
  try {
    files = fs.readdirSync(imagesDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
  } catch (e) {
    console.error("Could not read directory", e);
  }

  const groupsMap = new Map<string, string[]>();
  files.forEach(file => {
    const baseSlug = file.replace(/\.(jpg|jpeg|png|webp)$/i, "").replace(/-v\d+$/i, "");
    if (!groupsMap.has(baseSlug)) {
      groupsMap.set(baseSlug, []);
    }
    groupsMap.get(baseSlug)!.push(file);
  });

  const groupedImages: ImageGroup[] = Array.from(groupsMap.entries()).map(([baseSlug, groupFiles]) => {
    const isUnknown = baseSlug.includes("unknown");
    const suggestedName = baseSlug
      .replace(/^cone-/, "")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return {
      baseSlug,
      files: groupFiles,
      isUnknown,
      suggestedName: isUnknown ? "" : suggestedName,
    };
  });

  return (
    <main className="w-full bg-[var(--color-background-primary)]">
      <MasterReviewClient groupedImages={groupedImages} />
    </main>
  );
}
