import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";
import MenuSection from "@/components/sections/MenuSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <HeroSection />
      <StorySection />
      <MenuSection />
    </main>
  );
}
