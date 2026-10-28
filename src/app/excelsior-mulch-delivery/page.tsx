import type { Metadata } from "next";
import CityView from "@/components/garden/CityView";

export const metadata: Metadata = {
  title: "Professional Mulch Installation Excelsior, MN",
  description:
    "Mulch delivery for Excelsior homes and gardens near Lake Minnetonka. Eli's Mulch Company offers bulk mulch, rock & soil. Locally owned. Free in-person quotes.",
  alternates: { canonical: "https://mulchcompanymn.com/excelsior-mulch-delivery" },
  robots: { index: true, follow: true },
};

const data = {
  "slug": "excelsior",
  "name": "Excelsior",
  "hero": "/images/hero/hero-9.webp",
  "h1": "Professional Mulch Installation in Excelsior, MN",
  "heroP": "Professional mulch installation for Excelsior homes and businesses. Locally owned, free in-person quotes.",
  "serviceH2": "Mulch Installation in Excelsior",
  "serviceP": "Excelsior's well-maintained gardens and historic properties need careful attention. Our crews handle installations from quaint cottage gardens to sprawling lakefront estates with equal expertise. Subscribe for hassle-free recurring service.",
  "whyH2": "Why Excelsior Homeowners Trust Mulch Company",
  "why": [
    {
      "title": "Based Right Here",
      "desc": "We're based in Chanhassen, just minutes from Excelsior. We know Lake Minnetonka area properties well."
    },
    {
      "title": "Free In-Person Quotes",
      "desc": "We visit your property and provide accurate pricing tailored to your landscape."
    },
    {
      "title": "Expert Installation",
      "desc": "Recurring installation so your lakefront property always looks pristine."
    },
    {
      "title": "Professional Installation",
      "desc": "Enjoy an afternoon on Lake Minnetonka while we handle the hard work."
    }
  ],
  "ctaH2": "Ready for a Hassle-Free Yard in Excelsior?",
  "ctaP": "Schedule your free in-person quote today."
};

export default function Page() {
  return <CityView {...data} />;
}
