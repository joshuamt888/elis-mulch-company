import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/garden/Hero";
import Intro from "@/components/garden/Intro";
import Seasons from "@/components/garden/Seasons";
import Steps from "@/components/garden/Steps";
import BeforeAfter from "@/components/garden/BeforeAfter";
import SocialProof from "@/components/garden/SocialProof";
import Favourites from "@/components/garden/Favourites";
import Areas from "@/components/garden/Areas";
import Faq from "@/components/garden/Faq";
import { JsonLd } from "@/components/garden/JsonLd";
import { faqLd, homeFaqs } from "@/lib/faq";

export default function Home() {
  return (
    <>
      <JsonLd data={faqLd(homeFaqs)} />
      <Header />
      <main className="gd">
        <Hero />
        <Intro />
        <BeforeAfter />
        <SocialProof />
        <Steps />
        <Favourites />
        <Seasons />
        <Faq items={homeFaqs} title="Mulch questions, answered" />
        <Areas />
      </main>
      <Footer />
    </>
  );
}
