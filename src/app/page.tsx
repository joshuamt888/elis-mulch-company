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
import Why from "@/components/garden/Why";
import MulchTypes from "@/components/garden/MulchTypes";
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
        <Why title="Why Chanhassen Trusts Mulch Company" items={[{ title: "Book Online Fast", desc: "Request your installation in minutes. We handle the rest." }, { title: "In-Person Quotes", desc: "We visit your property for accurate pricing." }, { title: "Pro Installation", desc: "Even coverage, clean edges, zero mess." }, { title: "Locally Owned", desc: "Based in Chanhassen, serving the Twin Cities metro." }]} />
        <MulchTypes />
        <Favourites />
        <Seasons />
        <Faq items={homeFaqs} title="Mulch questions, answered" />
        <Areas />
      </main>
      <Footer />
    </>
  );
}
