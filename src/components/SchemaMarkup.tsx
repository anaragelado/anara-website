const BASE_URL = "https://anaragelado.pt";

export default function SchemaMarkup({ locale }: { locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "IceCreamShop",
        "@id": `${BASE_URL}/#hq`,
        name: "Anara Gelado Artesanal",
        url: BASE_URL,
        image: `${BASE_URL}/assets/og-image.jpg`,
        email: "info@anaragelado.pt",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Estrada da Bela Vista 144",
          addressLocality: "Charneca de Caparica",
          postalCode: "2820-166",
          addressCountry: "PT",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 38.6290808471835,
          longitude: -9.18808227289466,
        },
        hasMap: "https://maps.app.goo.gl/2eSjBQy21V8MnQ9U7",
        sameAs: ["https://www.instagram.com/anara.geladoartesanal"],
        servesCuisine: locale === "pt" ? "Gelado Artesanal" : "Artisanal Gelato",
        priceRange: "€€",
        inLanguage: locale === "pt" ? "pt-PT" : "en-GB",
      },
      {
        "@type": "IceCreamShop",
        "@id": `${BASE_URL}/#mobile`,
        name: "Anara Gelado Artesanal - Caparica",
        url: BASE_URL,
        image: `${BASE_URL}/assets/og-image.jpg`,
        email: "info@anaragelado.pt",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Av. Gen. Humberto Delgado 3",
          addressLocality: "Costa de Caparica",
          postalCode: "2825-337",
          addressCountry: "PT",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 38.64057216634567,
          longitude: -9.23595848206488,
        },
        hasMap: "https://maps.app.goo.gl/qWspRKD1hvDDoyhq6",
        sameAs: ["https://www.instagram.com/anara.geladoartesanal"],
        servesCuisine: locale === "pt" ? "Gelado Artesanal" : "Artisanal Gelato",
        priceRange: "€€",
        inLanguage: locale === "pt" ? "pt-PT" : "en-GB",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
