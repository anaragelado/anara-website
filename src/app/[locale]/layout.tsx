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
import { fetchLocationsWithHours } from "@/lib/fetch-hours";

// DIAGNOSTIC: disable all static generation and caching so we can confirm
// Vercel can reach the Google Sheet at runtime. Remove before final launch.
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

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
      <SmoothScrollProvider>
        <PageShell locationHours={locationHours}>{children}</PageShell>
        <Footer />
      </SmoothScrollProvider>
    </NextIntlClientProvider>
  );
}
