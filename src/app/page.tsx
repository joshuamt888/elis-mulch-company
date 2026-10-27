import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/garden/Hero";
import Intro from "@/components/garden/Intro";
import Seasons from "@/components/garden/Seasons";
import Steps from "@/components/garden/Steps";
import BeforeAfter from "@/components/garden/BeforeAfter";
import Favourites from "@/components/garden/Favourites";
import Areas from "@/components/garden/Areas";

export default function Home() {
  return (
    <>
      <Header />
      <main className="gd">
        <Hero />
        <Intro />
        <Seasons />
        <Steps />
        <BeforeAfter />
        <Favourites />
        <Areas />
      </main>
      <Footer />
    </>
  );
}
