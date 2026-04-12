import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";
import MenuSection from "@/components/sections/MenuSection";
import CreationsSection from "@/components/sections/CreationsSection";
import TakeawaySection from "@/components/sections/TakeawaySection";
import LocationsSection from "@/components/sections/LocationsSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import { fetchLocationsWithHours } from "@/lib/fetch-hours";

// DIAGNOSTIC: disable all static generation and caching so we can confirm
// Vercel can reach the Google Sheet at runtime. Remove before final launch.
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const locations = await fetchLocationsWithHours();

  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <StorySection />
      <MenuSection />
      <CreationsSection />
      <TakeawaySection />
      <LocationsSection locations={locations} />
      <ReviewsSection />
    </main>
  );
}
