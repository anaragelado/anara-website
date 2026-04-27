"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { CheckCircle, AlertCircle, Send, Info } from "lucide-react";

interface Props {
  files: string[];
}

// Strips the "Instagram-" prefix and the file extension to produce a display title.
function getTitle(filename: string): string {
  return filename
    .replace(/^instagram-/i, "")
    .replace(/\.(jpg|jpeg|png|webp)$/i, "");
}

// Removes any tracking query params (e.g., ?igsh=...) from an Instagram URL.
function cleanUrl(raw: string): string {
  try {
    const url = new URL(raw.trim());
    return `${url.protocol}//${url.host}${url.pathname}`.replace(/\/$/, "");
  } catch {
    return raw.trim().split("?")[0].replace(/\/$/, "");
  }
}

// Converts a display title to a slug: lowercase, accents removed, spaces → hyphens.
function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function InstagramUrlMapperClient({ files }: Props) {
  const [urls, setUrls] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    files.forEach((f) => (init[f] = ""));
    return init;
  });

  const allFilled = useMemo(
    () => files.every((f) => urls[f]?.trim().length > 0),
    [files, urls]
  );

  const completedCount = useMemo(
    () => files.filter((f) => urls[f]?.trim().length > 0).length,
    [files, urls]
  );

  const handleChange = (filename: string, value: string) => {
    setUrls((prev) => ({ ...prev, [filename]: value }));
  };

  const handleSend = () => {
    if (!allFilled) return;

    const lines: string[] = [];
    files.forEach((filename) => {
      const title = getTitle(filename);
      const cleaned = cleanUrl(urls[filename]);
      const slug = slugify(title);
      const outputFilename = `insta-${slug}.jpg`;

      lines.push(`Title: ${title}`);
      lines.push(`URL: ${cleaned}`);
      lines.push(`FILE: ${outputFilename}`);
      lines.push("");
    });

    const message = lines.join("\n").trim();
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/393402362566?text=${encoded}`, "_blank");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pb-28 pt-8 md:px-8 text-[var(--color-text-primary)]">

      {/* ── Header ── */}
      <header className="mb-10 text-center">
        <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] p-[2px] rounded-full mb-5">
          <div className="bg-white rounded-full p-2.5">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="#E1306C" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">
          Instagram URL Mapper
        </h1>
        <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Please paste the Instagram link for each image below.
        </p>
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-left max-w-xl mx-auto">
          <div className="flex gap-2 items-start">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>How to get the link:</strong> Open the post on Instagram, tap the{" "}
              <strong>Paper Airplane (Share)</strong> icon, then tap{" "}
              <strong>&ldquo;Copy link&rdquo;</strong>. Paste it in the field below the image.
            </p>
          </div>
        </div>
      </header>

      {/* ── Progress bar ── */}
      <div className="mb-8 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">Progress</span>
          <span className="text-sm font-bold text-[var(--color-text-primary)]">
            {completedCount} / {files.length}
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-2.5 rounded-full transition-all duration-500"
            style={{
              width: `${files.length > 0 ? (completedCount / files.length) * 100 : 0}%`,
              background: "linear-gradient(90deg, #68B34A, #FDDB00)",
            }}
          />
        </div>
        {allFilled && (
          <div className="flex items-center gap-2 mt-3 text-[#68B34A] font-semibold text-sm">
            <CheckCircle className="w-4 h-4" strokeWidth={2} />
            All links filled — ready to send!
          </div>
        )}
      </div>

      {/* ── Image list ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {files.map((filename, idx) => {
          const title = getTitle(filename);
          const value = urls[filename] ?? "";
          const isDone = value.trim().length > 0;

          return (
            <div
              key={filename}
              className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden ${
                isDone ? "border-[#68B34A]/40" : "border-gray-100"
              }`}
            >
              {/* Number badge + title row */}
              <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight flex-1">
                  {title}
                </p>
                {isDone && (
                  <CheckCircle className="w-5 h-5 text-[#68B34A] shrink-0" strokeWidth={2} />
                )}
              </div>

              {/* Full-width square image */}
              <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
                <Image
                  src={`/assets/images/${filename}`}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 240px"
                  loading="lazy"
                />
              </div>

              {/* URL input */}
              <div className="p-4">
                <div className="relative">
                  <input
                    type="url"
                    placeholder="https://www.instagram.com/p/..."
                    value={value}
                    onChange={(e) => handleChange(filename, e.target.value)}
                    className={`w-full text-sm px-3 py-2.5 pr-9 rounded-xl border outline-none transition-all duration-200 bg-gray-50 placeholder:text-gray-400 ${
                      isDone
                        ? "border-[#68B34A] focus:ring-2 focus:ring-[#68B34A]/30 bg-[#68B34A]/5"
                        : "border-gray-200 focus:border-[#68B34A] focus:ring-2 focus:ring-[#68B34A]/20"
                    }`}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {isDone && (
                    <CheckCircle
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68B34A] shrink-0"
                      strokeWidth={2}
                    />
                  )}
                </div>
                {isDone && (
                  <p className="text-[10px] text-gray-400 font-mono mt-1.5 truncate">
                    FILE: insta-{slugify(title)}.jpg
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {files.length === 0 && (
          <div className="text-center py-16 text-[var(--color-text-secondary)]">
            <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-40" strokeWidth={1.5} />
            <p>No Instagram images found in the images directory.</p>
          </div>
        )}
      </div>

      {/* ── Sticky footer CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-white/90 backdrop-blur-md border-t border-gray-100 z-50">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3">
          {!allFilled && (
            <p className="text-sm text-[var(--color-text-secondary)] sm:flex-1 text-center sm:text-left">
              {files.length - completedCount} link{files.length - completedCount !== 1 ? "s" : ""} still needed.
            </p>
          )}
          <button
            onClick={handleSend}
            disabled={!allFilled}
            className={`flex items-center gap-2 font-bold py-3.5 px-8 rounded-full shadow-lg transition-all duration-300 text-base w-full sm:w-auto justify-center ${
              allFilled
                ? "bg-[#25D366] hover:bg-[#128C7E] text-white hover:scale-105 active:scale-95 cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send className="w-4 h-4" strokeWidth={2} />
            Send All Links to WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
