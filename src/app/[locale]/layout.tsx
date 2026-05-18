import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import PageShell from "@/components/PageShell";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/SchemaMarkup";
import { fetchLocationsWithHours } from "@/lib/fetch-hours";

// Regenerate this route segment every 60 seconds so updated hours appear
// within ~1–5 minutes (accounting for Google's own CSV publish delay).
export const revalidate = 60;

const BASE_URL = "https://anaragelado.pt";

const meta = {
  pt: {
    title: "Anara Gelado Artesanal | Da quinta para o cone",
    description:
      "Gelado artesanal feito com os melhores ingredientes naturais. Baunilha Bourbon de Madagáscar, fruta pura e zero aditivos artificiais.",
    ogAlt: "Anara Gelado Artesanal | Da quinta para o cone",
  },
  en: {
    title: "Anara Gelado Artesanal | From the farm to the cone",
    description:
      "Artisanal ice cream made with the finest natural ingredients. Bourbon Vanilla from Madagascar, pure fruit and zero artificial additives.",
    ogAlt: "Anara Gelado Artesanal | From the farm to the cone",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as keyof typeof meta;
  const { title, description, ogAlt } = meta[l] ?? meta.en;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        pt: "/pt",
        en: "/en",
        "x-default": "/en",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: "Anara Gelado Artesanal",
      images: [
        {
          url: "/assets/og-image.jpg",
          width: 1200,
          height: 630,
          alt: ogAlt,
        },
      ],
      locale: locale === "pt" ? "pt_PT" : "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/og-image.jpg"],
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/site.webmanifest",
    verification: {
      google: "m5DxljdT08fI3fCpW9-JHeKw-7QLb0SvNRxzNkudXSY",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const [messages, locations] = await Promise.all([
    getMessages(),
    fetchLocationsWithHours(),
  ]);

  // Serialize just the hours for the header open/closed indicator
  const locationHours = locations.map((loc) => ({
    id: loc.id,
    hours: loc.hours,
  }));

  return (
    <NextIntlClientProvider messages={messages}>
      <SchemaMarkup locale={locale} />
      <SmoothScrollProvider>
        <PageShell locationHours={locationHours}>{children}</PageShell>
        <Footer />
      </SmoothScrollProvider>
    </NextIntlClientProvider>
  );
}
