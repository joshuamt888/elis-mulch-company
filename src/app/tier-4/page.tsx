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
      <Footer standalone ctaTitle="A hassle-free yard." ctaText="This is what Mulch Company's new site feels like." />
    </>
  );
}
