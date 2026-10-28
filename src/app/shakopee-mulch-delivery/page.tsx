import type { Metadata } from "next";
import CityView from "@/components/garden/CityView";

export const metadata: Metadata = {
  title: "Professional Mulch Installation Shakopee, MN",
  description:
    "Eli's Mulch delivers bulk mulch, rock & soil across Shakopee — new construction and established homes. Locally owned and operated. Free in-person quotes.",
  alternates: { canonical: "https://mulchcompanymn.com/shakopee-mulch-delivery" },
  robots: { index: true, follow: true },
};

const data = {
  "slug": "shakopee",
  "name": "Shakopee",
  "hero": "/images/hero/hero-7.webp",
  "h1": "Professional Mulch Installation in Shakopee, MN",
  "heroP": "Professional mulch installation for Shakopee homes and businesses. Locally owned, free in-person quotes.",
  "serviceH2": "Mulch Installation in Shakopee",
  "serviceP": "From homes near Valleyfair to the residential areas along the Minnesota River bluffs, our crews install mulch with care and precision throughout Shakopee. Book professional installation and spend your Saturdays relaxing instead of hauling wheelbarrows.",
  "whyH2": "Why Shakopee Homeowners Trust Mulch Company",
  "why": [
    {
      "title": "Based Right Here",
      "desc": "We're based in Chanhassen, just minutes from Shakopee via Highway 101. Fast service with no long waits."
    },
    {
      "title": "Free In-Person Quotes",
      "desc": "We visit your property and provide accurate pricing. No online guesswork."
    },
    {
      "title": "Expert Installation",
      "desc": "Professional installation completed on your schedule."
    },
    {
      "title": "Professional Installation",
      "desc": "Spend your Saturday at Valleyfair instead of hauling wheelbarrows. We handle it all."
    }
  ],
  "ctaH2": "Ready for a Hassle-Free Yard in Shakopee?",
  "ctaP": "Schedule your free in-person quote today."
};

export default function Page() {
  return <CityView {...data} />;
}
