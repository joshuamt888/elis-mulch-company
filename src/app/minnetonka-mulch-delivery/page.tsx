import type { Metadata } from "next";
import CityView from "@/components/garden/CityView";

export const metadata: Metadata = {
  title: "Professional Mulch Installation Minnetonka, MN",
  description:
    "Mulch installation and delivery near Minnetonka, MN. Black, cedar, red and brown mulch spread by our own crew. Free in-person quote, call (952) 314-4797.",
  alternates: { canonical: "https://mulchcompanymn.com/minnetonka-mulch-delivery" },
  robots: { index: true, follow: true },
};

const data = {
  "slug": "minnetonka",
  "name": "Minnetonka",
  "hero": "/images/work/blue-spruce-rock-bed.webp",
  "h1": "Professional Mulch Installation in Minnetonka, MN",
  "heroP": "Professional mulch installation for Minnetonka homes and businesses. Locally owned, free in-person quotes.",
  "serviceH2": "Mulch Installation in Minnetonka",
  "serviceP": "Minnetonka homeowners invest in their landscapes. Our professional installation team works with established perennial beds, wooded lots, and expansive estate gardens across the community. Subscribe for recurring service that matches Minnetonka's high standards.",
  "whyH2": "Why Minnetonka Homeowners Trust Mulch Company",
  "why": [
    {
      "title": "Based Right Here",
      "desc": "We're based in Chanhassen, just minutes from Minnetonka. We understand the Lake Minnetonka area's landscaping standards."
    },
    {
      "title": "Free In-Person Quotes",
      "desc": "We visit your property and provide accurate pricing. No online guesswork."
    },
    {
      "title": "Expert Installation",
      "desc": "Recurring installation to keep your distinguished Minnetonka property looking its best."
    },
    {
      "title": "Professional Installation",
      "desc": "Our crew delivers a polished finish that matches Minnetonka's high standards."
    }
  ],
  "ctaH2": "Ready for a Hassle-Free Yard in Minnetonka?",
  "ctaP": "Schedule your free in-person quote today."
};

export default function Page() {
  return <CityView {...data} />;
}
