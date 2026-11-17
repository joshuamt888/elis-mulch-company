"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, MOTION } from "@/components/garden/gsap";

const SEASONS = [
  {
    name: "Spring",
    img: "/images/garden/spring.webp",
    alt: "A white colonial house in spring with a pink crabapple in bloom and a curving bed of fresh dark mulch with tulips and daffodils",
    cap: "A fresh layer of dark mulch under a blooming crabapple.",
    mood: "Beds wake up.",
    line: "Spring is mulch season. A fresh layer finishes the beds, keeps them tidy and helps the soil hold moisture as things warm up.",
    bg: "#EDF1E2",
    ink: "#1c1c1c",
  },
  {
    name: "Summer",
    img: "/images/garden/summer.webp",
    alt: "A white colonial house in summer with a lush curving bed of red-brown mulch, white hydrangeas and purple coneflowers",
    cap: "Red-brown mulch under hydrangeas and coneflowers.",
    mood: "Cool roots.",
    line: "A layer of mulch shades the soil, so plants stay cooler and the beds need less weeding through the heat.",
    bg: "#F8EFD9",
    ink: "#1c1c1c",
  },
  {
    name: "Fall",
    img: "/images/garden/fall.webp",
    alt: "A white house in fall with orange and red trees and a curving bed of dark mulch with mums and ornamental grasses",
    cap: "A fall layer of mulch among mums and grasses.",
    mood: "Tuck them in.",
    line: "A fall layer goes down before the freeze to protect roots through winter. We install it clean around trees, shrubs and beds.",
    bg: "#F1DCC6",
    ink: "#2b1d12",
  },
  {
    name: "Winter",
    img: "/images/garden/winter.webp",
    alt: "A white house at dusk after a snowfall, with dark mulch showing through the snow in a curving garden bed",
    cap: "Dark mulch showing through the first snow.",
    mood: "Plan for spring.",
    line: "Book your spring install early. We visit, quote it in person and confirm your install week.",
    bg: "#1E2830",
    ink: "#EEF2F5",
  },
];


type P = { k: number; x: number; y: number; vx: number; vy: number; r: number; vr: number; s: number; ph: number; c: string; life: number; max: number; a: number };
const COLORS = [
  ["#f6c9c0", "#fbe3dc", "#ffffff", "#f2b8a9"],
  ["#f3d27a", "#fff1c4", "#ffffff"],
  ["#c8622f", "#d9912f", "#a8452a", "#e0b04a", "#8a5a2b"],
  ["#ffffff", "#f4f8fb", "#dfe8ee"],
];

const N = SEASONS.length;

/**
 * The year in four stops. A click-through (arrows, the season names, or a sideways swipe), not a pinned
 * scroll (Eli, 2026-11-16). The falling layer (petals, sun motes, leaves, snow) follows the season on show.
 */
