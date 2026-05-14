import type { MetadataRoute } from "next";

const BASE_URL = "https://anaragelado.pt";

const INTERNAL_ROUTES = [
  "/pt/flavor-sorter",
  "/en/flavor-sorter",
  "/pt/master-review",
  "/en/master-review",
  "/pt/instagram-url-mapper",
  "/en/instagram-url-mapper",
  "/pt/flavor-curator",
  "/en/flavor-curator",
  "/pt/flavor-tagger",
  "/en/flavor-tagger",
  "/pt/color-test",
  "/en/color-test",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: INTERNAL_ROUTES,
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
