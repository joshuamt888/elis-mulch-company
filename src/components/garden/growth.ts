// Procedural plants: seeded, deterministic (same markup on server and client).
// Coordinates are relative to the plant's base at (0,0); plants grow toward -y.

export function rng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Stem = { d: string; w: number; t: number; dur: number; c: string };
export type Leaf = { x: number; y: number; a: number; s: number; t: number; c: string };
export type Bloom = { x: number; y: number; a: number; r: number; n: number; c: string; k: string; t: number; kind: 0 | 1 | 2 };
export type Plant = { stems: Stem[]; leaves: Leaf[]; blooms: Bloom[]; end: number };
export type Kind = "flower" | "grass" | "fern";

const r1 = (n: number) => Math.round(n * 10) / 10;
const SPEED = 300; // units per second of stem drawing

const STEMS = ["#4f6b3a", "#5d7a45", "#465f35"];
const LEAVES = ["#6c8f4e", "#87a764", "#5b7d43", "#9db878", "#7a9a57"];
const PETALS: [string, string][] = [
  ["#f6b3cc", "#c94478"],
  ["#e0548a", "#7a1f45"],
  ["#fce9f1", "#e0548a"],
  ["#ffffff", "#f1c24b"],
  ["#fbf3e4", "#e0a93b"],
  ["#f2b8a9", "#c8674f"],
  ["#f3d27a", "#b9782b"],
  ["#e9876f", "#7d3a2a"],
  ["#b4532a", "#f7f5f2"],
  ["#ffffff", "#b4532a"],
];

type Opts = { accent?: boolean; petal?: [string, string]; bloom?: 0 | 1 | 2; stem?: string };

export function makePlant(seed: number, kind: Kind, height: number, { accent = true, petal: fixed, bloom, stem }: Opts = {}): Plant {
  const rand = rng(seed);
  const pick = <T,>(a: T[]) => a[Math.floor(rand() * a.length)];
  const stems: Stem[] = [];
  const leaves: Leaf[] = [];
  const blooms: Bloom[] = [];
  const stemC = stem ?? pick(STEMS);
  const petals = accent ? PETALS : PETALS.slice(0, 5);
  const picked = pick(petals);
  const petal = fixed ?? picked;
  const rolled = Math.floor(rand() * 3) as 0 | 1 | 2;
  const bloomKind = bloom ?? rolled;
  let end = 0;

  const branch = (x: number, y: number, ang: number, len: number, depth: number, t: number, maxDepth: number) => {
    const bend = (rand() - 0.5) * len * 0.45;
    const ex = x + Math.sin(ang) * len;
    const ey = y - Math.cos(ang) * len;
    const cx = (x + ex) / 2 + Math.cos(ang) * bend;
    const cy = (y + ey) / 2 + Math.sin(ang) * bend;
    const dur = len / SPEED;
    const w = kind === "grass" ? 2.4 : Math.max(1.2, 3.4 - depth * 0.9);
    stems.push({ d: `M${r1(x)} ${r1(y)}Q${r1(cx)} ${r1(cy)} ${r1(ex)} ${r1(ey)}`, w, t: r1(t * 100) / 100, dur: r1(dur * 100) / 100, c: kind === "grass" ? stem ?? pick(LEAVES) : stemC });
    end = Math.max(end, t + dur);
    if (kind === "grass") return;

    const at = (u: number) => {
      const px = (1 - u) ** 2 * x + 2 * (1 - u) * u * cx + u * u * ex;
      const py = (1 - u) ** 2 * y + 2 * (1 - u) * u * cy + u * u * ey;
      const tx = 2 * (1 - u) * (cx - x) + 2 * u * (ex - cx);
      const ty = 2 * (1 - u) * (cy - y) + 2 * u * (ey - cy);
      return { px, py, deg: (Math.atan2(ty, tx) * 180) / Math.PI };
    };

    // leaves
    const count = kind === "fern" ? 7 + Math.floor(rand() * 4) : 2 + Math.floor(rand() * 3);
    for (let i = 0; i < count; i++) {
      const u = kind === "fern" ? 0.15 + (i / count) * 0.8 : 0.2 + rand() * 0.7;
      const { px, py, deg } = at(u);
      const size = kind === "fern" ? len * (0.22 - u * 0.12) : len * (0.16 + rand() * 0.14);
      const sides = kind === "fern" ? [-1, 1] : [i % 2 ? 1 : -1];
      for (const side of sides) {
        leaves.push({ x: r1(px), y: r1(py), a: r1(deg + side * (kind === "fern" ? 55 : 35 + rand() * 30)), s: r1(Math.max(6, size)), t: r1((t + u * dur) * 100) / 100, c: pick(LEAVES) });
      }
    }

    // branches
    if (depth < maxDepth) {
      const n = kind === "fern" ? 0 : 1 + (rand() < 0.5 ? 1 : 0);
      for (let i = 0; i < n; i++) {
        const u = 0.45 + rand() * 0.3;
        const { px, py } = at(u);
        const side = i % 2 ? 1 : -1;
        branch(px, py, ang + side * (0.35 + rand() * 0.45), len * (0.5 + rand() * 0.2), depth + 1, t + u * dur, maxDepth);
      }
    }

    // bloom at tip
    if (kind === "flower" && (depth === maxDepth || rand() < 0.6)) {
      const bt = t + dur;
      blooms.push({ x: r1(ex), y: r1(ey), a: r1(rand() * 360), r: r1(Math.max(7, len * 0.14 + rand() * 6)), n: 5 + Math.floor(rand() * 4), c: petal[0], k: petal[1], t: r1(bt * 100) / 100, kind: bloomKind });
      end = Math.max(end, bt + 0.6);
    }
  };

  if (kind === "grass") {
    const blades = 4 + Math.floor(rand() * 4);
    for (let i = 0; i < blades; i++) {
      branch((rand() - 0.5) * 14, 0, (rand() - 0.5) * 0.8, height * (0.5 + rand() * 0.5), 0, rand() * 0.25, 0);
    }
  } else {
    const main = height * 0.62;
    branch(0, 0, (rand() - 0.5) * 0.3, main, 0, 0, kind === "fern" ? 0 : 2);
  }
  return { stems, leaves, blooms, end };
}

export const leafPath = (s: number) => {
  const a = r1(s * 0.3), b = r1(s * 0.34), c = r1(s * 0.75), d = r1(s * 0.28), e = r1(s);
  return `M0 0C${a} -${b} ${c} -${d} ${e} 0C${c} ${d} ${a} ${b} 0 0Z`;
};
