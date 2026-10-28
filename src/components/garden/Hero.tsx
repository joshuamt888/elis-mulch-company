"use client";
import { useRef } from "react";
import { gsap, useGSAP, SplitText, MOTION } from "@/components/garden/gsap";
import { makePlant, rng, type Kind } from "@/components/garden/growth";
import { PlantG, growPlant } from "@/components/garden/Flora";

const W = 1440;
const H = 460;

// The garden is laid out once, deterministically: tall on the flanks, a low clearing in the middle.
const GARDEN = (() => {
  const r = rng(11);
  const out: { x: number; seed: number; kind: Kind; h: number; back: boolean }[] = [];
  const N = 44;
  for (let i = 0; i < N; i++) {
    const x = ((i + 0.5) / N) * W + (r() - 0.5) * 24;
    const dist = Math.abs(x - W / 2) / (W / 2);
    const roll = r();
    const clearing = dist < 0.26;
    const kind: Kind = clearing ? (roll < 0.6 ? "grass" : "flower") : roll < 0.18 ? "grass" : roll < 0.4 ? "fern" : "flower";
    const h = clearing ? 60 + r() * 70 : Math.min(470, 170 + dist * 300 * (0.6 + r() * 0.5));
    out.push({ x, seed: 300 + i * 31, kind, h, back: r() < 0.4 });
  }
  return out
    .map((g) => ({ ...g, p: makePlant(g.seed, g.kind, g.back ? g.h * 1.1 : g.h) }))
    .sort((a, b) => Number(b.back) - Number(a.back));
})();

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const svg = el.querySelector<SVGSVGElement>(".hero-garden")!;
      const arch = el.querySelector<HTMLElement>(".hero-arch")!;
      const copy = el.querySelector<HTMLElement>(".hero-copy")!;
      const photo = el.querySelector<HTMLElement>(".hero-photo")!;

      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        [svg, arch, copy].forEach((n) => {
          n.style.animation = "none";
          n.style.opacity = "1";
        });

        const plants = Array.from(svg.querySelectorAll<SVGGElement>(".plant"));
        const tl = gsap.timeline({ delay: 0.15 });
        const r = rng(5);
        plants.forEach((p, i) => {
          const d = Math.abs(GARDEN[i].x - W / 2) / (W / 2);
          tl.add(growPlant(p, 1.25), 0.1 + (1 - d) * 0.35 + r() * 0.35);
        });

        const split = SplitText.create(copy.querySelector("h1"), { type: "words", mask: "words" });
        gsap.set(arch, { clipPath: "inset(100% 0% 0% 0%)" });
        tl.from(split.words, { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.08 }, 0.45)
          .from(copy.querySelectorAll(".eyebrow, .lede, .btns"), { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 }, 0.8)
          .to(arch, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" }, 1.7)
          .from(photo, { scale: 1.25, duration: 2.4, ease: "expo.out" }, 1.8);

        // Scroll: the window opens a touch wider, the garden sinks, the copy lifts away.
        const st = { trigger: el, start: "top top", end: "bottom top", scrub: true };
        gsap.to(arch, { scale: 1.08, ease: "none", scrollTrigger: st });
        gsap.to(svg, { yPercent: 12, ease: "none", scrollTrigger: st });
        gsap.to(copy, { yPercent: -35, opacity: 0.2, ease: "none", scrollTrigger: st });

        // Wind: a slow travelling wave, plus gusts from the pointer on mouse devices.
        const state = plants.map((p, i) => ({
          sw: p.querySelector(".sw")!,
          x: GARDEN[i].x,
          ph: r() * 6.28,
          f: 0.7 + r() * 0.8,
          amp: 1 + r() * 1.6,
          g: 0,
          gv: 0,
        }));
        let running = false;
        const tick = (time: number) => {
          for (const s of state) {
            s.gv += -s.g * 0.035;
            s.gv *= 0.93;
            s.g += s.gv;
            const a = Math.sin(time * s.f + s.ph) * s.amp + Math.sin(time * 0.9 - s.x * 0.004) * 1.4 + s.g;
            s.sw.setAttribute("transform", `rotate(${a.toFixed(2)})`);
          }
        };
        const io = new IntersectionObserver(([e]) => {
          if (e.isIntersecting && !running) gsap.ticker.add(tick);
          if (!e.isIntersecting && running) gsap.ticker.remove(tick);
          running = e.isIntersecting;
        });
        io.observe(el);

        let lastX = 0;
        const onMove = (e: PointerEvent) => {
          const ctm = svg.getScreenCTM();
          if (!ctm) return;
          const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
          const vx = Math.max(-60, Math.min(60, pt.x - lastX));
          lastX = pt.x;
          for (const s of state) {
            const d = Math.abs(s.x - pt.x);
            if (d < 170) s.gv += vx * 0.012 * (1 - d / 170);
          }
        };
        const fine = window.matchMedia("(pointer: fine)").matches;
        if (fine) el.addEventListener("pointermove", onMove);

        return () => {
          io.disconnect();
          gsap.ticker.remove(tick);
          el.removeEventListener("pointermove", onMove);
          split.revert();
        };
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="hero" id="top">
      <div className="hero-arch pre-arch">
        <div className="hero-photo">
          <img src="/images/hero/hero-2.webp" alt="Aerial view of a curving landscape bed of fresh mulch with shrubs, grasses and a stepping-stone path" fetchPriority="high" />
        </div>
      </div>
      <svg className="hero-garden pre" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        {GARDEN.map((g, i) => (
          <PlantG key={i} p={g.p} x={Math.round(g.x * 10) / 10} y={H + 2} s={g.back ? 0.8 : 1} className={g.back ? "plant back" : "plant"} />
        ))}
      </svg>
      <div className="hero-copy pre">
        <h1>
          <span className="sr-only">Professional Mulch Installation in Chanhassen, MN: </span>
          Fresh mulch, <em>done right</em>.
        </h1>
        <p className="lede">Expert installation for homes and businesses. Cedar, hardwood, black mulch and more.</p>
        <div className="btns">
          <a className="btn btn-accent" href="/estimate">
            Price mulch
          </a>
          <a className="btn btn-ghost" href="#seasons">
            See the seasons
          </a>
        </div>
      </div>
    </section>
  );
}
