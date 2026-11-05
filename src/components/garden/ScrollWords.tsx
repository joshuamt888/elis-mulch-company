"use client";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/components/garden/gsap";

/** Pinned statement: words fade up from faint to full as you scroll. Words wrapped in *stars* use the accent color. */
export default function ScrollWords({ text }: { text: string }) {
  const outer = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = outer.current!;
    const spans = Array.from(el.querySelectorAll<HTMLElement>(".sw-w"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => { s.style.opacity = "1"; s.style.transform = "none"; });
      return;
    }
    const st = ScrollTrigger.create({
      trigger: el, start: "top top", end: "bottom bottom",
      onUpdate: (s) => {
        const p = Math.min(1, s.progress / 0.85) * spans.length;
        spans.forEach((w, i) => { const v = Math.max(0, Math.min(1, p - i)); w.style.opacity = String(v); w.style.transform = `rotateX(${(1 - v) * -90}deg)`; });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section ref={outer} className="sw">
      <div className="sw-sticky">
        <p className="sw-p">
          {words.map((w, i) => {
            const em = w.startsWith("*");
            return <span key={i} className={`sw-w${em ? " em" : ""}`} style={{ opacity: 0, transform: "rotateX(-90deg)" }}>{w.replace(/\*/g, "")} </span>;
          })}
        </p>
      </div>
    </section>
  );
}
