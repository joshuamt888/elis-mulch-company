import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Why from "@/components/garden/Why";
import MulchTypes from "@/components/garden/MulchTypes";
import HowStatic from "@/components/garden/HowStatic";
import SocialProof from "@/components/garden/SocialProof";
import Favourites from "@/components/garden/Favourites";
import Faq from "@/components/garden/Faq";
import Areas from "@/components/garden/Areas";
import { JsonLd } from "@/components/garden/JsonLd";
import { AREAS } from "@/lib/areas";
import { CITY_FACTS } from "@/lib/cityFacts";
import { cityFaqs, crumbsLd, faqLd, serviceLd } from "@/lib/faq";

export type CityProps = { slug: string; name: string; hero: string; h1: string; heroP: string; serviceH2: string; serviceP: string; whyH2: string; why: { title: string; desc: string }[]; ctaH2: string; ctaP: string };

/** One layout for every city page. The page's own words (headline, intro, trust cards, CTA) are passed in unchanged. */
export default function CityView(p: CityProps) {
  const facts = CITY_FACTS[p.slug];
  const faqs = cityFaqs(p.name, p.slug);
  const path = `/${p.slug}-mulch-delivery`;
  return (
    <>
      <JsonLd data={[faqLd(faqs), crumbsLd([{ name: "Home", path: "/" }, { name: p.name, path }]), serviceLd(`Mulch installation in ${p.name}, MN`, path, p.name)]} />
      <Header />
      <main className="gd">
        <section className="cv-hero">
          <Image src={p.hero} alt={`Professional mulch installation in ${p.name}, MN`} fill className="object-cover" priority />
          <div className="cv-hero-shade" aria-hidden />
          <div className="cv-hero-in">
            <h1>{p.h1}</h1>
            <p>{p.heroP}</p>
            <div className="btns">
              <Link href="/estimate" className="btn btn-accent">Price Mulch</Link>
              <a href="tel:9523144797" className="btn cv-call">Call (952) 314-4797</a>
            </div>
            <div className="cv-stats">
              <span><b>5.0</b> on Google</span>
              <span><b>Mon&ndash;Fri</b> 8 AM &ndash; 6 PM</span>
              <span><b>{AREAS.length}</b> cities served</span>
              <span><b>Free</b> in-person quotes</span>
            </div>
          </div>
        </section>

        <section className="cv-intro">
          <div className="cv-intro-main">
            <h2>{p.serviceH2}</h2>
            <p className="cv-lede">{p.serviceP}</p>
            <p><Link className="text-link" href="/services/mulch-installation">About mulch installation</Link></p>
          </div>
          {facts && (
            <aside className="cv-local">
              <h3>About {p.name}</h3>
              <p>{facts.housing}</p>
              <div className="cv-chips">
                {facts.landmarks.map((l) => (<span key={l}>{l}</span>))}
              </div>
              <p className="cv-county">{facts.county} County</p>
            </aside>
          )}
        </section>

        <Why title={p.whyH2} items={p.why} />
        <MulchTypes city={p.name} />
        <Favourites />
        <HowStatic />
        <SocialProof />
        <Faq items={faqs} title={`Mulch questions in ${p.name}`} />
        <Areas />

      </main>
      <Footer ctaTitle={p.ctaH2} ctaText={p.ctaP} />
    </>
  );
}
