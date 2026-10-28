import Image from "next/image";
import Link from "next/link";

export default function PageHero({ h1, sub, image, alt, eyebrow }: { h1: string; sub?: string; image: string; alt: string; eyebrow?: string }) {
  return (
    <section className="cv-hero ph">
      <Image src={image} alt={alt} fill className="object-cover" priority />
      <div className="cv-hero-shade" aria-hidden />
      <div className="cv-hero-in">
        {eyebrow && <p className="ph-eyebrow">{eyebrow}</p>}
        <h1>{h1}</h1>
        {sub && <p>{sub}</p>}
        <div className="btns">
          <Link href="/estimate" className="btn btn-accent">Price Mulch</Link>
          <a href="tel:9523144797" className="btn cv-call">Call (952) 314-4797</a>
        </div>
      </div>
    </section>
  );
}
