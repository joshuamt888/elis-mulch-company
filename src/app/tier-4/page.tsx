import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Hero from "@/components/garden/Hero";
import Intro from "@/components/garden/Intro";
import BeforeAfter from "@/components/garden/BeforeAfter";
import SocialProof from "@/components/garden/SocialProof";
import Steps from "@/components/garden/Steps";
import Favourites from "@/components/garden/Favourites";
import Seasons from "@/components/garden/Seasons";
import { Expect } from "@/components/garden/Expect";

// A self-contained showcase of the full build: no menu, no links to other pages, hidden from search.
export const metadata: Metadata = {
  title: "Mulch Company MN | New site preview",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: undefined },
};

export default function Tier4() {
  return (
    <>
      <div className="t4-logo">
        <Image src="/images/logos/logo-horizontal.png" alt="Mulch Company" width={220} height={70} className="h-12 w-auto" priority />
      </div>
      <main className="gd">
        <Hero standalone />
        <Intro standalone />
        <BeforeAfter />
        <SocialProof standalone />
        <Steps standalone />
        <Favourites />
        <Seasons />
      </main>
      <Footer standalone>
        <Expect
          title="What to expect."
          sub="More city pages, real answers to real questions, and markup Google can read. Here is what changes for search."
          rows={[
            { label: "Pages on the site", from: 19, to: 29 },
            { label: "City pages", from: 12, to: 22 },
            { label: "Words on a typical city page", from: 250, to: 1900 },
            { label: "Questions answered on a city page", from: 0, to: 12 },
            { label: "Pages with FAQ answers Google can show", from: 0, to: 26 },
          ]}
          chart={{ title: "What a comparable build did", start: 3, end: 104, unit: "ranking keywords", caption: "A local service site built the same way, with 22 city pages, went from 3 to 104 ranking keywords in 3 months (Semrush)." }}
          foot="Pages, words and questions are counted on the current site and the new one. The ranking chart is another site's real result, shown as a reference: rankings take time and results vary, so it is not a guarantee."
          accent="#e0548a"
          card="#ffffff"
        />
      </Footer>
    </>
  );
}
