"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { reduced } from "@/components/garden/gsap";
import { workSrc } from "@/lib/work";

/** Three real jobs, Eli's own photos. */
const PAIRS = [
  { title: "Hillside steps", before: "hillside-garden-timber-steps", after: "staircase-bed-black-mulch", altB: "Overgrown hillside bed beside a timber staircase, before mulching", altA: "The same hillside bed after: fresh dark mulch, clean edging and new plantings" },
  { title: "Stepping-stone bed", before: "stepping-stone-bed-mulch", after: "red-mulch-stepping-stones", altB: "Stepping-stone bed with old, faded mulch", altA: "The same bed after: a fresh layer of red mulch" },
  { title: "Rock-lined bed", before: "rock-border-bed-lawn", after: "rock-lined-bed-black-mulch", altB: "Rock-lined bed with gravel and leaf litter, before", altA: "The same rock-lined bed after: fresh black mulch" },
];
const N = PAIRS.length;
const EASE = "0.55s cubic-bezier(0.33, 1, 0.68, 1)";

/**
 * Drag-to-compare before/after in a carousel, the interaction from Mom's Design Build's site
 * (`BeforeAfterSlider.tsx` in moms-design-build-remade): drag anywhere on the photo to move the line,
 * arrows step between jobs. `touch-action: pan-y` keeps vertical swipes scrolling the page.
 */
export default function BeforeAfterSlider() {
  const card = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const touched = useRef(false);
  const startX = useRef<number | null>(null);

  const move = (clientX: number) => {
    const r = card.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  // One nudge the first time the photo comes into view, so people see the line moves. Any touch cancels it.
  useEffect(() => {
    const el = card.current;
    if (!el || reduced()) return;
    let timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || touched.current) return;
      io.disconnect();
      timers = ([[38, 350], [64, 1000], [50, 1650]] as const).map(([p, t]) => setTimeout(() => !touched.current && setPos(p), t));
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  const go = (d: number) => { touched.current = true; setIdx((i) => (i + d + N) % N); setPos(50); };
  const p = PAIRS[idx];
  const glide = dragging ? "0s" : EASE; // "left none" is invalid CSS, so 0s, not none

  return (
    <section id="transformation" className="bas" aria-label="Before and after photos of our mulch jobs">
      <div className="bas-in">
        <div className="bas-copy">
          <h2>
            Same bed, <em>fresh start.</em>
          </h2>
          <p className="bas-cap" aria-live="polite">{p.title}</p>
          <p className="bas-hint">Drag the line to compare. Arrows for the next job.</p>
        </div>
        <div
          ref={card}
          className="bas-card"
          role="slider"
          tabIndex={0}
          aria-label={`${p.title}: before and after. Use left and right arrow keys to move the line.`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(100 - pos)}% after showing`}
          onKeyDown={(e) => {
            const step = { ArrowLeft: -5, ArrowRight: 5, Home: -100, End: 100 }[e.key];
            if (step === undefined) return;
            e.preventDefault();
            touched.current = true;
            setPos((v) => Math.min(100, Math.max(0, v + step)));
          }}
          onPointerDown={(e) => {
            touched.current = true;
            setDragging(true);
            e.currentTarget.setPointerCapture(e.pointerId);
            // Mouse jumps the line to the click; touch waits for sideways movement so a scroll flick doesn't move it.
            if (e.pointerType === "mouse") move(e.clientX);
            else startX.current = e.clientX;
          }}
          onPointerMove={(e) => {
            if (!dragging) return;
            if (startX.current !== null && Math.abs(e.clientX - startX.current) < 6) return;
            startX.current = null;
            move(e.clientX);
          }}
          onPointerUp={() => { setDragging(false); startX.current = null; }}
          onPointerCancel={() => { setDragging(false); startX.current = null; }}
        >
          {PAIRS.map((q, k) => (
            <div key={q.title} className={k === idx ? "bas-layer on" : "bas-layer"} aria-hidden={k !== idx}>
              <Image src={workSrc(q.after)} alt={q.altA} fill sizes="(max-width: 760px) 92vw, 560px" className="object-cover" draggable={false} />
              <div className="bas-before" style={{ clipPath: `inset(0 ${100 - (k === idx ? pos : 50)}% 0 0)`, transition: `clip-path ${glide}` }}>
                <Image src={workSrc(q.before)} alt={q.altB} fill sizes="(max-width: 760px) 92vw, 560px" className="object-cover" style={{ filter: "saturate(0.8) brightness(0.92)" }} draggable={false} />
              </div>
            </div>
          ))}
          <div className="bas-line" aria-hidden style={{ left: `${pos}%`, transition: `left ${glide}` }}>
            <span className="bas-handle">
              <svg width="22" height="14" viewBox="0 0 20 12" fill="none">
                <path d="M7 1 2 6l5 5M13 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
          <span className="bas-tag" aria-hidden>Before</span>
          <span className="bas-tag after" aria-hidden>After</span>
        </div>
        <div className="bas-nav">
          <button type="button" className="bas-btn" aria-label="Previous job" onClick={() => go(-1)}>&larr;</button>
          <span className="bas-count">{idx + 1} / {N}</span>
          <button type="button" className="bas-btn" aria-label="Next job" onClick={() => go(1)}>&rarr;</button>
        </div>
      </div>
    </section>
  );
}
