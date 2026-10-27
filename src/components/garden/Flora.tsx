import { gsap } from "@/components/garden/gsap";
import { leafPath, type Bloom, type Plant } from "@/components/garden/growth";

function BloomG({ b }: { b: Bloom }) {
  const r = b.r;
  if (b.kind === 1) {
    return (
      <g transform={`translate(${b.x} ${b.y}) rotate(${(b.a % 40) - 20})`}><g className="fl" data-t={b.t}>
        {[-28, 28, 0].map((a) => (
          <ellipse key={a} cx={0} cy={-r * 0.55} rx={r * 0.4} ry={r * 0.7} fill={b.c} stroke={b.k} strokeOpacity={0.25} transform={`rotate(${a})`} />
        ))}
      </g></g>
    );
  }
  if (b.kind === 2) {
    const pts = Array.from({ length: 7 }, (_, i) => (i === 0 ? [0, 0] : [Math.cos(i) * r * 0.62, Math.sin(i) * r * 0.62]));
    return (
      <g transform={`translate(${b.x} ${b.y})`}><g className="fl" data-t={b.t}>
        {pts.map(([x, y], i) => (
          <circle key={i} cx={Math.round(x * 10) / 10} cy={Math.round(y * 10) / 10} r={r * 0.42} fill={b.c} stroke={b.k} strokeOpacity={0.35} strokeWidth={0.8} />
        ))}
      </g></g>
    );
  }
  return (
    <g transform={`translate(${b.x} ${b.y}) rotate(${b.a})`}><g className="fl" data-t={b.t}>
      {Array.from({ length: b.n }, (_, i) => (
        <ellipse key={i} cx={r * 0.55} cy={0} rx={r * 0.55} ry={r * 0.24} fill={b.c} stroke="#1c1c1c" strokeOpacity={0.08} transform={`rotate(${Math.round((i * 360) / b.n)})`} />
      ))}
      <circle r={r * 0.3} fill={b.k} />
    </g></g>
  );
}

export function PlantG({ p, x, y, s = 1, className }: { p: Plant; x: number; y: number; s?: number; className?: string }) {
  return (
    <g className={className} transform={`translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ""}`}>
      <g className="sw">
        {p.stems.map((st, i) => (
          <path key={i} className="st" d={st.d} fill="none" stroke={st.c} strokeWidth={st.w} strokeLinecap="round" data-t={st.t} data-dur={st.dur} />
        ))}
        {p.leaves.map((l, i) => (
          <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.a})`}>
            <path className="lf" d={leafPath(l.s)} fill={l.c} data-t={l.t} />
          </g>
        ))}
        {p.blooms.map((b, i) => (
          <BloomG key={i} b={b} />
        ))}
      </g>
    </g>
  );
}

/** Builds a timeline that draws stems, pops leaves and opens blooms, timed from the data-t attributes. */
export function growPlant(root: Element, speed = 1) {
  const tl = gsap.timeline();
  root.querySelectorAll<SVGPathElement>(".st").forEach((el) => {
    const L = el.getTotalLength() + 1;
    gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
    tl.set(el, { opacity: 1 }, Number(el.dataset.t) / speed);
    tl.to(el, { strokeDashoffset: 0, duration: Number(el.dataset.dur) / speed, ease: "sine.out" }, Number(el.dataset.t) / speed);
  });
  root.querySelectorAll<SVGElement>(".lf").forEach((el) => {
    gsap.set(el, { scale: 0, transformOrigin: "0% 50%" });
    tl.to(el, { scale: 1, duration: 0.55, ease: "back.out(2.2)" }, Number(el.dataset.t) / speed);
  });
  root.querySelectorAll<SVGElement>(".fl").forEach((el) => {
    gsap.set(el, { scale: 0, rotation: -70, transformOrigin: "50% 50%" });
    tl.to(el, { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.8)" }, Number(el.dataset.t) / speed);
  });
  return tl;
}
