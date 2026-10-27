import Link from "next/link";

const STEPS = [
  { n: "1", t: "Schedule a quote", d: "We visit your property and assess your needs in person. No guesswork." },
  { n: "2", t: "Schedule your install", d: "We confirm your install week and set everything up." },
  { n: "3", t: "We handle the rest", d: "Our crew installs fresh mulch on schedule. You never lift a finger." },
];

export default function Steps() {
  return (
    <section className="steps" id="how-it-works">
      <p className="eyebrow">How it works</p>
      <h2>
        Three steps, <em>zero mess</em>.
      </h2>
      <div className="steps-grid">
        {STEPS.map((s) => (
          <div key={s.n} className="step">
            <b>{s.n}</b>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </div>
        ))}
      </div>
      <p className="steps-cta">
        <Link className="btn btn-accent" href="/estimate">Price mulch</Link>
      </p>
    </section>
  );
}
