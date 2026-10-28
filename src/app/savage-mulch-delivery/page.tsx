import type { Metadata } from "next";
import CityView from "@/components/garden/CityView";

export const metadata: Metadata = {
  title: "Professional Mulch Installation Savage, MN",
  description:
    "Bulk mulch and soil delivery to Savage, MN by Eli's Mulch Company. Serving south metro residential yards and garden beds. Locally owned. Free in-person quotes.",
  alternates: { canonical: "https://mulchcompanymn.com/savage-mulch-delivery" },
  robots: { index: true, follow: true },
};

const data = {
  "slug": "savage",
  "name": "Savage",
  "hero": "/images/hero/hero-1.webp",
  "h1": "Professional Mulch Installation in Savage, MN",
  "heroP": "Professional mulch installation for Savage homes and businesses. Locally owned, free in-person quotes.",
  "serviceH2": "Mulch Installation in Savage",
  "serviceP": "Whether your Savage home backs up to the Minnesota Valley National Wildlife Refuge or sits in a newer subdivision, our crews deliver expert mulch installation that enhances your curb appeal. Subscribe for recurring, hassle-free service.",
  "whyH2": "Why Savage Homeowners Trust Mulch Company",
  "why": [
    {
      "title": "Based Right Here",
      "desc": "We're based in Chanhassen, just minutes from Savage. Fast service and true local knowledge."
    },
    {
      "title": "Free In-Person Quotes",
      "desc": "We visit your property and provide accurate pricing. No online guesswork."
    },
    {
      "title": "Expert Installation",
      "desc": "Recurring installation to keep your Savage landscaping looking sharp all year."
    },
    {
      "title": "Professional Installation",
      "desc": "Save hours of work and enjoy the Minnesota River trails instead."
    }
  ],
  "ctaH2": "Ready for a Hassle-Free Yard in Savage?",
  "ctaP": "Schedule your free in-person quote today."
};

export default function Page() {
  return <CityView {...data} />;
}
