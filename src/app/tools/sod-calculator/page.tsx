"use client";

import { useState } from "react";
import { crumbsLd, faqLd, toolFaqs } from "@/lib/faq";
import { JsonLd } from "@/components/garden/JsonLd";
import Faq from "@/components/garden/Faq";
import SocialProof from "@/components/garden/SocialProof";
import ToolGuide from "@/components/garden/ToolGuide";
import Link from "next/link";
import PageHero from "@/components/garden/PageHero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const shapeOptions = [
  { label: "Simple rectangle — 5% extra", value: 5 },
  { label: "Some curves or edges — 10% extra (most yards)", value: 10 },
  { label: "Lots of curves / odd shape — 15% extra", value: 15 },
];

export default function SodCalculator() {
  const [sqft, setSqft] = useState("");
  const [waste, setWaste] = useState(10);
  const [result, setResult] = useState<{ sqYards: number; totalSqft: number; pallets: number; wastePercent: number } | null>(null);

  const calculate = () => {
    const area = parseFloat(sqft);
    if (!area || area <= 0) return;

    const totalWithWaste = area * (1 + waste / 100);
    const sqYards = totalWithWaste / 9;
    const pallets = totalWithWaste / 450; // standard pallet covers ~450 sqft

    setResult({
      sqYards: Math.ceil(sqYards * 10) / 10,
      totalSqft: Math.ceil(totalWithWaste),
      pallets: Math.ceil(pallets * 10) / 10,
      wastePercent: waste,
    });
  };

  const reset = () => {
    setSqft("");
    setWaste(10);
    setResult(null);
  };

  return (
    <>
      <JsonLd data={[faqLd(toolFaqs("sod")), crumbsLd([{ name: "Home", path: "/" }, { name: "Sod Calculator", path: "/tools/sod-calculator" }])]} />
      <Header />
      <main className="gd tool cv">
        <PageHero h1="Sod Calculator" sub="Figure out how much sod you need for a new lawn or patching — waste included." image="/images/hero/hero-2.webp" alt="Sod Calculator" />
        <div className="calc-wrap">

          {/* Calculator Card */}
          <div className="calc-card">
            <div className="space-y-6">
              {/* Square Footage */}
              <div>
                <label htmlFor="sqft" className="block text-sand font-semibold mb-1.5 text-sm">
                  How big is your lawn area?
                </label>
                <p className="text-bark-light text-xs mb-2">
                  Multiply the length by width of the area you want to sod. For the whole yard, check your lot survey or pace it off.
                </p>
                <div className="relative">
                  <input
                    id="sqft"
                    type="number"
                    inputMode="decimal"
                    placeholder="1000"
                    value={sqft}
                    onChange={(e) => { setSqft(e.target.value); setResult(null); }}
                    className="w-full px-4 py-3.5 pr-16 rounded-xl border border-sand/15 bg-[#faf7f2] text-sand text-lg focus:border-blossom focus:ring-2 focus:ring-blossom/20 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-bark-light text-sm font-medium">sq ft</span>
                </div>
              </div>

              {/* Shape / Waste */}
              <div>
                <label htmlFor="waste" className="block text-sand font-semibold mb-1.5 text-sm">
                  What shape is your lawn?
                </label>
                <p className="text-bark-light text-xs mb-2">
                  Curvy edges mean more cutting and waste. Pick the closest match — when in doubt, go one up.
                </p>
                <select
                  id="waste"
                  value={waste}
                  onChange={(e) => { setWaste(Number(e.target.value)); setResult(null); }}
                  className="w-full px-4 py-3.5 rounded-xl border border-sand/15 bg-[#faf7f2] text-sand text-lg focus:border-blossom focus:ring-2 focus:ring-blossom/20 transition-all appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%231e293b' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                >
                  {shapeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculate}
                className="w-full bg-blossom hover:bg-blossom-dark text-white font-bold py-4 rounded-xl transition-colors text-lg shadow-sm"
              >
                Calculate My Sod
              </button>
            </div>

            {/* Result */}
            {result !== null && (
              <div className="mt-8 bg-gradient-to-br from-blossom to-blossom-dark rounded-2xl p-6 sm:p-8 text-white">
                <div className="text-center mb-5">
                  <p className="text-white/70 text-sm mb-1">You need</p>
                  <p className="text-5xl sm:text-6xl font-outfit font-bold mb-1">{result.sqYards}</p>
                  <p className="text-xl font-semibold">square yards of sod</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/15 rounded-xl p-3 text-center">
                    <p className="text-white/60 text-xs mb-0.5">Total sq ft</p>
                    <p className="text-xl font-bold">{result.totalSqft.toLocaleString()}</p>
                    <p className="text-white/50 text-[10px]">with {result.wastePercent}% waste</p>
                  </div>
                  <div className="bg-white/15 rounded-xl p-3 text-center">
                    <p className="text-white/60 text-xs mb-0.5">Pallets</p>
                    <p className="text-xl font-bold">{result.pallets}</p>
                    <p className="text-white/50 text-[10px]">~450 sq ft per pallet</p>
                  </div>
                </div>

                <div className="pt-5 border-t border-white/20 text-center">
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
          <div className="calc-tips">
            <h2 className="text-xl font-outfit font-bold text-sand mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-bark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Quick Tips
            </h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="why-n">01</span>
                <p className="text-bark text-sm">
                  <strong className="text-sand">Measure your yard:</strong> Walk the length and width in big steps (about 3 feet each). Multiply them to get square feet.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="why-n">02</span>
                <p className="text-bark text-sm">
                  <strong className="text-sand">Sod is sold by the pallet</strong> — one pallet typically covers about 450 square feet, but it varies by supplier.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="why-n">03</span>
                <p className="text-bark text-sm">
                  <strong className="text-sand">Install sod the same day</strong> it&apos;s delivered. It&apos;s a living product and dries out fast, especially in summer.
                </p>
              </div>
            </div>
          </div>

          {/* Other Tools */}
          <div className="mb-8">
            <h3 className="text-lg font-outfit font-bold text-sand mb-4 text-center">Try Our Other Calculators</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/tools/mulch-calculator" className="calc-other"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blossom/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-bark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sand group-hover:text-blossom transition-colors">Mulch Calculator</p>
                    <p className="text-bark-light text-xs">How many yards of mulch you need</p>
                  </div>
                </div>
              </Link>
              <Link href="/tools/rock-calculator" className="calc-other"
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
      <div className="gd cv">
        <ToolGuide tool="sod" />
        <SocialProof />
        <Faq items={toolFaqs("sod")} title="Calculator questions" />
      </div>
      <Footer />
    </>
  );
}
