import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/garden/Hero";
import ScrollWords from "@/components/garden/ScrollWords";
import Seasons from "@/components/garden/Seasons";
import Steps from "@/components/garden/Steps";
import BeforeAfterSlider from "@/components/garden/BeforeAfterSlider";
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
      <main className="gd home">
        <Hero />
        <ScrollWords text="The fastest way to make your yard look *loved.*" />
        <BeforeAfterSlider />
        <SocialProof />
        <Steps />
        <Seasons />
        <Favourites />
        <Areas />
        <Faq items={homeFaqs} title="Mulch questions, answered" />
      </main>
      <Footer />
    </>
  );
}
