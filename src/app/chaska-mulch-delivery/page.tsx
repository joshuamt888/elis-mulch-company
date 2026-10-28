import type { Metadata } from "next";
import CityView from "@/components/garden/CityView";

export const metadata: Metadata = {
  title: "Professional Mulch Installation Chaska, MN",
  description:
    "Mulch delivery in Chaska, MN — Eli's serves both historic and newer homes across the city. Bulk mulch, rock & soil. Locally owned. Free in-person quotes.",
  alternates: { canonical: "https://mulchcompanymn.com/chaska-mulch-delivery" },
  robots: { index: true, follow: true },
};

const data = {
  "slug": "chaska",
  "name": "Chaska",
  "hero": "/images/hero/hero-2.webp",
  "h1": "Professional Mulch Installation in Chaska, MN",
  "heroP": "Professional mulch installation for Chaska homes and businesses. Locally owned, free in-person quotes.",
  "serviceH2": "Mulch Installation in Chaska",
  "serviceP": "Chaska's mix of historic charm and new construction means diverse landscaping needs. Our crew handles everything — from established garden beds near City Square Park to brand-new builds. Book professional installation and keep your yard looking its best.",
  "whyH2": "Why Chaska Homeowners Trust Mulch Company",
  "why": [
    {
      "title": "Based Right Here",
      "desc": "We're based in neighboring Chanhassen — just a short drive from Chaska. We know this community well."
    },
    {
      "title": "Free In-Person Quotes",
      "desc": "We visit your Chaska property and provide accurate pricing based on your actual needs."
    },
    {
      "title": "Expert Installation",
      "desc": "Recurring mulch installation on your schedule. No rebooking, no hassle."
    },
    {
      "title": "Professional Installation",
      "desc": "Expert crew, even coverage, clean edges. Enjoy your time along the Minnesota River instead."
    }
  ],
  "ctaH2": "Ready for a Hassle-Free Yard in Chaska?",
  "ctaP": "Schedule your free in-person quote today."
};

export default function Page() {
  return <CityView {...data} />;
}
