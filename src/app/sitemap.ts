import type { MetadataRoute } from "next";
import { AREAS, areaHref } from "@/lib/areas";

const BASE_URL = "https://mulchcompanymn.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    "",
    "/about",
    "/estimate",
    "/terms",
    "/privacy",
    "/sitemap-page",
    "/services/mulch-installation",
  ];

  const cityPages = AREAS.map((a) => areaHref(a.slug));

  return [...staticPages, ...cityPages].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
  }));
}
