"use client";
import { useEffect, useRef, useState } from "react";

export type ExpectRow = { label: string; from: number; to: number; of?: number; note?: string };
export type ExpectProps = {
  id?: string;
  title: string;
  sub: string;
  rows: ExpectRow[];
  ring?: { label: string; from: number; to: number; of: number };
  chart: { title: string; start: number; end: number; unit: string; caption: string };
  foot: string;
  accent: string;
  ink?: string;
  muted?: string;
  card?: string;
  line?: string;
};

function useInView() {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  const [js, setJs] = useState(false);
  useEffect(() => {
    setJs(true);
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, on, js };
}

function Count({ to, on, js }: { to: number; on: boolean; js: boolean }) {
  const [v, setV] = useState(to);
  useEffect(() => {
    if (!js) return;
    if (!on) { setV(0); return; }
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1500);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, js, to]);
  return <>{v.toLocaleString()}</>;
}

/** "What to expect": measured before and after, a comparable build's result, and a table. Everything animates in once, when scrolled to. */
export function Expect(p: ExpectProps) {
  const { ref, on, js } = useInView();
  const ink = p.ink ?? "#1c1c1c", muted = p.muted ?? "#5d5b56", card = p.card ?? "#ffffff", line = p.line ?? "rgba(28,28,28,0.12)";
  const R = 70, C = 2 * Math.PI * R, R2 = 50, C2 = 2 * Math.PI * R2;
  const x0 = 70, y0 = 250, x1 = 530, y1 = 58;
  const len = Math.hypot(x1 - x0, y1 - y0);
  return (
    <section ref={ref} id={p.id ?? "expect"} className={`ex${js ? " ex-js" : ""}${on ? " ex-in" : ""}`} style={{ ["--a" as string]: p.accent, ["--ink" as string]: ink, ["--mu" as string]: muted, ["--card" as string]: card, ["--ln" as string]: line }}>
      <style>{`
.ex{max-width:1240px;margin:0 auto;padding:clamp(72px,9vw,130px) clamp(16px,5vw,64px);color:var(--ink);font-family:inherit}
.ex h2{font-size:clamp(2.4rem,5.4vw,4.8rem);line-height:1;letter-spacing:-.035em;font-weight:600;text-align:center}
.ex .ex-sub{max-width:52ch;margin:18px auto 0;text-align:center;font-size:clamp(1.1rem,1.6vw,1.4rem);line-height:1.5;color:var(--mu)}
.ex .ex-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:20px;margin-top:clamp(36px,5vw,64px)}
.ex .ex-card{background:var(--card);border:1px solid var(--ln);border-radius:28px;padding:clamp(22px,3vw,36px);box-shadow:0 18px 40px -28px rgba(0,0,0,.28)}
.ex .ex-card h3{font-size:1.15rem;letter-spacing:.01em;font-weight:600;margin-bottom:22px}
.ex .ex-row{margin-top:20px;text-align:left}
.ex .ex-row:first-of-type{margin-top:0}
.ex .ex-lab{display:flex;justify-content:space-between;gap:12px;font-size:1.02rem;font-weight:600;text-align:left}
.ex .ex-nums{font-variant-numeric:tabular-nums;color:var(--mu);font-weight:500;white-space:nowrap}
.ex .ex-nums b{color:var(--a);font-weight:700}
.ex .ex-track{height:12px;border-radius:99px;background:rgba(127,127,127,.14);margin-top:9px;overflow:hidden;position:relative}
.ex .ex-track + .ex-track{margin-top:6px}
.ex .ex-bar{position:absolute;inset:0 auto 0 0;border-radius:99px;width:var(--w);transition:width 1.5s cubic-bezier(.2,.8,.2,1)}
.ex .ex-then{background:rgba(127,127,127,.5)}
.ex .ex-now{background:var(--a)}
.ex.ex-js:not(.ex-in) .ex-bar{width:0}
.ex .ex-leg{display:flex;gap:18px;margin-top:22px;font-size:.92rem;color:var(--mu)}
.ex .ex-leg i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:7px;vertical-align:baseline}
.ex svg{width:100%;height:auto;display:block;overflow:visible}
.ex .ex-axis{stroke:var(--ln);stroke-width:1.5}
.ex .ex-tick{fill:var(--mu);font-size:20px}
.ex .ex-path{fill:none;stroke:var(--a);stroke-width:5;stroke-linecap:round;stroke-dasharray:var(--len);stroke-dashoffset:0;transition:stroke-dashoffset 1.8s cubic-bezier(.3,.7,.2,1) .2s}
.ex.ex-js:not(.ex-in) .ex-path{stroke-dashoffset:var(--len)}
.ex .ex-area{fill:var(--a);opacity:.1;transition:opacity 1s 1.2s}
.ex.ex-js:not(.ex-in) .ex-area{opacity:0}
.ex .ex-dot{fill:var(--card);stroke:var(--a);stroke-width:4;transition:opacity .4s}
.ex .ex-dot2{opacity:1;transition:opacity .4s 1.8s}
.ex.ex-js:not(.ex-in) .ex-dot2,.ex.ex-js:not(.ex-in) .ex-val2{opacity:0}
.ex .ex-val{font-size:30px;font-weight:700;fill:var(--ink);font-variant-numeric:tabular-nums}
.ex .ex-val2{transition:opacity .4s 1.8s}
.ex .ex-cap{margin-top:14px;font-size:.98rem;line-height:1.5;color:var(--mu)}
.ex .ex-ring-wrap{display:flex;align-items:center;gap:22px;margin-top:26px;padding-top:24px;border-top:1px solid var(--ln)}
.ex .ex-ring{width:150px;flex:none}
.ex .ex-ring circle{fill:none;stroke-width:14;transform:rotate(-90deg);transform-origin:50% 50%}
.ex .ex-ring .t{stroke:rgba(127,127,127,.16)}
.ex .ex-ring .b{stroke:rgba(127,127,127,.5);transition:stroke-dashoffset 1.5s cubic-bezier(.2,.8,.2,1)}
.ex .ex-ring .n{stroke:var(--a);stroke-linecap:round;transition:stroke-dashoffset 1.7s cubic-bezier(.2,.8,.2,1) .15s}
.ex .ex-ring-txt{font-size:1rem;line-height:1.45;color:var(--mu)}
.ex .ex-ring-txt b{display:block;font-size:2.2rem;color:var(--ink);letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.ex table{width:100%;border-collapse:collapse;margin-top:clamp(28px,4vw,48px);font-size:1.05rem;background:var(--card);border-radius:22px;overflow:hidden;border:1px solid var(--ln)}
.ex th,.ex td{text-align:left;padding:15px 22px;border-bottom:1px solid var(--ln)}
.ex th{font-size:.82rem;letter-spacing:.14em;text-transform:uppercase;color:var(--mu);font-weight:600}
.ex td:nth-child(n+2),.ex th:nth-child(n+2){text-align:right;font-variant-numeric:tabular-nums}
.ex td:last-child{color:var(--a);font-weight:700}
.ex tr:last-child td{border-bottom:0}
.ex .ex-foot{margin:18px auto 0;max-width:70ch;text-align:center;font-size:.92rem;line-height:1.55;color:var(--mu)}
@media(max-width:900px){.ex .ex-grid{grid-template-columns:1fr}.ex .ex-ring-wrap{flex-direction:column;align-items:flex-start}}
      `}</style>
      <h2>{p.title}</h2>
      <p className="ex-sub">{p.sub}</p>
      <div className="ex-grid">
        <div className="ex-card">
          <h3>Today vs the new site</h3>
          {p.rows.map((r) => {
            const m = Math.max(r.from, r.to) || 1;
            return (
              <div className="ex-row" key={r.label}>
                <div className="ex-lab"><span>{r.label}</span><span className="ex-nums">{r.from.toLocaleString()} &rarr; <b><Count to={r.to} on={on} js={js} /></b>{r.of ? ` of ${r.of}` : ""}</span></div>
                <div className="ex-track"><div className="ex-bar ex-then" style={{ ["--w" as string]: `${(r.from / m) * 100}%` }} /></div>
                <div className="ex-track"><div className="ex-bar ex-now" style={{ ["--w" as string]: `${(r.to / m) * 100}%` }} /></div>
              </div>
            );
          })}
          <div className="ex-leg"><span><i style={{ background: "rgba(127,127,127,.5)" }} />Today</span><span><i style={{ background: "var(--a)" }} />New site</span></div>
          {p.ring && (
            <div className="ex-ring-wrap">
              <svg className="ex-ring" viewBox="0 0 180 180" aria-hidden>
                <circle className="t" cx="90" cy="90" r={R} />
                <circle className="t" cx="90" cy="90" r={R2} />
                <circle className="b" cx="90" cy="90" r={R2} strokeDasharray={C2} style={{ strokeDashoffset: js && !on ? C2 : C2 * (1 - p.ring.from / p.ring.of) }} />
                <circle className="n" cx="90" cy="90" r={R} strokeDasharray={C} style={{ strokeDashoffset: js && !on ? C : C * (1 - p.ring.to / p.ring.of) }} />
              </svg>
              <div className="ex-ring-txt"><b><Count to={p.ring.to} on={on} js={js} /> of {p.ring.of}</b>{p.ring.label}</div>
            </div>
          )}
        </div>
        <div className="ex-card">
          <h3>{p.chart.title}</h3>
          <svg viewBox="0 0 600 310" role="img" aria-label={`${p.chart.title}: ${p.chart.start} to ${p.chart.end} ${p.chart.unit}`}>
            <line className="ex-axis" x1="40" y1="270" x2="570" y2="270" />
            <line className="ex-axis" x1="40" y1="30" x2="40" y2="270" />
            <path className="ex-area" d={`M${x0} ${y0} L${x1} ${y1} L${x1} 270 L${x0} 270 Z`} />
            <path className="ex-path" d={`M${x0} ${y0} L${x1} ${y1}`} style={{ ["--len" as string]: len }} />
            <circle className="ex-dot" cx={x0} cy={y0} r="9" />
            <circle className="ex-dot ex-dot2" cx={x1} cy={y1} r="11" />
            <text className="ex-val" x={x0 + 4} y={y0 - 22}>{p.chart.start}</text>
            <text className="ex-val ex-val2" x={x1 - 8} y={y1 - 20} textAnchor="end"><Count to={p.chart.end} on={on} js={js} /></text>
            <text className="ex-tick" x={x0} y="298" textAnchor="middle">Start</text>
            <text className="ex-tick" x={x1} y="298" textAnchor="middle">3 months</text>
          </svg>
          <p className="ex-cap">{p.chart.caption}</p>
        </div>
      </div>
      <table>
        <thead><tr><th>What changes</th><th>Today</th><th>New site</th></tr></thead>
        <tbody>
          {p.rows.map((r) => (<tr key={r.label}><td>{r.label}</td><td>{r.from.toLocaleString()}{r.of ? ` of ${r.of}` : ""}</td><td>{r.to.toLocaleString()}{r.of ? ` of ${r.of}` : ""}</td></tr>))}
        </tbody>
      </table>
      <p className="ex-foot">{p.foot}</p>
    </section>
  );
}
