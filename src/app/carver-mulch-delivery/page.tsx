import type { Metadata } from "next";
import CityView from "@/components/garden/CityView";

export const metadata: Metadata = {
  title: "Professional Mulch Installation Carver, MN",
  description:
    "Mulch delivery in Carver, MN by Eli's Mulch Company. Bulk mulch, rock & soil delivered to residential and rural properties. Locally owned. Free in-person quotes.",
  alternates: { canonical: "https://mulchcompanymn.com/carver-mulch-delivery" },
  robots: { index: true, follow: true },
};

const data = {
  "slug": "carver",
  "name": "Carver",
  "hero": "/images/hero/hero-3.webp",
  "h1": "Professional Mulch Installation in Carver, MN",
  "heroP": "Professional mulch installation for Carver homes and businesses. Locally owned, free in-person quotes.",
  "serviceH2": "Mulch Installation in Carver",
  "serviceP": "From Carver's historic downtown homes to brand-new construction along the Minnesota River corridor, our installation crews bring professional results to every property. Book professional installation and enjoy Carver's riverside setting instead of doing yard work.",
  "whyH2": "Why Carver Homeowners Trust Mulch Company",
  "why": [
    {
      "title": "Based Right Here",
      "desc": "We're based in Chanhassen, just minutes from Carver. Your local mulch company serving this historic river town."
    },
    {
      "title": "Free In-Person Quotes",
      "desc": "We visit your property and provide accurate pricing for your specific needs."
    },
    {
      "title": "Expert Installation",
      "desc": "Professional installation for Carver's historic and new properties alike."
    },
    {
      "title": "Professional Installation",
      "desc": "Save hours of labor and enjoy Carver's riverside setting instead."
    }
  ],
  "ctaH2": "Ready for a Hassle-Free Yard in Carver?",
  "ctaP": "Schedule your free in-person quote today."
};

export default function Page() {
  return <CityView {...data} />;
}
