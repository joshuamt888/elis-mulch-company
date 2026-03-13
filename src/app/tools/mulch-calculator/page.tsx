"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const depthOptions = [
  { label: "1 inch — light refresh", value: 1 },
  { label: "2 inches — standard top-up", value: 2 },
  { label: "3 inches — full coverage (most popular)", value: 3 },
  { label: "4 inches — heavy coverage", value: 4 },
  { label: "6 inches — deep beds / weed barrier", value: 6 },
];

export default function MulchCalculator() {
  const [sqft, setSqft] = useState("");
  const [depth, setDepth] = useState(3);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const area = parseFloat(sqft);
    if (!area || area <= 0) return;
    const depthInFeet = depth / 12;
    const cubicYards = (area * depthInFeet) / 27;
    setResult(Math.ceil(cubicYards * 10) / 10);
  };

  const reset = () => {
    setSqft("");
    setDepth(3);
    setResult(null);
  };

  return (
    <>
      <Header />
      <main className="bg-[#faf7f2] min-h-screen pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blossom/10 rounded-2xl mb-4">
              <svg className="w-8 h-8 text-bark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-outfit font-bold text-sand mb-3">
              Mulch Calculator
            </h1>
            <p className="text-bark text-lg max-w-md mx-auto">
              Find out exactly how much mulch you need — no guesswork, no wasted trips.
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-sand/10 p-6 sm:p-8 mb-10">
            <div className="space-y-6">
              {/* Square Footage */}
              <div>
                <label htmlFor="sqft" className="block text-sand font-semibold mb-1.5 text-sm">
                  How big is the area?
                </label>
                <p className="text-bark-light text-xs mb-2">
                  Multiply the length x width of your bed. Not sure? Walk it off — one big step is roughly 3 feet.
                </p>
                <div className="relative">
                  <input
                    id="sqft"
                    type="number"
                    inputMode="decimal"
                    placeholder="500"
                    value={sqft}
                    onChange={(e) => { setSqft(e.target.value); setResult(null); }}
                    className="w-full px-4 py-3.5 pr-16 rounded-xl border border-sand/15 bg-[#faf7f2] text-sand text-lg focus:border-blossom focus:ring-2 focus:ring-blossom/20 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-bark-light text-sm font-medium">sq ft</span>
                </div>
              </div>

              {/* Depth */}
              <div>
                <label htmlFor="depth" className="block text-sand font-semibold mb-1.5 text-sm">
                  How thick do you want it?
                </label>
                <p className="text-bark-light text-xs mb-2">
                  3 inches is the sweet spot for most flower beds and landscaping.
                </p>
                <select
                  id="depth"
                  value={depth}
                  onChange={(e) => { setDepth(Number(e.target.value)); setResult(null); }}
                  className="w-full px-4 py-3.5 rounded-xl border border-sand/15 bg-[#faf7f2] text-sand text-lg focus:border-blossom focus:ring-2 focus:ring-blossom/20 transition-all appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%231e293b' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                >
                  {depthOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculate}
                className="w-full bg-blossom hover:bg-blossom-dark text-white font-bold py-4 rounded-xl transition-colors text-lg shadow-sm"
              >
                Calculate My Mulch
              </button>
            </div>

            {/* Result */}
            {result !== null && (
              <div className="mt-8 bg-gradient-to-br from-blossom to-blossom-dark rounded-2xl p-6 sm:p-8 text-center text-white">
                <p className="text-white/70 text-sm mb-1">You need</p>
                <p className="text-5xl sm:text-6xl font-outfit font-bold mb-1">{result}</p>
                <p className="text-xl font-semibold mb-4">cubic yards of mulch</p>
                <div className="bg-white/15 rounded-lg px-4 py-2.5 inline-block">
                  <p className="text-white/80 text-sm">
                    {parseFloat(sqft).toLocaleString()} sq ft &times; {depth}&quot; deep
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/20">
                  <p className="text-white/70 text-sm mb-3">Want us to handle the rest?</p>
                  <Link
                    href="/estimate"
                    className="inline-block bg-white text-bark hover:bg-soil font-bold px-8 py-3 rounded-xl transition-colors"
                  >
                    Price Mulch
                  </Link>
                </div>
              </div>
            )}

            {result !== null && (
              <button
                onClick={reset}
                className="w-full mt-4 text-bark-light hover:text-sand text-sm py-2 transition-colors"
              >
                Start over
              </button>
            )}
          </div>

          {/* Tips Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-sand/10 p-6 sm:p-8 mb-10">
            <h2 className="text-xl font-outfit font-bold text-sand mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-bark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Quick Tips
            </h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blossom/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-bark text-xs font-bold">1</span>
                </div>
                <p className="text-bark text-sm">
                  <strong className="text-sand">Measure your bed:</strong> Multiply the length by the width. For odd shapes, break it into rectangles and add them up.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blossom/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-bark text-xs font-bold">2</span>
                </div>
                <p className="text-bark text-sm">
                  <strong className="text-sand">3 inches is standard</strong> for most flower beds. Go thicker for weed control, thinner for a quick refresh.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blossom/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-bark text-xs font-bold">3</span>
                </div>
                <p className="text-bark text-sm">
                  <strong className="text-sand">Order a little extra</strong> — it&apos;s always better to have a bit left over than to come up short.
                </p>
              </div>
            </div>
          </div>

          {/* Other Tools */}
          <div className="mb-8">
            <h3 className="text-lg font-outfit font-bold text-sand mb-4 text-center">Try Our Other Calculators</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/tools/sod-calculator"
                className="bg-white rounded-xl border border-sand/10 shadow-sm p-5 hover:border-blossom/30 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blossom/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-bark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sand group-hover:text-blossom transition-colors">Sod Calculator</p>
                    <p className="text-bark-light text-xs">How much sod for your lawn</p>
                  </div>
                </div>
              </Link>
              <Link
                href="/tools/rock-calculator"
                className="bg-white rounded-xl border border-sand/10 shadow-sm p-5 hover:border-blossom/30 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blossom/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-bark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sand group-hover:text-blossom transition-colors">Rock/Stone Calculator</p>
                    <p className="text-bark-light text-xs">How many tons of rock you need</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
