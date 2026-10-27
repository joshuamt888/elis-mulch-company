"use client";
import { useRef } from "react";
import { gsap, useGSAP, SplitText, MOTION } from "@/components/garden/gsap";

export default function Intro() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const split = SplitText.create(root.current!.querySelector("h2"), { type: "lines", mask: "lines" });
        gsap.from(split.lines, { yPercent: 105, duration: 1.2, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: root.current, start: "top 70%", once: true } });
        gsap.from(".intro-body > *", { y: 30, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: ".intro-body", start: "top 85%", once: true } });
        return () => split.revert();
      });
    },
    { scope: root }
  );
  return (
    <section ref={root} className="intro">
      <h2>
        A fresh layer makes the whole yard look <em>finished.</em>
      </h2>
      <div className="intro-body">
        <p>
          We visit your property, quote it in person, and our crew installs fresh mulch on schedule: even coverage, clean edges, zero mess. You never lift a finger. Scroll on and
          walk through the mulch year.
        </p>
        <a className="text-link" href="/estimate">
          Price your mulch
        </a>
      </div>
    </section>
  );
}
