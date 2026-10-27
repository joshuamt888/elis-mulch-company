"use client";
import { useRef } from "react";
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

export default function Seasons() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        el.classList.add("is-anim");
        const arts = Array.from(el.querySelectorAll<HTMLElement>(".season"));
        const bar = el.querySelector<HTMLElement>(".season-bar")!;
        const labels = Array.from(el.querySelectorAll<HTMLElement>(".season-index span"));
        let prog = 0;

        gsap.set(el, { "--bg": SEASONS[0].bg, "--ink": SEASONS[0].ink });
        arts.forEach((a, i) => i && gsap.set(a, { autoAlpha: 0 }));
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            onUpdate: (self) => {
              prog = self.progress;
              const k = Math.min(3, Math.round(prog * 4 - 0.45));
              labels.forEach((l, i) => l.classList.toggle("on", i === Math.max(0, k)));
            },
          },
        });
        for (let k = 1; k < 4; k++) {
          const at = k - 0.3;
          const prev = arts[k - 1];
          const next = arts[k];
          tl.to(prev, { autoAlpha: 0, duration: 0.35 }, at)
            .to(prev.querySelector(".season-name"), { yPercent: -35, duration: 0.35 }, at)
            .to(el, { "--bg": SEASONS[k].bg, "--ink": SEASONS[k].ink, duration: 0.5 }, at)
            .to(bar, { xPercent: k * 100, duration: 0.5 }, at)
            .to(next, { autoAlpha: 1, duration: 0.35 }, at + 0.2)
            .fromTo(next.querySelector(".season-name"), { yPercent: 45 }, { yPercent: 0, duration: 0.45 }, at + 0.2)
            .fromTo(next.querySelector("img"), { scale: 1.15 }, { scale: 1, duration: 0.6 }, at + 0.15);
        }
        tl.to({}, { duration: 0.3 }, 3.7);

        // Falling layer: petals, sun motes, leaves, snow, blended by scroll position.
        const canvas = el.querySelector("canvas")!;
        const sticky = el.querySelector<HTMLElement>(".seasons-sticky")!;
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
          const sf = Math.max(0, Math.min(3, prog * 4 - 0.45));
          const cur = Math.round(sf); // the season whose label is lit
          if (ps.length < cap && Math.random() < rates[cur] * dt) spawn(cur);
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, w, h);
          for (let i = ps.length - 1; i >= 0; i--) {
            const p = ps[i];
            p.life += dt;
            p.x += (p.vx + Math.sin(p.life * 0.03 + p.ph) * (p.k === 1 ? 0.1 : 0.5)) * dt;
            p.y += p.vy * dt;
            p.r += p.vr * dt;
            // Once scrolling has moved on from a particle's season, it fades out in ~1/3 s instead of
            // drifting into the next one (fast scrolls used to leave fall leaves falling on the snow).
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
          el.classList.remove("is-anim");
        };
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="seasons" id="seasons" aria-label="Mulch through the year">
      <div className="seasons-sticky">
        {SEASONS.map((s, i) => (
          <article key={s.name} className="season" style={{ "--sbg": s.bg, "--sink": s.ink } as React.CSSProperties}>
            <div className="season-text">
              <p className="eyebrow">Mulch through the year · {i + 1}/4</p>
              <h2 className="season-name">
                <em>{s.name}</em>
              </h2>
              <p className="season-mood">{s.mood}</p>
              <p className="season-line">{s.line}</p>
            </div>
            <figure className="season-photo">
              <div className="season-frame">
                <img src={s.img} alt={s.alt} loading="lazy" />
              </div>
              <figcaption>{s.cap}</figcaption>
            </figure>
          </article>
        ))}
        <canvas className="seasons-canvas" aria-hidden="true" />
        <div className="season-index" aria-hidden="true">
          <div className="season-track">
            <i className="season-bar" />
          </div>
          {SEASONS.map((s, i) => (
            <span key={s.name} className={i === 0 ? "on" : ""}>
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