export default function Seasons() {
  const root = useRef<HTMLElement>(null);
  const [cur, setCur] = useState(0);
  const curRef = useRef(0);
  useEffect(() => { curRef.current = cur; }, [cur]);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const go = (i: number) => setCur(((i % N) + N) % N);

  useGSAP(
    () => {
      const el = root.current!;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        // Falling layer: petals, sun motes, leaves, snow, blended by scroll position.
        const canvas = el.querySelector("canvas")!;
        const sticky = el.querySelector<HTMLElement>(".seasons-stage")!;
        const ctx = canvas.getContext("2d")!;
        let w = 0, h = 0, dpr = 1;
        const size = () => {
          dpr = Math.min(2, window.devicePixelRatio || 1);
          w = sticky.clientWidth;
          h = sticky.clientHeight;
          canvas.width = w * dpr;
          canvas.height = h * dpr;
        };
        size();
        const ro = new ResizeObserver(size);
        ro.observe(sticky);

        const small = w < 700;
        const rates = small ? [0.28, 0.2, 0.26, 0.6] : [0.5, 0.35, 0.45, 1.1];
        const cap = small ? 80 : 170;
        const ps: P[] = [];
        const rnd = (a: number, b: number) => a + Math.random() * (b - a);
        const spawn = (k: number) => {
          const cs = COLORS[k];
          const c = cs[Math.floor(Math.random() * cs.length)];
          if (k === 1) ps.push({ k, x: rnd(0, w), y: rnd(h * 0.1, h), vx: rnd(-0.15, 0.15), vy: rnd(-0.35, -0.1), r: 0, vr: 0, s: rnd(1.4, 3.6), ph: rnd(0, 6), c, life: 0, max: rnd(180, 360), a: 1 });
          else if (k === 0) ps.push({ k, x: rnd(-40, w), y: -20, vx: rnd(0.2, 0.7), vy: rnd(0.6, 1.2), r: rnd(0, 6), vr: rnd(-0.03, 0.03), s: rnd(4, 8), ph: rnd(0, 6), c, life: 0, max: 1e9, a: 1 });
          else if (k === 2) ps.push({ k, x: rnd(-60, w), y: -24, vx: rnd(0.3, 1.1), vy: rnd(1.2, 2.2), r: rnd(0, 6), vr: rnd(-0.06, 0.06), s: rnd(8, 15), ph: rnd(0, 6), c, life: 0, max: 1e9, a: 1 });
          else ps.push({ k, x: rnd(-20, w + 20), y: -10, vx: rnd(-0.2, 0.3), vy: rnd(0.5, 1.4), r: 0, vr: 0, s: rnd(1, 3.4), ph: rnd(0, 6), c, life: 0, max: 1e9, a: 1 });
        };

        const draw = (p: P) => {
          ctx.save();
          ctx.translate(p.x, p.y);
          if (p.k === 1) {
            const a = Math.sin((p.life / p.max) * Math.PI);
            ctx.globalAlpha = p.a * a * (0.55 + 0.45 * Math.sin(p.life * 0.08 + p.ph));
            ctx.fillStyle = p.c;
            ctx.beginPath();
            ctx.arc(0, 0, p.s, 0, 6.283);
            ctx.fill();
          } else if (p.k === 3) {
            ctx.globalAlpha = 0.9 * p.a;
            ctx.fillStyle = p.c;
            ctx.beginPath();
            ctx.arc(0, 0, p.s, 0, 6.283);
            ctx.fill();
          } else {
            ctx.globalAlpha = p.a;
            ctx.rotate(p.r);
            ctx.scale(1, Math.cos(p.life * 0.05 + p.ph)); // tumbling
            ctx.fillStyle = p.c;
            ctx.beginPath();
            if (p.k === 0) ctx.ellipse(0, 0, p.s, p.s * 0.55, 0, 0, 6.283);
            else {
              const s = p.s;
              ctx.moveTo(-s, 0);
              ctx.bezierCurveTo(-s * 0.4, -s * 0.6, s * 0.5, -s * 0.5, s, 0);
              ctx.bezierCurveTo(s * 0.5, s * 0.5, -s * 0.4, s * 0.6, -s, 0);
            }
            ctx.fill();
            if (p.k === 2) {
              ctx.strokeStyle = "rgba(60,30,10,.35)";
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(-p.s * 1.2, 0);
              ctx.lineTo(p.s * 0.9, 0);
              ctx.stroke();
            }
          }
          ctx.restore();
        };

        const tick = (_t: number, dtMs: number) => {
          const dt = Math.min(3, dtMs / 16.67);
          const cur = curRef.current; // the season on show
          if (ps.length < cap && Math.random() < rates[cur] * dt) spawn(cur);
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, w, h);
          for (let i = ps.length - 1; i >= 0; i--) {
            const p = ps[i];
            p.life += dt;
            p.x += (p.vx + Math.sin(p.life * 0.03 + p.ph) * (p.k === 1 ? 0.1 : 0.5)) * dt;
            p.y += p.vy * dt;
            p.r += p.vr * dt;
            // Once you step to another season, the old season's particles fade out in ~1/3 s.
            if (p.k !== cur) p.a -= 0.05 * dt;
            if (p.a <= 0 || p.y > h + 30 || p.life > p.max || p.x > w + 60) {
              ps.splice(i, 1);
              continue;
            }
            draw(p);
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
          ro.disconnect();
          gsap.ticker.remove(tick);
        };
      });
    },
    { scope: root }
  );

  const s = SEASONS[cur];
  return (
    <section ref={root} className="seasons" id="seasons" aria-roledescription="carousel" aria-label="Mulch through the year" style={{ background: s.bg, color: s.ink }}>
      <div className="seasons-head">
        <h2>
          How your yard changes, <em>season by season.</em>
        </h2>
      </div>
      <div
        className="seasons-stage"
        onPointerDown={(e) => { if (e.pointerType !== "mouse") swipe.current = { x: e.clientX, y: e.clientY }; }}
        onPointerUp={(e) => {
          const st = swipe.current;
          swipe.current = null;
          if (!st) return;
          const dx = e.clientX - st.x;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - st.y) * 1.5) go(cur + (dx < 0 ? 1 : -1));
        }}
        onPointerCancel={() => (swipe.current = null)}
      >
        {SEASONS.map((x, i) => (
          <article key={x.name} className={i === cur ? "season on" : "season"} aria-hidden={i !== cur} aria-roledescription="slide" aria-label={`${i + 1} of ${N}: ${x.name}`}>
            <div className="season-text">
              <h3 className="season-name">
                <em>{x.name}</em>
              </h3>
              <p className="season-mood">{x.mood}</p>
              <p className="season-line">{x.line}</p>
            </div>
            <figure className="season-photo">
              <div className="season-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={x.img} alt={x.alt} loading="lazy" draggable={false} />
              </div>
              <figcaption>{x.cap}</figcaption>
            </figure>
          </article>
        ))}
        <canvas className="seasons-canvas" aria-hidden="true" />
      </div>
      <div className="season-nav">
        <button type="button" className="bas-btn" aria-label="Previous season" onClick={() => go(cur - 1)}>&larr;</button>
        <div className="season-index">
          <div className="season-track">
            <i className="season-bar" style={{ transform: `translateX(${cur * 100}%)` }} />
          </div>
          {SEASONS.map((x, i) => (
            <button key={x.name} type="button" className={i === cur ? "on" : ""} aria-pressed={i === cur} onClick={() => go(i)}>
              {x.name}
            </button>
          ))}
        </div>
        <button type="button" className="bas-btn" aria-label="Next season" onClick={() => go(cur + 1)}>&rarr;</button>
      </div>
    </section>
  );
}
