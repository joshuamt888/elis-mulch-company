import type { MetadataRoute } from "next";

const BASE_URL = "https://mulchcompanymn.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    "",
    "/about",
    "/estimate",
    "/privacy",
    "/sitemap-page",
    "/services/mulch-installation",
  ];

  const cityPages = [
    "/chanhassen-mulch-delivery",
    "/eden-prairie-mulch-delivery",
    "/chaska-mulch-delivery",
    "/shakopee-mulch-delivery",
    "/victoria-mulch-delivery",
    "/waconia-mulch-delivery",
    "/excelsior-mulch-delivery",
    "/minnetonka-mulch-delivery",
    "/shorewood-mulch-delivery",
    "/prior-lake-mulch-delivery",
    "/savage-mulch-delivery",
    "/carver-mulch-delivery",
  ];

  return [...staticPages, ...cityPages].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
  }));
}
