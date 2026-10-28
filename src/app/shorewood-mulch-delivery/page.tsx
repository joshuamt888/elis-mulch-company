import type { Metadata } from "next";
import CityView from "@/components/garden/CityView";

export const metadata: Metadata = {
  title: "Professional Mulch Installation Shorewood, MN",
  description:
    "Mulch delivery in Shorewood, MN for homes near Lake Minnetonka. Eli's Mulch Company serves long-term homeowners who invest in their properties. Free quotes.",
  alternates: { canonical: "https://mulchcompanymn.com/shorewood-mulch-delivery" },
  robots: { index: true, follow: true },
};

const data = {
  "slug": "shorewood",
  "name": "Shorewood",
  "hero": "/images/hero/hero-2.webp",
  "h1": "Professional Mulch Installation in Shorewood, MN",
  "heroP": "Professional mulch installation for Shorewood homes and businesses. Locally owned, free in-person quotes.",
  "serviceH2": "Mulch Installation in Shorewood",
  "serviceP": "Shorewood's natural, wooded landscapes benefit from expert mulch installation. Our crew works carefully around mature trees, native plantings, and shoreline gardens. Book professional installation and enjoy a beautiful property year-round.",
  "whyH2": "Why Shorewood Homeowners Trust Mulch Company",
  "why": [
    {
      "title": "Based Right Here",
      "desc": "We're based in Chanhassen, just minutes from Shorewood. Reliable local service for this quiet lakeside community."
    },
    {
      "title": "Free In-Person Quotes",
      "desc": "We visit your property and provide accurate, fair pricing."
    },
    {
      "title": "Expert Installation",
      "desc": "Professional installation for Shorewood's wooded, lakeside properties."
    },
    {
      "title": "Professional Installation",
      "desc": "Enjoy a peaceful afternoon in Shorewood while our crew handles the work."
    }
  ],
  "ctaH2": "Ready for a Hassle-Free Yard in Shorewood?",
  "ctaP": "Schedule your free in-person quote today."
};

export default function Page() {
  return <CityView {...data} />;
}
