import type { Metadata } from "next";
import CityView from "@/components/garden/CityView";

export const metadata: Metadata = {
  title: "Professional Mulch Installation Eden Prairie, MN",
  description:
    "Eli's Mulch delivers premium bulk mulch and landscaping materials to Eden Prairie properties. Serving west metro suburbs. Locally owned. Free in-person quotes.",
  alternates: { canonical: "https://mulchcompanymn.com/eden-prairie-mulch-delivery" },
  robots: { index: true, follow: true },
};

const data = {
  "slug": "eden-prairie",
  "name": "Eden Prairie",
  "hero": "/images/hero/hero-5.webp",
  "h1": "Professional Mulch Installation in Eden Prairie, MN",
  "heroP": "Professional mulch installation for Eden Prairie homes and businesses. Locally owned, free in-person quotes.",
  "serviceH2": "Mulch Installation in Eden Prairie",
  "serviceP": "Eden Prairie properties deserve top-tier landscaping. Our installation crews work across the city, handling everything from small garden beds to expansive commercial properties along Prairie Center Drive. Book professional installation and never worry about your mulch again.",
  "whyH2": "Why Eden Prairie Homeowners Trust Mulch Company",
  "why": [
    {
      "title": "Based Right Here",
      "desc": "We're based in Chanhassen, just minutes from Eden Prairie. Quick response times and local knowledge you can count on."
    },
    {
      "title": "Free In-Person Quotes",
      "desc": "We visit your property to assess your needs and provide accurate, honest pricing."
    },
    {
      "title": "Expert Installation",
      "desc": "Set it and forget it. Recurring mulch installation on a schedule that works for you."
    },
    {
      "title": "Professional Installation",
      "desc": "Expert crew, even coverage, clean edges. Save hours of work and let us handle it."
    }
  ],
  "ctaH2": "Ready for a Hassle-Free Yard in Eden Prairie?",
  "ctaP": "Schedule your free in-person quote today."
};

export default function Page() {
  return <CityView {...data} />;
}
