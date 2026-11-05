import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/garden/PageHero";
import Why from "@/components/garden/Why";
import HowStatic from "@/components/garden/HowStatic";
import Favourites from "@/components/garden/Favourites";
import SocialProof from "@/components/garden/SocialProof";
import Areas from "@/components/garden/Areas";
import Faq from "@/components/garden/Faq";
import { JsonLd } from "@/components/garden/JsonLd";
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
      <main className="gd cv">
        <PageHero h1="About Mulch Company" sub="Locally owned. Community driven. Mulch obsessed." image="/images/work/blue-spruce-rock-bed.webp" alt="Rock-lined garden bed with a blue spruce and fresh mulch beside a home" />

        <section className="pg-story">
          <div>
            <h2>Our Story</h2>
            <p>
              Mulch Company MN is a family-owned business based in Chanhassen, founded by brothers Eli and Owen Sweeney. We deliver and install mulch for homeowners and commercial properties across the western Twin Cities metro. Our goal is simple — do the job right and make the process easy from start to finish.
            </p>
            <p className="pg-partner-line">
              We install mulch for Freshwater Landscaping and refer them landscaping leads in return.{" "}
              <a href="https://www.freshwaterlandscaping.com/services/mulch-installation.html" target="_blank" rel="noopener" className="text-link">Freshwater Landscaping &rarr;</a>
            </p>
          </div>
          <div className="pg-photo">
            <Image src="/images/work/driveway-island-mulch-bed.webp" alt="Rock-edged mulch bed in a driveway island with new plantings" fill className="object-cover" />
          </div>
        </section>

        <Why title="What We Stand For" items={values} cols={3} />

        <Areas />
        <HowStatic />
        <Favourites />
        <SocialProof />
        <Faq items={aboutFaqs} title="About Mulch Company" />
      </main>
      <Footer ctaTitle="Ready to get started?" ctaText="Get a free estimate or call us today." />
    </>
  );
}
