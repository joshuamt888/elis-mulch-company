import type { Metadata } from "next";
import CityView from "@/components/garden/CityView";

export const metadata: Metadata = {
  title: "Professional Mulch Installation Chanhassen, MN",
  description:
    "Mulch installation and delivery near Chanhassen, MN. Black, cedar, red and brown mulch spread by our own crew. Free in-person quote, call (952) 314-4797.",
  alternates: { canonical: "https://mulchcompanymn.com/chanhassen-mulch-delivery" },
  robots: { index: true, follow: true },
};

const data = {
  "slug": "chanhassen",
  "name": "Chanhassen",
  "hero": "/images/work/staircase-bed-black-mulch.webp",
  "h1": "Professional Mulch Installation in Chanhassen, MN",
  "heroP": "Professional mulch installation for Chanhassen homes and businesses. Locally owned, free in-person quotes.",
  "serviceH2": "Mulch Installation in Chanhassen",
  "serviceP": "Chanhassen is our home base. We install mulch professionally across every property type — from established garden beds to new construction. We visit your property, provide a free in-person quote, and handle the full installation. No heavy lifting, no hassle.",
  "whyH2": "Why Chanhassen Homeowners Trust Mulch Company",
  "why": [
    {
      "title": "Based Right Here",
      "desc": "Chanhassen is our home base — we're your true local mulch company. No long drives, no delays."
    },
    {
      "title": "Free In-Person Quotes",
      "desc": "We visit your property to assess your needs and provide accurate, fair pricing. No guessing."
    },
    {
      "title": "Expert Installation",
      "desc": "Set it and forget it. We install fresh mulch on a recurring schedule so your yard always looks great."
    },
    {
      "title": "Professional Installation",
      "desc": "Expert crew, even coverage, clean edges, zero mess. We treat your yard like our own."
    }
  ],
  "ctaH2": "Ready for a Hassle-Free Yard in Chanhassen?",
  "ctaP": "Schedule your free in-person quote today."
};

export default function Page() {
  return <CityView {...data} />;
}
