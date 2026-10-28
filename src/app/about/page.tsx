import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/garden/PageHero";
import Why from "@/components/garden/Why";
import CtaBand from "@/components/garden/CtaBand";
import HowStatic from "@/components/garden/HowStatic";
import Favourites from "@/components/garden/Favourites";
import SocialProof from "@/components/garden/SocialProof";
import Faq from "@/components/garden/Faq";
import { JsonLd } from "@/components/garden/JsonLd";
import { AREAS, areaHref } from "@/lib/areas";
import { aboutFaqs, crumbsLd, faqLd } from "@/lib/faq";

export const metadata: Metadata = {
  title: "About Mulch Company MN | Chanhassen MN",
  description:
    "Mulch Company MN is a locally owned mulch installation company serving Chanhassen and the western Twin Cities metro. Expert crews, clean results, hassle-free yards.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Local First", desc: "We live here, we work here, we care about this community." },
  { title: "No Shortcuts", desc: "Every yard gets our full attention — proper depth, clean edges, zero mess." },
  { title: "Fair Pricing", desc: "Honest quotes, no hidden fees, competitive with the big guys." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[faqLd(aboutFaqs), crumbsLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])]} />
      <Header />
      <main className="gd">
        <PageHero h1="About Mulch Company" sub="Locally owned. Community driven. Mulch obsessed." image="/images/hero/hero-5.webp" alt="Front yard shrubs with fresh mulch" />

        <section className="pg-story">
          <div>
            <h2>Our Story</h2>
            <p>
              Mulch Company MN is a family-owned business based in Chanhassen, founded by brothers Eli and Owen Sweeney. We deliver and install mulch for homeowners and commercial properties across the western Twin Cities metro. Our goal is simple — do the job right and make the process easy from start to finish.
            </p>
          </div>
          <div className="pg-photo">
            <Image src="/images/hero/hero-3.webp" alt="Hands spreading mulch in a garden bed" fill className="object-cover" />
          </div>
        </section>

        <Why title="What We Stand For" items={values} cols={3} />

        <section className="pg-chips">
          <h2>Where We Work</h2>
          <div className="pg-chip-row">
            {AREAS.map((a) => (
              <Link key={a.slug} href={areaHref(a.slug)} className="chip">{a.name}</Link>
            ))}
          </div>
        </section>

        <section className="pg-chips pg-partner">
          <h2>Who We Work With</h2>
          <p>We install mulch for Freshwater Landscaping and refer them landscaping leads in return.</p>
          <a href="https://www.freshwaterlandscaping.com/services/mulch-installation.html" target="_blank" rel="noopener" className="chip pg-partner-link">
            Freshwater Landscaping — Mulch Installation
          </a>
        </section>

        <HowStatic />
        <Favourites />
        <SocialProof />
        <Faq items={aboutFaqs} title="About Mulch Company" />
        <CtaBand title="Ready to get started?" primary="Get a Free Estimate" secondary="Call Us Today" />
      </main>
      <Footer />
    </>
  );
}
