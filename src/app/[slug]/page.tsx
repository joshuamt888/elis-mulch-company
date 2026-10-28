import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  const facts = NEW_CITIES[key];
  return area && facts ? { area, facts, hero: HEROES[Object.keys(NEW_CITIES).indexOf(key) % HEROES.length] } : null;
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

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = find((await params).slug);
  if (!c) notFound();
  const { area, facts, hero } = c;
  const city = area.name;
  const others = AREAS.filter((a) => a.slug !== area.slug);
  return (
    <>
      <Header />

      <section className="relative h-[60vh] min-h-[400px]">
        <Image src={`/images/hero/${hero}.webp`} alt={`Professional mulch installation in ${city}, MN`} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#1a1208]/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-outfit font-bold max-w-4xl">Professional Mulch Installation in {city}, MN</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">Professional mulch installation for {city} homes and businesses. Locally owned, free in-person quotes.</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/estimate" className="bg-blossom hover:bg-blossom-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors">Price Mulch</Link>
            <a href="tel:9523144797" className="border-2 border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-lg transition-colors">Call (952) 314-4797</a>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-sand text-center mb-12">Mulch Installation in {city}</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white shadow-sm border border-soil-dark/50 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-sand mb-3">Professional Mulch Installation</h3>
              <p className="text-bark mb-4">
                {facts.housing} Our crews install fresh mulch with even coverage and clean edges, and we visit your property first so the quote is accurate.
              </p>
              <Link href="/services/mulch-installation" className="text-bark font-semibold hover:text-blossom transition-colors">Learn More →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-soil py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-sand text-center mb-12">Why {city} Homeowners Trust Mulch Company</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Locally Owned", desc: `We're based in Chanhassen and install mulch across the Twin Cities metro, including ${city}.` },
              { title: "Free In-Person Quotes", desc: "We visit your property and provide accurate pricing. No online guesswork." },
              { title: "Expert Installation", desc: "Professional installation completed on your schedule." },
              { title: "You Never Lift a Finger", desc: "Our crew installs fresh mulch and leaves the bed clean. We handle it all." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <svg className="mx-auto mb-4 h-10 w-10 text-bark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <h3 className="text-sand font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-bark">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-outfit font-bold text-sand mb-3">Around {city}</h2>
          <p className="text-bark mb-6">{city} is in {facts.county} County. A few places you may know:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {facts.landmarks.map((l) => (<span key={l} className="bg-soil text-sand font-medium px-4 py-2 rounded-full text-sm">{l}</span>))}
          </div>
        </div>
      </section>

      <section className="bg-soil py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-outfit font-bold text-sand mb-8">We Also Serve</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {others.map((a) => (<Link key={a.slug} href={areaHref(a.slug)} className="bg-white hover:bg-blossom hover:text-white text-sand font-medium px-4 py-2 rounded-full transition-colors text-sm">{a.name}</Link>))}
          </div>
        </div>
      </section>

      <section className="bg-blossom py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-white mb-4">Ready for a Hassle-Free Yard in {city}?</h2>
          <p className="text-white/80 text-lg mb-8">Schedule your free in-person quote today.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/estimate" className="bg-white text-blossom hover:bg-blossom-light font-semibold px-6 py-3 rounded-lg transition-colors">Price Mulch</Link>
            <a href="tel:9523144797" className="border-2 border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-lg transition-colors">Call (952) 314-4797</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
