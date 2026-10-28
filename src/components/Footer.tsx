"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { reduced } from "@/components/garden/gsap";
import { makePlant, type Kind, type Plant } from "@/components/garden/growth";
import { PlantG, growPlant } from "@/components/garden/Flora";
import Image from "next/image";
import Link from "next/link";

type Planted = { id: number; x: number; y: number; p: Plant; s: number };
let nextId = 1;
const MAX = 60;
const lift = () => (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches ? 64 : 0); // the phone call bar covers the bottom edge

function Grow({ f }: { f: Planted }) {
  const ref = useRef<SVGGElement>(null);
  useLayoutEffect(() => {
    if (reduced() || !ref.current) return;
    const tl = growPlant(ref.current, 1.6);
    return () => {
      tl.kill();
    };
  }, []);
  return (
    <g ref={ref}>
      <ellipse cx={f.x} cy={f.y + 1} rx={16 * f.s} ry={4 * f.s} fill="#6b5640" opacity={0.18} />
      <g className="fsway" style={{ animationDelay: `${-(f.id % 7) * 0.6}s` }}>
        <PlantG p={f.p} x={f.x} y={f.y} s={f.s} />
      </g>
    </g>
  );
}

export default function Footer({ ctaTitle, ctaText, standalone = false }: { ctaTitle?: string; ctaText?: string; standalone?: boolean } = {}) {
  const root = useRef<HTMLElement>(null);
  const [plants, setPlants] = useState<Planted[]>([]);

  const plant = (x: number, y: number, auto = false) => {
    const seed = Math.floor(Math.random() * 1e6);
    const kind: Kind = Math.random() < 0.8 ? "flower" : "fern";
    // Everything goes in the soil strip under the text, sized to stay below it (wider screens get a little more height).
    const wide = (root.current?.clientWidth ?? 0) >= 700;
    const s = auto ? 0.7 + Math.random() * 0.2 : wide ? 0.8 + Math.random() * 0.25 : 0.7 + Math.random() * 0.2;
    const h = auto ? 120 + Math.random() * 50 : wide ? 140 + Math.random() * 60 : 120 + Math.random() * 50;
    // A click grows its flower right where you clicked; near the top it is shortened so it still fits.
    const hh = auto ? h : Math.max(50, Math.min(h, (y - 8) / s));
    setPlants((ps) => [...ps.slice(-(MAX - 1)), { id: nextId++, x, y, p: makePlant(seed, kind, hh), s }]);
  };

  // The garden grows itself: a full row sprouts as the footer comes into view, then a flower every so often while you are there.
  useEffect(() => {
    const el = root.current!;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let drip: ReturnType<typeof setInterval> | undefined;
    let started = false;
    const base = () => el.clientHeight - 22 - lift();
    const sow = () => {
      const w = el.clientWidth;
      const n = w < 700 ? 8 : 16;
      for (let i = 0; i < n; i++) {
        const fx = (i + 0.5) / n + (Math.random() - 0.5) * (0.6 / n);
        timers.push(setTimeout(() => plant(fx * w, base() - Math.random() * 10, true), reduced() ? 0 : i * 170));
      }
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          started = true;
          sow();
        }
        if (e.isIntersecting && !drip && !reduced()) {
          // keep a few more coming, in random spots, until the bed is nicely full
          drip = setInterval(() => setPlants((ps) => { if (ps.length < 26) plant(Math.random() * el.clientWidth, base() - Math.random() * 12, true); return ps; }), 1800);
        }
        if (!e.isIntersecting && drip) {
          clearInterval(drip);
          drip = undefined;
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 220px 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      if (drip) clearInterval(drip);
    };
  }, []);

  const onClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    const el = root.current!;
    const r = el.getBoundingClientRect();
    plant(e.clientX - r.left, e.clientY - r.top);
  };

  return (
    <div className="gd">
      <footer ref={root} className="foot" id="contact" onClick={onClick}>
        <svg className="foot-bed" aria-hidden="true">
          {plants.map((f) => (
            <Grow key={f.id} f={f} />
          ))}
        </svg>
        <div className="foot-inner">
          {!standalone && <p className="eyebrow">Ready when you are</p>}
          {ctaTitle ? <h2 className="long">{ctaTitle}</h2> : (
            <h2>
              A hassle-free <em>yard</em>.
            </h2>
          )}
          <p className="foot-lede">{ctaText ?? "Schedule your free in-person quote today."}</p>
          {!standalone && (
            <>
          <div className="btns">
            <Link className="btn btn-accent" href="/estimate">
              Price mulch
            </Link>
            <a className="btn btn-ghost" href="tel:9523144797">
              Call (952) 314-4797
            </a>
          </div>
          <div className="foot-grid">
            <div>
              <strong>Where</strong>
              Chanhassen, MN
              <br />
              serving the Twin Cities metro
            </div>
            <div>
              <strong>Talk</strong>
              <a href="tel:9523144797">(952) 314-4797</a>
              <br />
              <a href="mailto:info@mulchcompanymn.com">info@mulchcompanymn.com</a>
              <br />
              Licensed &amp; insured
            </div>
            <div>
              <strong>Look around</strong>
              <Link href="/services/mulch-installation">Mulch Installation</Link>
              <br />
              <Link href="/tools/mulch-calculator">Mulch Calculator</Link> · <Link href="/tools/sod-calculator">Sod</Link> · <Link href="/tools/rock-calculator">Rock</Link>
              <br />
              <Link href="/about">About</Link> · <Link href="/our-colors">Our colors</Link>
            </div>
          </div>
          <div className="foot-base">
            <Image src="/images/logos/logo-horizontal.png" alt="Mulch Company" width={160} height={51} className="foot-logo" />
            <p>
              &copy; 2026 Mulch Company. All rights reserved. <Link href="/terms">Terms</Link> · <Link href="/privacy">Privacy</Link> · <Link href="/sitemap-page">Sitemap</Link>
            </p>
            <p className="concept">
              Website &amp; SEO by{" "}
              <a href="https://www.steadyscaling.com" target="_blank" rel="noopener noreferrer">
                Steady Scaling
              </a>
            </p>
          </div>
            </>
          )}
        </div>
      </footer>
    </div>
  );
}
