import type { Metadata } from "next";
import CityView from "@/components/garden/CityView";

export const metadata: Metadata = {
  title: "Professional Mulch Installation Victoria, MN",
  description:
    "Eli's Mulch Company delivers bulk mulch and landscaping materials to Victoria's large-lot properties. Serving natural surroundings well. Locally owned. Free in-person quotes.",
  alternates: { canonical: "https://mulchcompanymn.com/victoria-mulch-delivery" },
  robots: { index: true, follow: true },
};

const data = {
  "slug": "victoria",
  "name": "Victoria",
  "hero": "/images/hero/hero-1.webp",
  "h1": "Professional Mulch Installation in Victoria, MN",
  "heroP": "Professional mulch installation for Victoria homes and businesses. Locally owned, free in-person quotes.",
  "serviceH2": "Mulch Installation in Victoria",
  "serviceP": "Many Victoria homeowners are landscaping new construction or refreshing mature beds. Our installation crews bring expertise and efficiency to every Victoria project. Book professional installation and enjoy a beautiful yard without the effort.",
  "whyH2": "Why Victoria Homeowners Trust Mulch Company",
  "why": [
    {
      "title": "Based Right Here",
      "desc": "We're based in Chanhassen, right next door to Victoria. Your neighbor is your mulch company."
    },
    {
      "title": "Free In-Person Quotes",
      "desc": "We visit your Victoria property and provide accurate, fair pricing based on your actual needs."
    },
    {
      "title": "Expert Installation",
      "desc": "Recurring mulch installation on your schedule. Set it and forget it."
    },
    {
      "title": "Professional Installation",
      "desc": "Save hours of labor and enjoy Victoria's small-town charm instead."
    }
  ],
  "ctaH2": "Ready for a Hassle-Free Yard in Victoria?",
  "ctaP": "Schedule your free in-person quote today."
};

export default function Page() {
  return <CityView {...data} />;
}
