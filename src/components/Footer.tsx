import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
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
  const locale = useLocale();

  return (
    <footer className="bg-background-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        {/* === Mobile layout (stacked, centered) === */}
        <div className="flex flex-col items-center gap-8 text-center md:hidden">
          <Image
            src="/assets/logo.svg"
            alt="Anara Gelado Artesanal"
            width={240}
            height={80}
            className="h-20 w-auto"
          />
          <div>
            <p className="text-sm font-bold text-text-primary">
              Anara Gelado Artesanal
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Estrada da Bela Vista 144
              <br />
              2820-166 Charneca de Caparica
            </p>
            <a
              href="mailto:info@anaragelado.pt"
              className="mt-2 inline-block text-sm text-text-secondary transition-all duration-300 ease-in-out hover:text-highlight-sand"
            >
              info@anaragelado.pt
            </a>
          </div>
          <div className="flex flex-col items-center gap-1">
            <a
              href={`/${locale}/imprint`}
              className="min-h-[44px] flex items-center text-sm text-text-secondary transition-all duration-300 ease-in-out hover:text-highlight-orange"
            >
              {t("imprint")}
            </a>
            <a
              href={`/${locale}/privacy`}
              className="min-h-[44px] flex items-center text-sm text-text-secondary transition-all duration-300 ease-in-out hover:text-highlight-orange"
            >
              {t("privacy")}
            </a>
          </div>
          <div className="flex items-center gap-4">
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
              href="mailto:info@anaragelado.pt"
              aria-label={t("email")}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center text-text-primary transition-all duration-300 ease-in-out hover:text-highlight-sand"
            >
              <Mail size={22} strokeWidth={1.5} />
            </a>
          </div>
          <LanguageToggle />
        </div>

        {/* === Desktop layout === */}
        <div className="hidden md:block">
          {/* Top row: centered logo */}
          <div className="flex justify-center">
            <Image
              src="/assets/logo.svg"
              alt="Anara Gelado Artesanal"
              width={260}
              height={88}
              className="h-22 w-auto"
            />
          </div>

          {/* Middle row: three columns, all top-aligned */}
          <div className="mt-10 grid grid-cols-3 gap-8 items-start text-sm">
            {/* Col 1: Address + email */}
            <div>
              <p className="font-bold text-text-primary">
                Anara Gelado Artesanal
              </p>
              <p className="mt-1 text-text-secondary leading-relaxed">
                Estrada da Bela Vista 144
                <br />
                2820-166 Charneca de Caparica
              </p>
              <a
                href="mailto:info@anaragelado.pt"
                className="mt-2 inline-block text-text-secondary transition-all duration-300 ease-in-out hover:text-highlight-sand"
              >
                info@anaragelado.pt
              </a>
            </div>

            {/* Col 2: Legal pages + language toggle */}
            <div className="flex flex-col items-center">
              <a
                href={`/${locale}/imprint`}
                className="text-text-secondary transition-all duration-300 ease-in-out hover:text-highlight-orange"
              >
                {t("imprint")}
              </a>
              <a
                href={`/${locale}/privacy`}
                className="mt-1 text-text-secondary transition-all duration-300 ease-in-out hover:text-highlight-orange"
              >
                {t("privacy")}
              </a>
              <div className="mt-4">
                <LanguageToggle />
              </div>
            </div>

            {/* Col 3: Social icons */}
            <div className="flex items-start justify-end gap-3">
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
                href="mailto:info@anaragelado.pt"
                aria-label={t("email")}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center text-text-primary transition-all duration-300 ease-in-out hover:text-highlight-sand"
              >
                <Mail size={22} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-100" />

        {/* Bottom row: copyright + webmaster backlink */}
        <div className="flex flex-col items-center gap-4 text-xs text-text-secondary md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} Anara Gelado Artesanal</p>

          <p className="text-center md:text-right">
            {t("webdesign")}{" "}
            <a
              href="https://www.videometrixs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-text-primary transition-all duration-300 ease-in-out hover:text-highlight-green"
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
