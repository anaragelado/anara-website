"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(target: string) {
    if (target === locale) return;

    // Strip the current locale prefix and prepend the target
    const segments = pathname.split("/");
    if (routing.locales.includes(segments[1] as "pt" | "en")) {
      segments[1] = target;
    } else {
      segments.splice(1, 0, target);
    }

    router.replace(segments.join("/") || "/");
  }

  return (
    <div className={`flex items-center gap-1 text-sm font-medium ${className}`}>
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && <span className="mx-1 text-text-secondary/40">|</span>}
          <button
            type="button"
            onClick={() => switchLocale(loc)}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out ${
              locale === loc
                ? "text-text-primary font-semibold"
                : "text-text-secondary hover:text-brand-green"
            }`}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
