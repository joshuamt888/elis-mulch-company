"use client";

import { useEffect, useRef, useState } from "react";

const CLIENTHUB_ID = "ba85d565-2eb6-413d-b8ee-fcaefbe58a8d";
const FORM_ID = "4657235";
const MOUNT_ID = `${CLIENTHUB_ID}-${FORM_ID}`;

// ─── Yard Calculator ──────────────────────────────────────────────────────────
interface Bed {
  length: string;
  width: string;
}

const depthOptions = [
  { label: "2 inches — standard top-up", value: 2 },
  { label: "4 inches — heavy coverage", value: 4 },
];

const selectArrow = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%231e293b' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat" as const,
  backgroundPosition: "right 16px center",
};

function YardCalculator() {
  const [beds, setBeds] = useState<Bed[]>([{ length: "", width: "" }]);
  const [depth, setDepth] = useState(2);
  const [result, setResult] = useState<{ sqft: number; yards: number } | null>(null);

  const updateBed = (index: number, field: keyof Bed, value: string) => {
    setBeds((prev) => prev.map((b, i) => (i === index ? { ...b, [field]: value } : b)));
    setResult(null);
  };

  const addBed = () => setBeds((prev) => [...prev, { length: "", width: "" }]);
  const removeBed = (index: number) => setBeds((prev) => prev.filter((_, i) => i !== index));

  const calculate = () => {
    const totalSqft = beds.reduce((sum, bed) => {
      const l = parseFloat(bed.length);
      const w = parseFloat(bed.width);
      return l > 0 && w > 0 ? sum + l * w : sum;
    }, 0);
    if (totalSqft <= 0) return;
    const yards = Math.ceil((totalSqft * (depth / 12)) / 27);
    setResult({ sqft: Math.round(totalSqft), yards });
  };

  return (
    <div className="bg-[#faf7f2] border border-sand/10 rounded-xl p-5 space-y-4 mb-8">
      <div>
        <h3 className="text-sand font-semibold text-sm mb-0.5">Square Footage Calculator</h3>
        <p className="text-bark text-xs">Enter each bed&apos;s dimensions to estimate cubic yards.</p>
      </div>

      {beds.map((bed, i) => (
        <div key={i} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sand text-xs font-semibold">Bed #{i + 1}</span>
            {beds.length > 1 && (
              <button onClick={() => removeBed(i)} className="text-red-400 hover:text-red-600 text-xs transition-colors">
                Remove
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-bark text-xs mb-1">Length (ft)</label>
              <input
                type="number" inputMode="decimal" placeholder="e.g. 20"
                value={bed.length}
                onChange={(e) => updateBed(i, "length", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-sand/15 bg-white text-sand focus:border-blossom focus:ring-2 focus:ring-blossom/20 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-bark text-xs mb-1">Width (ft)</label>
              <input
                type="number" inputMode="decimal" placeholder="e.g. 10"
                value={bed.width}
                onChange={(e) => updateBed(i, "width", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-sand/15 bg-white text-sand focus:border-blossom focus:ring-2 focus:ring-blossom/20 transition-all text-sm"
              />
            </div>
          </div>
        </div>
      ))}

      <button onClick={addBed} className="w-full border border-dashed border-sand/30 hover:border-blossom/50 text-bark hover:text-blossom text-sm py-2 rounded-lg transition-colors">
        + Add another bed
      </button>

      <div>
        <label className="block text-sand text-xs font-semibold mb-1">Depth</label>
        <select
          value={depth}
          onChange={(e) => setDepth(Number(e.target.value))}
          className="w-full px-3 py-2.5 rounded-lg border border-sand/15 bg-white text-sand focus:border-blossom focus:ring-2 focus:ring-blossom/20 transition-all appearance-none text-sm"
          style={{ ...selectArrow, backgroundPosition: "right 12px center" }}
        >
          {depthOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <button onClick={calculate} className="w-full bg-blossom/10 hover:bg-blossom/20 text-bark font-semibold py-2.5 rounded-lg transition-colors text-sm">
        Calculate
      </button>

      {result !== null && (
        <div className="text-center bg-white rounded-lg p-4 border border-sand/10 space-y-1">
          <p className="text-bark text-xs">Total area: <strong className="text-sand">{result.sqft} sq ft</strong></p>
          <p className="text-blossom font-bold text-lg">≈ {result.yards} cubic yards</p>
          <p className="text-bark-light text-xs">Enter this in the form below</p>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PriceItOutForm({ onBack }: { onBack: () => void }) {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    if (!document.querySelector('link[href*="work_request_embed.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css";
      link.media = "screen";
      document.head.appendChild(link);
    }

    if (!document.querySelector(`script[clienthub_id="${MOUNT_ID}"]`)) {
      const script = document.createElement("script");
      script.src = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";
      script.setAttribute("clienthub_id", MOUNT_ID);
      script.setAttribute("form_url", `https://clienthub.getjobber.com/client_hubs/${CLIENTHUB_ID}/public/work_request/embedded_work_request_form?form_id=${FORM_ID}`);
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-sand/10 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-bark-light hover:text-sand transition-colors" aria-label="Go back">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-outfit font-bold text-sand">Price It Out Yourself!</h2>
      </div>
      <p className="text-bark text-sm mb-6">
        Use the calculator to figure out your yards, then fill out the form below.
      </p>

      <YardCalculator />

      <div id={MOUNT_ID} />
    </div>
  );
}
