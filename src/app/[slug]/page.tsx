import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityView from "@/components/garden/CityView";
import { AREAS, areaHref } from "@/lib/areas";
import { NEW_CITIES } from "@/lib/newCities";

export const dynamicParams = false;
const slugOf = (s: string) => s.replace(/-mulch-delivery$/, "");
export function generateStaticParams() {
  return Object.keys(NEW_CITIES).map((c) => ({ slug: `${c}-mulch-delivery` }));
}
const HEROES = ["hero-1", "hero-2", "hero-3", "hero-5", "hero-7", "hero-9"];
const find = (param: string) => {
  const key = slugOf(param);
  const area = AREAS.find((a) => a.slug === key);
  return area && NEW_CITIES[key] ? { area, hero: HEROES[Object.keys(NEW_CITIES).indexOf(key) % HEROES.length] } : null;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = find((await params).slug);
  if (!c) return {};
  return {
    title: `Professional Mulch Installation ${c.area.name}, MN`,
    description: `Professional mulch installation in ${c.area.name}, MN. Locally owned Mulch Company, free in-person quotes. Call (952) 314-4797.`,
    alternates: { canonical: `https://mulchcompanymn.com${areaHref(c.area.slug)}` },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const c = find((await params).slug);
  if (!c) notFound();
  const city = c.area.name;
  return (
    <CityView
      slug={c.area.slug}
      name={city}
      hero={`/images/hero/${c.hero}.webp`}
      h1={`Professional Mulch Installation in ${city}, MN`}
      heroP={`Professional mulch installation for ${city} homes and businesses. Locally owned, free in-person quotes.`}
      serviceH2={`Mulch Installation in ${city}`}
      serviceP={`Our crews install fresh mulch across ${city} with even coverage and clean edges, and we visit your property first so the quote is accurate. You never lift a finger.`}
      whyH2={`Why ${city} Homeowners Trust Mulch Company`}
      why={[
        { title: "Locally Owned", desc: `We're based in Chanhassen and install mulch across the Twin Cities metro, including ${city}.` },
        { title: "Free In-Person Quotes", desc: "We visit your property and provide accurate pricing. No online guesswork." },
        { title: "Expert Installation", desc: "Professional installation completed on your schedule." },
        { title: "You Never Lift a Finger", desc: "Our crew installs fresh mulch and leaves the bed clean. We handle it all." },
      ]}
      ctaH2={`Ready for a Hassle-Free Yard in ${city}?`}
      ctaP="Schedule your free in-person quote today."
    />
  );
}
