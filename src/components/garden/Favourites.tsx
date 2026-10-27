"use client";
import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, MOTION } from "@/components/garden/gsap";
import { makePlant } from "@/components/garden/growth";
import { PlantG } from "@/components/garden/Flora";

// Mulch swatches pinned to the board, one packet per type, shown on a shovel on a dark tile.
const PACKETS = [
  { name: "Black Mulch", sub: "Deep, dark finish", img: "/images/mulch-colors/black-mulch.png", rot: -4 },
  { name: "Dark Brown Mulch", sub: "Rich and natural", img: "/images/mulch-colors/dark-brown-mulch.png", rot: 3 },
  { name: "Red Mulch", sub: "Bold, bright beds", img: "/images/mulch-colors/red-mulch.png", rot: -2 },
  { name: "Cedar Mulch", sub: "Western red cedar", img: "/images/mulch-colors/western-red-cedar-mulch.png", rot: 5 },
  { name: "Gold Mulch", sub: "Warm and golden", img: "/images/mulch-colors/gold-mulch.png", rot: -3 },
  { name: "Natural Mulch", sub: "Light, classic look", img: "/images/mulch-colors/natural-mulch.png", rot: 2 },
  { name: "Playground Chips", sub: "For play areas", img: "/images/mulch-colors/playground-chips.png", rot: -4 },
];
// Pressed flowers tucked between the packets.
const PRESSED = [
  { p: makePlant(901, "flower", 180, { accent: false }), cls: "pf pf1" },
  { p: makePlant(907, "fern", 200), cls: "pf pf2" },
  { p: makePlant(913, "flower", 160), cls: "pf pf3" },
];

export default function Favourites() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const cards = gsap.utils.toArray<HTMLElement>(".packet-drop", el);
        const pins = gsap.utils.toArray<HTMLElement>(".pin", el);
        gsap.from(cards, {
          y: -260,
          opacity: 0,
          rotation: () => gsap.utils.random(-30, 30),
          duration: 1.3,
          ease: "bounce.out",
          stagger: 0.14,
          scrollTrigger: { trigger: el.querySelector(".board"), start: "top 75%", once: true },
        });
        gsap.from(pins, { scale: 0, duration: 0.5, ease: "back.out(3)", stagger: 0.14, delay: 0.9, scrollTrigger: { trigger: el.querySelector(".board"), start: "top 75%", once: true } });
        gsap.from(".pf", { opacity: 0, scale: 0.6, rotation: -20, duration: 1.2, ease: "power3.out", stagger: 0.2, scrollTrigger: { trigger: el.querySelector(".board"), start: "top 70%", once: true } });

        // Swing: each card hangs from its pin; scroll velocity pushes a damped spring.
        const swings = gsap.utils.toArray<HTMLElement>(".packet-swing", el).map((n, i) => ({ n, a: 0, v: 0, k: 0.8 + (i % 3) * 0.25 }));
        let vel = 0;
        const st = ScrollTrigger.create({ trigger: el, start: "top bottom", end: "bottom top", onUpdate: (s) => (vel = s.getVelocity()) });
        const tick = () => {
          vel *= 0.9;
          for (const s of swings) {
            const target = Math.max(-14, Math.min(14, (-vel / 160) * s.k));
            s.v += (target - s.a) * 0.06;
            s.v *= 0.88;
            s.a += s.v;
            s.n.style.transform = `rotate(${s.a.toFixed(2)}deg)`;
          }
        };
        let on = false;
        const io = new IntersectionObserver(([e]) => {
          if (e.isIntersecting && !on) gsap.ticker.add(tick);
          if (!e.isIntersecting && on) gsap.ticker.remove(tick);
          on = e.isIntersecting;
        });
        io.observe(el);
        return () => {
          io.disconnect();
          st.kill();
          gsap.ticker.remove(tick);
        };
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="favs" id="favourites">
      <div className="favs-head">
        <p className="eyebrow">Pinned up</p>
        <h2>
          A mulch for every <em>yard</em>.
        </h2>
        <p className="favs-sub">We install all the major types. Your quote includes a recommendation for your landscape.</p>
      </div>
      <div className="board">
        {PRESSED.map((f, i) => (
          <svg key={i} className={f.cls} viewBox="-110 -200 220 210" aria-hidden="true">
            <PlantG p={f.p} x={0} y={0} />
          </svg>
        ))}
        {PACKETS.map((k) => (
          <div key={k.name} className="packet" style={{ "--r": `${k.rot}deg` } as React.CSSProperties}>
            <div className="packet-swing">
              <div className="packet-drop">
                <figure className="packet-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="packet-photo" src={k.img} alt={`${k.name} on a shovel`} loading="lazy" />
                  <figcaption>
                    <strong>{k.name}</strong>
                    <em>{k.sub}</em>
                  </figcaption>
                </figure>
              </div>
              <i className="pin" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
