"use client";
import { useRef } from "react";
import { gsap, useGSAP, MOTION } from "@/components/garden/gsap";
import { rng } from "@/components/garden/growth";

// Organic closed blob as a cubic path (Catmull-Rom through wobbly points).
function blob(cx: number, cy: number, r: number, seed: number, wob = 0.22, n = 9) {
  const rand = rng(seed);
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const rr = r * (1 - wob + rand() * wob * 2);
    return [cx + Math.cos(a) * rr * 1.1, cy + Math.sin(a) * rr];
  });
  const f = (v: number) => Math.round(v);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + "Z";
}
const CX = 1240, CY = 1000;
const B0 = blob(CX, CY, 30, 1, 0.3);
const STEPS = [blob(CX, CY, 260, 2, 0.3), blob(CX - 60, CY - 60, 700, 3, 0.26), blob(CX, CY - 100, 1200, 4, 0.2), blob(CX, CY - 200, 2300, 5, 0.12)];

export default function BeforeAfter() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        el.classList.add("is-anim");
        const path = el.querySelector<SVGPathElement>("#ba-blob")!;
        const sprout = el.querySelector<SVGPathElement>(".ba-sprout path")!;
        const L = sprout.getTotalLength() + 1;
        gsap.set(sprout, { strokeDasharray: L, strokeDashoffset: L });
        gsap.set(path, { attr: { d: B0 } });
        const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.8 } });
        tl.to({}, { duration: 0.3 });
        STEPS.forEach((d, i) => tl.to(path, { morphSVG: { shape: d, type: "rotational" }, duration: i === 0 ? 0.6 : 1, ease: "sine.inOut" }));
        tl.to(sprout, { strokeDashoffset: 0, duration: tl.duration() - 0.3 }, 0.3)
          .fromTo(el.querySelectorAll(".ba-sprout .leafy"), { scale: 0, transformOrigin: "0% 50%" }, { scale: 1, stagger: 1, duration: 0.4, ease: "back.out(2)" }, 1)
          .fromTo(el.querySelector(".tag-before"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3 }, 2.6)
          .fromTo(el.querySelector(".tag-after"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 2.6)
          .to({}, { duration: 0.4 });
        return () => el.classList.remove("is-anim");
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="ba" id="transformation" aria-label="Before and after">
      <div className="ba-sticky">
        <div className="ba-head">
          <h2>
            Same bed, <em>fresh start</em>.
          </h2>
        </div>
        <div className="ba-anim">
          <svg className="ba-svg" viewBox="0 0 2400 1600" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A patchy bed of weathered mulch becomes a bed of fresh dark brown mulch">
            <defs>
              <clipPath id="ba-clip">
                <path id="ba-blob" d={B0} />
              </clipPath>
            </defs>
            <image href="/images/garden/before.webp" width="2400" height="1600" preserveAspectRatio="xMidYMid slice" />
            <image href="/images/garden/after.webp" width="2400" height="1600" preserveAspectRatio="xMidYMid slice" clipPath="url(#ba-clip)" />
          </svg>
          <span className="tag tag-before">Before</span>
          <span className="tag tag-after">After</span>
          <svg className="ba-sprout" viewBox="0 0 400 40" aria-hidden="true">
            <path d="M6 34 C 90 30, 150 36, 210 30 S 330 26, 394 30" fill="none" stroke="#5d7a45" strokeWidth="3" strokeLinecap="round" />
            <g transform="translate(110 32) rotate(-50)"><path className="leafy" d="M0 0C4 -5 11 -4 15 0C11 4 4 5 0 0Z" fill="#87a764" /></g>
            <g transform="translate(210 30) rotate(-130)"><path className="leafy" d="M0 0C4 -5 11 -4 15 0C11 4 4 5 0 0Z" fill="#6c8f4e" /></g>
            <g transform="translate(300 28) rotate(-55)"><path className="leafy" d="M0 0C4 -5 11 -4 15 0C11 4 4 5 0 0Z" fill="#87a764" /></g>
            <g transform="translate(386 29)"><circle className="leafy" r="6" fill="#b4532a" /></g>
          </svg>
        </div>
        <div className="ba-static">
          <figure>
            <img src="/images/garden/before.webp" alt="Before: a patchy bed of old, faded mulch with weeds" loading="lazy" />
            <figcaption>Before</figcaption>
          </figure>
          <figure>
            <img src="/images/garden/after.webp" alt="After: the same bed covered in a fresh layer of dark brown mulch" loading="lazy" />
            <figcaption>After</figcaption>
          </figure>
        </div>
        <p className="ba-note">The same bed, weathered and then freshly mulched. Scroll to let it spread.</p>
      </div>
    </section>
  );
}
