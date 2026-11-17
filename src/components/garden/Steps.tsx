"use client";
import Link from "next/link";
import { useState } from "react";

const STEPS = [
  { n: "01", t: "Schedule a quote", d: "We visit your property and assess your needs in person. No guesswork.", img: "/images/garden/step-1.webp", alt: "A tape measure and a clipboard resting beside a garden bed" },
  { n: "02", t: "Schedule your install", d: "We confirm your install week and set everything up.", img: "/images/garden/step-2.webp", alt: "A fresh mound of dark mulch beside a wheelbarrow and shovels" },
  { n: "03", t: "We handle the rest", d: "Our crew installs fresh mulch on schedule. You never lift a finger.", img: "/images/garden/step-3.webp", alt: "A finished garden bed with crisp edges and fresh dark mulch" },
];

/** The steps, flowing with the page (no pin, Eli 2026-11-16). Every step is readable; tapping one shows its photo. */
type Step = (typeof STEPS)[number];
export default function Steps({ standalone = false, steps = STEPS, title }: { standalone?: boolean; steps?: Step[]; title?: React.ReactNode } = {}) {
  const N = steps.length;
  const [active, setActive] = useState(0);

  return (
    <section className="hiw" id="how-it-works">
      <div className="hiw-sticky">
        <div className="hiw-grid">
          <div className="hiw-photo-col">
            <div className="hiw-frame">
              <div className="hiw-photo">
                {steps.map((s, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={s.n} src={s.img} alt={s.alt} loading="lazy" className={i === active ? "on" : ""} />
                ))}
                <div className="hiw-cap">Step {active + 1} / {N}</div>
              </div>
            </div>
          </div>
          <div className="hiw-copy">
            <h2>{title ?? <>Three steps, <em>zero mess.</em></>}</h2>
            <ol className="hiw-steps">
              {steps.map((s, i) => (
                <li key={s.n} className={`hiw-step${i === active ? " on" : ""}`}>
                  <button type="button" className="hiw-row" aria-pressed={i === active} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}>
                    <span className="hiw-n">{s.n}</span>
                    <div>
                      <h3 className="hiw-t">{s.t}</h3>
                      <div className="hiw-d"><div><p>{s.d}</p></div></div>
                    </div>
                  </button>
                </li>
              ))}
            </ol>
            {!standalone && <p className="hiw-cta"><Link className="btn btn-accent" href="/estimate">Price mulch</Link></p>}
          </div>
        </div>
      </div>
    </section>
  );
}
