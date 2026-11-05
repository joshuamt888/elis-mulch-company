import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/garden/PageHero";
import BeforeAfterScroll from "@/components/garden/BeforeAfterScroll";
import ScrollWords from "@/components/garden/ScrollWords";
import MulchWords from "@/components/garden/MulchWords";
import Steps from "@/components/garden/Steps";
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

const INSTALL_STEPS = [
  { n: "01", t: "Free in-person quote", d: "We walk your property, measure every bed, work out the cubic yards and give you an exact price on the spot.", img: "/images/work/rock-border-bed-lawn.webp", alt: "A bed bordered by rock beside a lawn before mulching" },
  { n: "02", t: "Edge and prep", d: "Crisp bed edges, and old decomposed mulch pulled back where needed so depth and drainage are right.", img: "/images/work/fresh-mulch-mounds-trees.webp", alt: "Fresh mounds of mulch staged around trees" },
  { n: "03", t: "Spread to depth", d: "Mulch goes down level at 2-3 inches and stays clear of trunks and stems. No thin spots, no piles.", img: "/images/work/red-mulch-stepping-stones.webp", alt: "Freshly spread red mulch around stepping stones" },
  { n: "04", t: "Blown clean", d: "Walkways, driveway and patio are blown off before we go. You come home to a finished yard.", img: "/images/work/black-mulch-stone-house-walkway.webp", alt: "Fresh black mulch beside a clean stone walkway at a house" },
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
      <main className="gd cv">
        <PageHero
          h1="Professional Mulch Installation in Minnesota"
          sub="Expert installation, clean results — we handle everything so you never have to think about it."
          image="/images/work/driveway-island-mulch-bed.webp"
          alt="Hands spreading wood chip mulch around the base of a tree"
        />

        <ScrollWords text="The fastest way to make your yard look *loved.*" />

        <Steps title={<>How an install goes, <em>start to spotless.</em></>} steps={INSTALL_STEPS} />

        <BeforeAfterScroll />

        <Favourites city="Minnesota" />
        <MulchWords />
        <SocialProof />
        <Faq items={allFaqs} title="Frequently Asked Questions" />
        <Areas />
      </main>
      <Footer ctaTitle="Let Us Handle the Hard Part" ctaText="Get a free in-person quote. We'll measure your beds, recommend the right mulch, and handle the full installation. No heavy lifting, no mess." />
    </>
  );
}
