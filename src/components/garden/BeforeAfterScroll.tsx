"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, reduced } from "@/components/garden/gsap";
import { workSrc } from "@/lib/work";

/** Three real jobs, Eli's own photos. */
const PAIRS = [
  { title: "Hillside steps", before: "hillside-garden-timber-steps", after: "staircase-bed-black-mulch", altB: "Overgrown hillside bed beside a timber staircase, before mulching", altA: "The same hillside bed after: fresh dark mulch, clean edging and new plantings" },
  { title: "Stepping-stone bed", before: "stepping-stone-bed-mulch", after: "red-mulch-stepping-stones", altB: "Stepping-stone bed with old, faded mulch", altA: "The same bed after: a fresh layer of red mulch" },
  { title: "Rock-lined bed", before: "rock-border-bed-lawn", after: "rock-lined-bed-black-mulch", altB: "Rock-lined bed with gravel and leaf litter, before", altA: "The same rock-lined bed after: fresh black mulch" },
];
const N = PAIRS.length;
const SEG = 1.2; // screens of scrolling given to each pair

/**
 * Pinned before/after, same idea as Mom's Design Build's home page: scrolling wipes the "before" away to show the
 * "after", and a hairline rides the edge of the wipe. The arrows jump to the next job and play its wipe.
 */
export default function BeforeAfterScroll() {
  const root = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const [after, setAfter] = useState(false);
  const [still, setStill] = useState(false);

  useGSAP(
    () => {
      if (reduced()) { setStill(true); setAfter(true); return; }
      const el = root.current;
      if (!el) return;
      const afters = el.querySelectorAll<HTMLElement>(".bas-after");
      const lines = el.querySelectorAll<HTMLElement>(".bas-line");
      const apply = (p: number) => {
        const x = Math.min(0.9999, Math.max(0, p)) * N;
        const i = Math.floor(x);
        const w = Math.min(1, Math.max(0, (x - i - 0.08) / 0.62));
        afters.forEach((a, k) => { const v = k < i ? 1 : k === i ? w : 0; a.style.clipPath = `inset(0 ${(1 - v) * 100}% 0 0)`; });
        lines.forEach((l, k) => { l.style.left = `${(k === i ? w : 0) * 100}%`; l.style.opacity = k === i && w > 0 && w < 1 ? "1" : "0"; });
        setIdx((c) => (c === i ? c : i));
        setAfter(w > 0.5);
      };
      const st = ScrollTrigger.create({ trigger: el, start: "top top", end: "bottom bottom", onUpdate: (s) => apply(s.progress), onRefresh: (s) => apply(s.progress) });
      apply(0);
      return () => st.kill();
    },
    { scope: root }
  );

  const go = (to: number) => {
    const el = root.current;
    if (!el) return;
    const t = (to + N) % N;
    if (still) { setIdx(t); return; }
    const top = el.getBoundingClientRect().top + window.scrollY;
    const seg = (el.offsetHeight - window.innerHeight) / N;
    const from = top + t * seg + 2;
    const proxy = { y: from };
    window.scrollTo({ top: from, behavior: "instant" as ScrollBehavior });
    gsap.to(proxy, { y: from + seg * 0.72, duration: 1.8, ease: "power2.inOut", onUpdate: () => window.scrollTo({ top: proxy.y, behavior: "instant" as ScrollBehavior }) });
  };

  return (
    <section ref={root} id="transformation" className="bas" style={still ? undefined : { height: `${(1 + N * SEG) * 100}svh` }} aria-label="Before and after photos of our mulch jobs">
      <div className={still ? "bas-stage static" : "bas-stage"}>
        <div className="bas-in">
          <div className="bas-copy">
            <h2>
              Same bed, <em>fresh start.</em>
            </h2>
            <p className="bas-cap">{PAIRS[idx].title}</p>
            <p className="bas-hint">{still ? "Use the arrows to see each job." : "Keep scrolling to wipe from before to after."}</p>
          </div>
          <div className="bas-card">
            {PAIRS.map((p, k) => (
              <div key={p.title} className={k === idx ? "bas-layer on" : "bas-layer"}>
                <Image src={workSrc(p.before)} alt={p.altB} fill sizes="(max-width: 760px) 92vw, 560px" className="object-cover" style={{ filter: "saturate(0.8) brightness(0.92)" }} />
                <div className="bas-after" style={{ clipPath: still ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}>
                  <Image src={workSrc(p.after)} alt={p.altA} fill sizes="(max-width: 760px) 92vw, 560px" className="object-cover" />
                </div>
                <div className="bas-line" aria-hidden style={{ left: "0%", opacity: 0 }} />
              </div>
            ))}
            <span className="bas-tag">{after ? "After" : "Before"}</span>
          </div>
          <div className="bas-nav">
            <button type="button" className="bas-btn" aria-label="Previous job" onClick={() => go(idx - 1)}>&larr;</button>
            <span className="bas-count">{idx + 1} / {N}</span>
            <button type="button" className="bas-btn" aria-label="Next job" onClick={() => go(idx + 1)}>&rarr;</button>
          </div>
        </div>
      </div>
    </section>
  );
}
