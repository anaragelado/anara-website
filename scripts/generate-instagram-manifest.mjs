/**
 * generate-instagram-manifest.mjs
 * Runs before `next build` (and optionally before `next dev`).
 * Scans public/assets/images/ for Instagram-* files and writes
 * src/data/instagram-manifest.json so the page never needs `fs` at runtime.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const imagesDir = path.join(root, "public", "assets", "images");
const outFile = path.join(root, "src", "data", "instagram-manifest.json");

let files = [];
try {
  files = fs
    .readdirSync(imagesDir)
    .filter(
      (f) => /^instagram-/i.test(f) && /\.(jpg|jpeg|png|webp)$/i.test(f)
    )
    .sort((a, b) => a.localeCompare(b, "pt", { sensitivity: "base" }));
} catch (e) {
  console.error("[instagram-manifest] Could not read images dir:", e.message);
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(files, null, 2), "utf-8");

console.log(
  `[instagram-manifest] Written ${files.length} files to src/data/instagram-manifest.json`
);
