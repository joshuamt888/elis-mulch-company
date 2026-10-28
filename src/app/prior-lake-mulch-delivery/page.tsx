import type { Metadata } from "next";
import CityView from "@/components/garden/CityView";

export const metadata: Metadata = {
  title: "Professional Mulch Installation Prior Lake, MN",
  description:
    "Mulch delivery in Prior Lake, MN for waterfront and suburban properties. Eli's Mulch Company delivers bulk mulch, rock & soil. Locally owned. Free in-person quotes.",
  alternates: { canonical: "https://mulchcompanymn.com/prior-lake-mulch-delivery" },
  robots: { index: true, follow: true },
};

const data = {
  "slug": "prior-lake",
  "name": "Prior Lake",
  "hero": "/images/hero/hero-7.webp",
  "h1": "Professional Mulch Installation in Prior Lake, MN",
  "heroP": "Professional mulch installation for Prior Lake homes and businesses. Locally owned, free in-person quotes.",
  "serviceH2": "Mulch Installation in Prior Lake",
  "serviceP": "Prior Lake properties range from cozy lakeside cabins to modern suburban homes. Our crew tailors every installation to the property, ensuring clean edges and proper depth. Book professional installation and spend your day on the lake instead.",
  "whyH2": "Why Prior Lake Homeowners Trust Mulch Company",
  "why": [
    {
      "title": "Based Right Here",
      "desc": "We're based in Chanhassen, just minutes from Prior Lake via Highway 13. Quick, reliable local service."
    },
    {
      "title": "Free In-Person Quotes",
      "desc": "We visit your property and provide accurate pricing for your lakeside landscape."
    },
    {
      "title": "Expert Installation",
      "desc": "Recurring installation so your waterfront property always looks its best."
    },
    {
      "title": "Professional Installation",
      "desc": "Spend your day on the lake instead of lugging wheelbarrows of mulch."
    }
  ],
  "ctaH2": "Ready for a Hassle-Free Yard in Prior Lake?",
  "ctaP": "Schedule your free in-person quote today."
};

export default function Page() {
  return <CityView {...data} />;
}
