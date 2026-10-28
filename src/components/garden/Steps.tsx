"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/components/garden/gsap";

const STEPS = [
  { n: "01", t: "Schedule a quote", d: "We visit your property and assess your needs in person. No guesswork.", img: "/images/garden/step-1.webp", alt: "A tape measure and a clipboard resting beside a garden bed" },
  { n: "02", t: "Schedule your install", d: "We confirm your install week and set everything up.", img: "/images/garden/step-2.webp", alt: "A fresh mound of dark mulch beside a wheelbarrow and shovels" },
  { n: "03", t: "We handle the rest", d: "Our crew installs fresh mulch on schedule. You never lift a finger.", img: "/images/garden/step-3.webp", alt: "A finished garden bed with crisp edges and fresh dark mulch" },
];
const N = STEPS.length;

/** Pinned, scroll-driven steps: the list stays put, the active step opens, and the framed photo changes as you scroll. Click a step to jump to it. */
export default function Steps({ standalone = false }: { standalone?: boolean } = {}) {
  const outer = useRef<HTMLElement>(null);
  const st = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    st.current = ScrollTrigger.create({
      trigger: outer.current, start: "top top", end: "bottom bottom",
      onUpdate: (s) => setActive(Math.min(N - 1, Math.floor(s.progress * N))),
    });
    return () => st.current?.kill();
  }, []);

  const go = (i: number) => {
    const t = st.current;
    if (!t) return setActive(i);
    window.scrollTo({ top: t.start + ((i + 0.5) / N) * (t.end - t.start), behavior: "smooth" });
  };

  return (
    <section ref={outer} className="hiw" id="how-it-works" style={{ height: `${N * 70 + 100}vh` }}>
      <div className="hiw-sticky">
        <div className="hiw-grid">
          <div className="hiw-photo-col">
            <div className="hiw-frame">
              <div className="hiw-photo">
                {STEPS.map((s, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={s.n} src={s.img} alt={s.alt} loading="lazy" className={i === active ? "on" : ""} />
                ))}
                <div className="hiw-cap">Step {active + 1} / {N}</div>
              </div>
            </div>
          </div>
          <div className="hiw-copy">
            <h2>
              Three steps, <em>zero mess.</em>
            </h2>
            <ol className="hiw-steps">
              {STEPS.map((s, i) => (
                <li key={s.n} className={`hiw-step${i === active ? " on" : ""}`} onClick={() => go(i)}>
                  <div className="hiw-row">
                    <span className="hiw-n">{s.n}</span>
                    <div>
                      <h3 className="hiw-t">{s.t}</h3>
                      <div className="hiw-d"><div><p>{s.d}</p></div></div>
                    </div>
                  </div>
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
