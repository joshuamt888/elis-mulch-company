import type { Metadata } from "next";
import CityView from "@/components/garden/CityView";

export const metadata: Metadata = {
  title: "Professional Mulch Installation Waconia, MN",
  description:
    "Mulch installation and delivery near Waconia, MN. Black, cedar, red and brown mulch spread by our own crew. Free in-person quote, call (952) 314-4797.",
  alternates: { canonical: "https://mulchcompanymn.com/waconia-mulch-delivery" },
  robots: { index: true, follow: true },
};

const data = {
  "slug": "waconia",
  "name": "Waconia",
  "hero": "/images/work/blue-spruce-garden-boulders.webp",
  "h1": "Professional Mulch Installation in Waconia, MN",
  "heroP": "Professional mulch installation for Waconia homes and businesses. Locally owned, free in-person quotes.",
  "serviceH2": "Mulch Installation in Waconia",
  "serviceP": "Waconia homeowners take pride in their lakeshore and residential landscapes. Our crew installs mulch with care, whether you're refreshing beds near the lake or building out new garden areas. Subscribe and spend your day on the lake instead.",
  "whyH2": "Why Waconia Homeowners Trust Mulch Company",
  "why": [
    {
      "title": "Based Right Here",
      "desc": "We're based in Chanhassen, just minutes from Waconia. Local service with a personal touch."
    },
    {
      "title": "Free In-Person Quotes",
      "desc": "We visit your property and provide accurate pricing. No online guesswork."
    },
    {
      "title": "Expert Installation",
      "desc": "Recurring installation so your lakeside property always looks its best."
    },
    {
      "title": "Professional Installation",
      "desc": "Spend your day on Waconia Lake instead of spreading mulch by hand."
    }
  ],
  "ctaH2": "Ready for a Hassle-Free Yard in Waconia?",
  "ctaP": "Schedule your free in-person quote today."
};

export default function Page() {
  return <CityView {...data} />;
}
