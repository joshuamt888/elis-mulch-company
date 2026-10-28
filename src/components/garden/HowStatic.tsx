import Link from "next/link";

const STEPS = [
  { n: "01", t: "Schedule a quote", d: "We visit your property and assess your needs in person. No guesswork.", img: "/images/garden/step-1.webp", alt: "A tape measure and a clipboard resting beside a garden bed" },
  { n: "02", t: "Schedule your install", d: "We confirm your install week and set everything up.", img: "/images/garden/step-2.webp", alt: "A fresh mound of dark mulch beside a wheelbarrow and shovels" },
  { n: "03", t: "We handle the rest", d: "Our crew installs fresh mulch on schedule. You never lift a finger.", img: "/images/garden/step-3.webp", alt: "A finished garden bed with crisp edges and fresh dark mulch" },
];

/** The same three steps as the home page, without the pinned scroll, for inner pages. */
export default function HowStatic() {
  return (
    <section className="hws" id="how-it-works">
      <h2>
        Three steps, <em>zero mess.</em>
      </h2>
      <div className="hws-grid">
        {STEPS.map((s) => (
          <article key={s.n} className="hws-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.img} alt={s.alt} loading="lazy" />
            <div>
              <span>{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="hws-cta"><Link className="btn btn-accent" href="/estimate">Price mulch</Link></p>
    </section>
  );
}
