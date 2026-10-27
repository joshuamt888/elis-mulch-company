"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION } from "@/components/garden/gsap";

type Svc = { t: string; d: string; big?: boolean; mobile?: boolean; href?: string; cta?: string };
const SERVICES: Svc[] = [
  { t: "Mulch Installation", big: true, href: "/services/mulch-installation", cta: "About installation", d: "A crew that spreads fresh mulch evenly, cuts clean edges and leaves no mess. We visit first, so the quote is accurate." },
  { t: "Free In-Person Quote", big: true, href: "/estimate", cta: "Price mulch", d: "We visit your property and assess it in person, so the price is right. No guesswork." },
  { t: "Black Mulch", big: true, d: "A deep, dark finish that makes green plants and stone edging stand out." },
  { t: "Red Mulch", big: true, d: "A bold red-brown that brightens beds and walkways." },
  { t: "Hardwood Mulch", mobile: true, d: "One of the mulch types we install. Your quote includes a recommendation for your landscape." },
  { t: "Cedar Mulch", mobile: true, d: "A warm, golden-brown mulch with a natural cedar look." },
  { t: "Brown Mulch", d: "A rich brown that blends naturally with the soil around it." },
  { t: "Playground Mulch", mobile: true, d: "Wood chips for play areas, installed to cover the whole space evenly." },
  { t: "Mulch Calculator", mobile: true, href: "/tools/mulch-calculator", cta: "Open the calculator", d: "Work out how much mulch you need, free." },
  { t: "Sod Calculator", href: "/tools/sod-calculator", cta: "Open the calculator", d: "Work out how much sod you need, free." },
  { t: "Rock Calculator", href: "/tools/rock-calculator", cta: "Open the calculator", d: "Work out how much rock or stone you need, free." },
  { t: "Fully Insured", d: "Your property is protected while the crew works." },
  { t: "Locally Owned", mobile: true, d: "Based in Chanhassen, serving the western Twin Cities metro." },
];

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const [sel, setSel] = useState<number | null>(null);
  const kick = useRef<(i: number) => void>(() => {});
  const dragged = useRef(false);

  useGSAP(
    () => {
      const el = root.current!;
      const box = el.querySelector<HTMLElement>(".phys-box")!;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        let dead = false;
        let cleanup = () => {};
        import("matter-js").then((M) => {
          if (dead) return;
          const { Engine, Bodies, Composite, Body, Mouse, MouseConstraint } = M;
          box.classList.add("is-phys");
          const small = box.clientWidth < 640;
          const pills = Array.from(box.querySelectorAll<HTMLElement>(".pill")).filter((p, i) => !small || SERVICES[i].big || SERVICES[i].mobile);
          box.querySelectorAll<HTMLElement>(".pill").forEach((p) => {
            if (!pills.includes(p)) p.style.display = "none";
          });
          const W = box.clientWidth;
          const H = box.clientHeight;
          const engine = Engine.create({ gravity: { x: 0, y: 1.1 } });
          const T = 200;
          Composite.add(engine.world, [
            Bodies.rectangle(W / 2, H + T / 2, W + 2 * T, T, { isStatic: true }),
            Bodies.rectangle(-T / 2, H / 2 - 400, T, H * 2 + 800, { isStatic: true }),
            Bodies.rectangle(W + T / 2, H / 2 - 400, T, H * 2 + 800, { isStatic: true }),
            Bodies.rectangle(W / 2, -1200, W + 2 * T, T, { isStatic: true }),
          ]);
          const items = pills.map((p) => {
            const w = p.offsetWidth;
            const h = p.offsetHeight;
            const body = Bodies.rectangle(W / 2, -200, w, h, { chamfer: { radius: h / 2 - 1 }, restitution: 0.38, friction: 0.25, frictionAir: 0.012, density: 0.0018 });
            return { p, w, h, body, idx: Number(p.dataset.i) };
          });
          items.forEach((it) => gsap.set(it.p, { opacity: 0 }));

          const render = () => {
            for (const it of items) {
              const { x, y } = it.body.position;
              it.p.style.transform = `translate(${(x - it.w / 2).toFixed(1)}px, ${(y - it.h / 2).toFixed(1)}px) rotate(${it.body.angle.toFixed(3)}rad)`;
            }
          };
          const tick = (_t: number, dt: number) => {
            Engine.update(engine, Math.min(33, dt));
            render();
          };

          // Drop them in once, when the box is on screen.
          let dropped = false;
          let running = false;
          const drop = () => {
            dropped = true;
            items.forEach((it, i) => {
              gsap.delayedCall(i * 0.09, () => {
                Body.setPosition(it.body, { x: it.w / 2 + 10 + Math.random() * Math.max(1, W - it.w - 20), y: -it.h - 20 - Math.random() * 60 });
                Body.setAngle(it.body, (Math.random() - 0.5) * 0.8);
                Composite.add(engine.world, it.body);
                gsap.set(it.p, { opacity: 1 });
              });
            });
          };
          const io = new IntersectionObserver(
            ([e]) => {
              if (e.isIntersecting && !dropped) drop();
              if (e.isIntersecting && !running) gsap.ticker.add(tick);
              if (!e.isIntersecting && running) gsap.ticker.remove(tick);
              running = e.isIntersecting;
            },
            { threshold: 0.25 }
          );
          io.observe(box);

          kick.current = (i: number) => {
            const it = items.find((x) => x.idx === i);
            if (!it) return;
            Body.setVelocity(it.body, { x: (Math.random() - 0.5) * 10, y: -12 - Math.random() * 6 });
            Body.setAngularVelocity(it.body, (Math.random() - 0.5) * 0.3);
          };

          // Grab and toss, mouse and pen only; touch keeps scrolling the page.
          let mc: InstanceType<typeof MouseConstraint> | null = null;
          const offWin: (() => void)[] = [];
          if (window.matchMedia("(pointer: fine)").matches) {
            const mouse = Mouse.create(box);
            const m = mouse as unknown as Record<string, EventListener>;
            box.removeEventListener("wheel", m.mousewheel);
            box.removeEventListener("mousewheel", m.mousewheel);
            box.removeEventListener("DOMMouseScroll", m.mousewheel);
            window.addEventListener("mouseup", m.mouseup);
            offWin.push(() => window.removeEventListener("mouseup", m.mouseup));
            mc = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, damping: 0.1, render: { visible: false } } });
            Composite.add(engine.world, mc);
          }
          let down = { x: 0, y: 0 };
          const onDown = (e: PointerEvent) => {
            down = { x: e.clientX, y: e.clientY };
            dragged.current = false;
          };
          const onMove = (e: PointerEvent) => {
            if (e.buttons && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) dragged.current = true;
          };
          box.addEventListener("pointerdown", onDown);
          box.addEventListener("pointermove", onMove);

          cleanup = () => {
            io.disconnect();
            gsap.ticker.remove(tick);
            box.removeEventListener("pointerdown", onDown);
            box.removeEventListener("pointermove", onMove);
            offWin.forEach((f) => f());
            if (mc) Composite.remove(engine.world, mc);
            Engine.clear(engine);
            box.classList.remove("is-phys");
            box.querySelectorAll<HTMLElement>(".pill").forEach((p) => {
              p.style.cssText = "";
            });
            kick.current = () => {};
          };
        });
        return () => {
          dead = true;
          cleanup();
        };
      });
    },
    { scope: root }
  );

  const onPill = (i: number) => {
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    setSel(i);
    kick.current(i);
  };

  const s = sel === null ? null : SERVICES[sel];
  return (
    <section ref={root} className="services" id="services">
      <div className="services-copy">
        <p className="eyebrow">Services</p>
        <h2>
          Pick your <em>mulch</em>.
        </h2>
        <p className="services-sub">
          <span className="fine-only">Grab a label and toss it. Click one to read it.</span>
          <span className="touch-only">Tap a label to kick it and read it.</span>
        </p>
        <div className="service-card" aria-live="polite">
          {s ? (
            <>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              {s.href && <a className="text-link" href={s.href}>{s.cta}</a>}
            </>
          ) : (
            <>
              <h3>What we do</h3>
              <p>Professional mulch installation in cedar, hardwood, black and more, with free in-person quotes and free calculators.</p>
              <a className="text-link" href="/estimate">Price mulch</a>
            </>
          )}
        </div>
      </div>
      <div className="phys-box">
        {SERVICES.map((sv, i) => (
          <button key={sv.t} data-i={i} className={`pill${sv.big ? " big" : ""}${sel === i ? " sel" : ""}`} onClick={() => onPill(i)} type="button">
            {sv.t}
          </button>
        ))}
      </div>
    </section>
  );
}
