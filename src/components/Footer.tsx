import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import LanguageToggle from "./LanguageToggle";

function InstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-background-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        {/* Top row: social links + legal links */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Social / Contact */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/anara.geladoartesanal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("instagram")}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center text-text-primary transition-all duration-300 ease-in-out hover:text-highlight-pink"
            >
              <InstagramIcon size={22} />
            </a>
            <a
              href="mailto:hello@anaragelado.pt"
              aria-label={t("email")}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center text-text-primary transition-all duration-300 ease-in-out hover:text-highlight-sand"
            >
              <Mail size={22} strokeWidth={1.5} />
            </a>
          </div>

          {/* Language Toggle (desktop only — mobile version is in hamburger menu) */}
          <LanguageToggle className="hidden lg:flex" />

          {/* Legal links */}
          <div className="flex items-center gap-6 text-sm text-text-secondary">
            <a
              href="/imprint"
              className="min-h-[44px] flex items-center transition-all duration-300 ease-in-out hover:text-text-primary"
            >
              {t("imprint")}
            </a>
            <a
              href="/privacy"
              className="min-h-[44px] flex items-center transition-all duration-300 ease-in-out hover:text-text-primary"
            >
              {t("privacy")}
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-100" />

        {/* Bottom row: copyright + webmaster backlink */}
        <div className="flex flex-col items-center gap-4 text-xs text-text-secondary md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} Anara Gelado Artesanal</p>

          {/* Webmaster Backlink (2.6) — bottom-center mobile, bottom-right desktop */}
          <p className="text-center md:text-right">
            {t("webdesign")}{" "}
            <a
              href="https://www.videometrixs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-text-primary transition-all duration-300 ease-in-out hover:text-brand-green"
            >
              VideoMetrixs
            </a>
            . {t("webdesignCta")}
          </p>
        </div>
      </div>
    </footer>
  );
}
