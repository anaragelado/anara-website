import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";
import MenuSection from "@/components/sections/MenuSection";
import TakeawaySection from "@/components/sections/TakeawaySection";
import LocationsSection from "@/components/sections/LocationsSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import { fetchLocationsWithHours } from "@/lib/fetch-hours";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const locations = await fetchLocationsWithHours();

  return (
    <main className="w-full overflow-hidden">
      <HeroSection />
      <StorySection />
      <MenuSection />
      <TakeawaySection />
      <LocationsSection locations={locations} />
      <ReviewsSection />
    </main>
  );
}
