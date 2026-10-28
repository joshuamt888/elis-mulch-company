import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/garden/PageHero";
import Why from "@/components/garden/Why";
import MulchTypes from "@/components/garden/MulchTypes";
import Favourites from "@/components/garden/Favourites";
import SocialProof from "@/components/garden/SocialProof";
import Areas from "@/components/garden/Areas";
import Faq from "@/components/garden/Faq";
import { JsonLd } from "@/components/garden/JsonLd";
import { crumbsLd, faqLd, serviceFaqs, serviceLd } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Professional Mulch Installation Near Me | Chanhassen MN",
  description:
    "Professional mulch installation near you. Cedar, hardwood, black & playground mulch installed by expert crews. Free in-person quotes in Chanhassen & western Twin Cities.",
  alternates: {
    canonical: "/services/mulch-installation",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const processSteps = [
  {
    number: "1",
    title: "Assess",
    description:
      "We measure your beds, calculate the cubic yards needed, and recommend the best mulch type for your landscape.",
  },
  {
    number: "2",
    title: "Prepare",
    description:
      "We edge your beds for a clean border and remove old, decomposed mulch if needed to ensure proper depth and drainage.",
  },
  {
    number: "3",
    title: "Install",
    description:
      "Our crew spreads mulch evenly to the ideal 2-3 inch depth, keeping it pulled back from tree trunks and plant stems.",
  },
  {
    number: "4",
    title: "Clean Up",
    description:
      "We blow off walkways, driveways, and patios so your property looks spotless when we leave. No mess, no hassle.",
  },
];

const faqs = [
  {
    question: "How deep should mulch be?",
    answer:
      "We recommend 2 to 3 inches of mulch for most garden beds. This depth suppresses weeds effectively, retains soil moisture, and insulates plant roots without smothering them. We always keep mulch pulled back a few inches from tree trunks and plant stems to prevent rot.",
  },
  {
    question: "Do you remove old mulch first?",
    answer:
      "It depends on the condition. If the existing mulch is thin and well-decomposed, we can install directly on top. If it's built up too thick or is moldy, we'll remove or rake back the old layer first. We'll assess your beds and recommend the best approach during our initial walkthrough.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Most residential mulch installations are completed in a single visit, typically within 2 to 4 hours depending on the size of the property and number of beds. Larger projects may require a half day. We'll give you a time estimate when we provide your quote.",
  },
  {
    question: "Do I need to be home?",
    answer:
      "Not necessarily. As long as we have access to the areas that need mulching and clear instructions, we can complete the work while you're away. Many of our customers schedule installation during work hours and come home to a beautifully finished landscape.",
  },
  {
    question: "How do I get started?",
    answer:
      "Just fill out our contact form or give us a call. We'll schedule a free in-person visit to measure your beds and give you an exact quote. Once you're ready, we'll book your install and take it from there.",
  },
];

// One FAQ: the page's original five questions first, then the extra ones that do not repeat them.
const allFaqs = [...faqs, ...serviceFaqs.filter((q) => !/thick|how long/i.test(q.question))];

export default function MulchInstallationPage() {
  return (
    <>
      <JsonLd data={[faqLd(allFaqs), crumbsLd([{ name: "Home", path: "/" }, { name: "Mulch Installation", path: "/services/mulch-installation" }]), serviceLd("Professional mulch installation", "/services/mulch-installation")]} />
      <Header />
      <main className="gd">
        <PageHero
          h1="Professional Mulch Installation in Minnesota"
          sub="Expert installation, clean results — we handle everything so you never have to think about it."
          image="/images/hero/hero-3.webp"
          alt="Hands spreading wood chip mulch around the base of a tree"
        />

        <section className="pg-intro">
          <h2>Professional Installation, Done Right</h2>
          <p className="pg-intro-p">
            We handle everything — in-person quote, expert installation, and clean-up. Cedar, hardwood, black, red, and playground mulch available. One call and your yard is done.
          </p>
          <div className="pg-two">
            <article className="hws-card">
              <div className="pg-card-img"><Image src="/images/hero/hero-2.webp" alt="Aerial view of garden bed with brown mulch and stepping stones" fill className="object-cover" /></div>
              <div>
                <h3>Even, Professional Coverage</h3>
                <p>Our crews spread mulch to a consistent 2-3 inch depth across all your beds, creating a uniform appearance that enhances your entire landscape. No thin spots, no piles — just clean, level coverage.</p>
              </div>
            </article>
            <article className="hws-card">
              <div className="pg-card-img"><Image src="/images/hero/hero-9.webp" alt="Colonial home with fresh red mulch in flower beds" fill className="object-cover" /></div>
              <div>
                <h3>Instant Curb Appeal</h3>
                <p>Fresh mulch is one of the fastest ways to transform your home&apos;s exterior. Crisp bed edges and rich color make your landscaping look brand new — without the weeks of labor it would take to do it yourself.</p>
              </div>
            </article>
          </div>
        </section>

        <Why
          title="Why Choose Mulch Company MN"
          intro="We don't list prices online because every property is different — and you deserve an accurate number, not a guess. Here's what you get when you work with us."
          items={[
            { title: "Free In-Person Quote", desc: "We visit your property, measure your beds, and give you an exact price on the spot." },
            { title: "Expert Crews", desc: "Trained installers who know proper depth, clean edges, and how to make it look great." },
            { title: "Fair Pricing", desc: "Honest quotes based on your actual property. No hidden fees, no surprises." },
            { title: "Zero Mess", desc: "We blow off all walkways and driveways when we're done. Your yard looks spotless." },
          ]}
        />
        <p className="pg-btn-row"><Link href="/estimate" className="btn btn-accent">Get Your Free In-Person Quote</Link></p>

        <section className="pg-process">
          <h2>Our Installation Process</h2>
          <p className="pg-intro-p">From assessment to clean-up, we handle every step so your landscape looks its best without you lifting a finger.</p>
          <div className="pg-steps">
            {processSteps.map((st) => (
              <article key={st.number} className="why-card">
                <span className="pg-n">{st.number}</span>
                <h3>{st.title}</h3>
                <p>{st.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pg-ba">
          <h2>Before &amp; After</h2>
          <p className="pg-intro-p">See the difference professional mulch installation makes. Old, faded mulch replaced with fresh, vibrant coverage that transforms the entire look of a property.</p>
          <figure className="pg-ba-fig">
            <div className="pg-ba-img"><Image src="/images/hero/hero-8.webp" alt="Before and after comparison of old versus fresh mulch installation" fill className="object-cover" /></div>
            <figcaption>A typical mulch refresh: tired, thinning mulch replaced with 3 inches of fresh double-shredded hardwood. Clean edges, proper depth, and a finished look that lasts all season.</figcaption>
          </figure>
        </section>

        <MulchTypes />
        <Favourites />
        <SocialProof />
        <Faq items={allFaqs} title="Frequently Asked Questions" />
        <Areas />
      </main>
      <Footer ctaTitle="Let Us Handle the Hard Part" ctaText="Get a free in-person quote. We'll measure your beds, recommend the right mulch, and handle the full installation. No heavy lifting, no mess." />
    </>
  );
}
