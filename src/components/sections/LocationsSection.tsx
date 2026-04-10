"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Mail } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import FadeIn from "@/components/FadeIn";
import { getLocationStatus, type Location, type DayHours } from "@/data/locations";

function OpenIndicator({ hours }: { hours: DayHours[] }) {
  const t = useTranslations("locations");
  const status = getLocationStatus(hours);

  const dotClass = {
    open: "bg-brand-green",
    closingSoon: "bg-brand-yellow animate-pulse",
    openSoon: "bg-brand-yellow",
    closed: "bg-red-400",
  }[status];

  const labelKey = {
    open: "openNow",
    closingSoon: "closingSoon",
    openSoon: "openSoon",
    closed: "closed",
  }[status];

  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium">
      <span className={`h-2 w-2 rounded-full ${dotClass}`} />
      {t(labelKey)}
    </span>
  );
}

function HoursTable({ hours }: { hours: DayHours[] }) {
  const t = useTranslations("locations");

  return (
    <table className="mt-4 w-full text-sm">
      <tbody>
        {hours.map((h) => (
          <tr key={h.day} className="border-b border-gray-100 last:border-0">
            <td className="py-1.5 font-medium">{t(`days.${h.day}`)}</td>
            <td className="py-1.5 text-right text-text-secondary">
              {h.open === "Closed" ? t("dayClosed") : `${h.open} – ${h.close}`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function LocationCard({ location }: { location: Location }) {
  const t = useTranslations("locations");

  // Build a Google Maps embed URL from coordinates
  const embedSrc = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3000!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2spt!4v1`;

  return (
    <div className="rounded-2xl border border-gray-100 bg-background-secondary p-5 shadow-sm md:p-6">
      {/* Map */}
      <div className="overflow-hidden rounded-2xl">
        <iframe
          src={embedSrc}
          width="100%"
          height="220"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={location.name}
        />
      </div>

      {/* Info */}
      <div className="mt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading text-lg font-semibold">{location.name}</h3>
            <p className="mt-1 text-sm text-text-secondary">{location.address}</p>
          </div>
          <OpenIndicator hours={location.hours} />
        </div>

        <h4 className="mt-5 text-sm font-semibold">{t("hours")}</h4>
        <HoursTable hours={location.hours} />

        <a
          href={location.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-5 py-2 text-sm font-semibold text-text-primary transition-all duration-300 ease-in-out hover:scale-105 hover:bg-brand-green hover:text-white"
        >
          <MapPin size={16} strokeWidth={1.5} />
          {t("getDirections")}
        </a>
      </div>
    </div>
  );
}

interface LocationsSectionProps {
  locations: Location[];
}

export default function LocationsSection({ locations }: LocationsSectionProps) {
  const t = useTranslations("locations");
  const [activeTab, setActiveTab] = useState<"hq" | "mobile">("hq");

  return (
    <SectionWrapper id="locations">
      {/* Section header */}
      <FadeIn className="text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-2 font-accent text-2xl text-text-secondary md:text-3xl">
          {t("subtitle")}
        </p>
      </FadeIn>

      {/* Mobile toggle */}
      <div className="mt-10 flex justify-center gap-2 md:hidden">
        <button
          type="button"
          onClick={() => setActiveTab("hq")}
          className={`min-h-[44px] rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ease-in-out hover:scale-105 ${
            activeTab === "hq"
              ? "bg-brand-yellow text-text-primary"
              : "bg-gray-100 text-text-secondary"
          }`}
        >
          {t("hq")}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("mobile")}
          className={`min-h-[44px] rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ease-in-out hover:scale-105 ${
            activeTab === "mobile"
              ? "bg-brand-yellow text-text-primary"
              : "bg-gray-100 text-text-secondary"
          }`}
        >
          {t("mobile")}
        </button>
      </div>

      {/* Mobile: show active tab only */}
      <div className="mt-6 md:hidden">
        {locations
          .filter((loc) => loc.id === activeTab)
          .map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
      </div>

      {/* Desktop: two-column split */}
      <FadeIn delay={0.1} className="mt-10 hidden gap-6 md:grid md:grid-cols-2">
        {locations.map((loc) => (
          <LocationCard key={loc.id} location={loc} />
        ))}
      </FadeIn>

      {/* Private Events & Catering */}
      <FadeIn delay={0.2} className="mt-12 rounded-2xl border border-gray-100 bg-background-secondary p-6 text-center shadow-sm md:p-8">
        <h3 className="font-heading text-xl font-semibold md:text-2xl">
          {t("eventsTitle")}
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-base text-text-secondary">
          {t("eventsText")}
        </p>
        <a
          href="mailto:hello@anaragelado.pt"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-2.5 text-sm font-semibold text-text-primary transition-all duration-300 ease-in-out hover:scale-105 hover:bg-brand-green hover:text-white"
        >
          <Mail size={16} strokeWidth={1.5} />
          {t("eventsCta")}
        </a>
      </FadeIn>
    </SectionWrapper>
  );
}
