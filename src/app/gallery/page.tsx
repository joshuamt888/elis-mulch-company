import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/garden/PageHero";
import { JsonLd } from "@/components/garden/JsonLd";
import { crumbsLd } from "@/lib/faq";
import { WORK, workSrc, WORK_W, WORK_H } from "@/lib/work";

export const metadata = {
  title: "Our Work | Mulch Company MN",
  description: "Real mulch installation jobs across the western Twin Cities: fresh dark mulch, crisp edging, and clean beds. Free estimates from Mulch Company.",
  alternates: { canonical: "https://mulchcompanymn.com/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={[crumbsLd([{ name: "Home", path: "/" }, { name: "Our Work", path: "/gallery" }])]} />
      <Header />
      <main className="gd cv">
        <PageHero h1="Our Work" sub="Real mulch jobs from yards across the western Twin Cities." image={workSrc("black-mulch-edging-evergreens")} alt="Fresh dark mulch with crisp edging along evergreens and lawn" />
        <section className="gal" aria-label="Photos of our mulch jobs">
          {WORK.map((p) => (
            <figure key={p.file}>
              <Image src={workSrc(p.file)} alt={p.alt} width={WORK_W} height={WORK_H} sizes="(max-width: 900px) 50vw, 33vw" />
            </figure>
          ))}
        </section>
        <section className="ws ws-cta">
          <h2>
            Want yours to look <em>like this?</em>
          </h2>
          <Link href="/estimate" className="btn btn-accent">Price Mulch</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
