"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

// ─── Mulch colors ─────────────────────────────────────────────────────────
const mulchColors = [
  { label: "Brown Mulch", value: "Brown Mulch" },
  { label: "Black Mulch", value: "Black Mulch" },
  { label: "Red Mulch", value: "Red Mulch" },
  { label: "Western Red Cedar", value: "Western Red Cedar" },
  { label: "Playground Mulch", value: "Playground Mulch" },
];

const depthOptions = [
  { label: "2 inches — standard top-up", value: 2 },
  { label: "4 inches — heavy coverage", value: 4 },
];

// ─── Phone formatter ──────────────────────────────────────────────────────
function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// ─── Shared field styles ──────────────────────────────────────────────────
const inputBase =
  "w-full px-4 py-3 rounded-xl border border-sand/15 bg-[#faf7f2] text-sand focus:border-blossom focus:ring-2 focus:ring-blossom/20 transition-all";
const inputError =
  "w-full px-4 py-3 rounded-xl border border-red-300 bg-red-50/50 text-sand focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all";

const selectArrow = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%231e293b' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat" as const,
  backgroundPosition: "right 16px center",
};

// ─── Yard Calculator ──────────────────────────────────────────────────────
function YardCalculator({ onFill }: { onFill: (yards: string) => void }) {
  const [sqft, setSqft] = useState("");
  const [depth, setDepth] = useState(2);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const area = parseFloat(sqft);
    if (!area || area <= 0) return;
    const yards = Math.round((area * (depth / 12)) / 27);
    setResult(yards);
    onFill(String(yards));
  };

  return (
    <div className="mt-3 bg-[#faf7f2] border border-sand/10 rounded-xl p-4 space-y-3">
      <p className="text-bark text-xs font-medium">Enter your bed area to calculate cubic yards:</p>
      <div>
        <label className="block text-sand text-xs font-semibold mb-1">Area (square feet)</label>
        <input
          type="number"
          inputMode="decimal"
          placeholder="e.g. 500"
          value={sqft}
          onChange={(e) => setSqft(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-sand/15 bg-white text-sand focus:border-blossom focus:ring-2 focus:ring-blossom/20 transition-all"
        />
      </div>
      <div>
        <label className="block text-sand text-xs font-semibold mb-1">Depth</label>
        <select
          value={depth}
          onChange={(e) => setDepth(Number(e.target.value))}
          className="w-full px-3 py-2.5 rounded-lg border border-sand/15 bg-white text-sand focus:border-blossom focus:ring-2 focus:ring-blossom/20 transition-all appearance-none"
          style={{ ...selectArrow, backgroundPosition: "right 12px center" }}
        >
          {depthOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <button
        onClick={calculate}
        className="w-full bg-blossom/10 hover:bg-blossom/20 text-bark font-semibold py-2.5 rounded-lg transition-colors text-sm"
      >
        Calculate &amp; Fill In
      </button>
      {result !== null && (
        <p className="text-bark text-xs text-center">
          ≈ <strong className="text-sand">{result} cubic yards</strong> — filled in above
        </p>
      )}
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────
function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-sand/10 p-8 sm:p-12 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blossom/10 rounded-full mb-6">
        <svg className="w-8 h-8 text-blossom" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-outfit font-bold text-sand mb-3">Message Sent!</h2>
      <p className="text-bark mb-6 leading-relaxed">
        We got your info and will be in touch soon. Expect a call or text from us.
      </p>
      <button onClick={onReset} className="text-bark hover:text-blossom text-sm font-medium underline underline-offset-2 transition-colors">
        Submit another request
      </button>
    </div>
  );
}

// ─── Estimate Form (Button 1) — Free in-person estimate ───────────────────
function EstimateForm({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [yards, setYards] = useState("");
  const [color, setColor] = useState("");
  const [notes, setNotes] = useState("");
  const [showCalc, setShowCalc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const blur = useCallback((f: string) => setTouched((p) => ({ ...p, [f]: true })), []);

  const nameErr = touched.name && name.trim().length < 2 ? "Required" : "";
  const phoneErr = touched.phone && phone.replace(/\D/g, "").length !== 10 ? "Enter a 10-digit phone" : "";
  const emailErr = touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "Enter a valid email" : "";
  const valid = name.trim().length >= 2 && phone.replace(/\D/g, "").length === 10 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submit = async () => {
    setTouched({ name: true, phone: true, email: true });
    if (!valid) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "estimate", name, phone, email, yards, color, notes }),
      });
      if (!res.ok) throw new Error("Request failed");
      onSuccess();
    } catch {
      setError("Something went wrong. Please call us at (952) 314-4797.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-sand/10 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-bark-light hover:text-sand transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-outfit font-bold text-sand">Free In-Person Estimate</h2>
      </div>
      <p className="text-bark text-sm mb-6">
        We&apos;ll come out, measure your beds, and give you an exact price — no obligation.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sand font-semibold text-sm mb-1">Full name <span className="text-blossom">*</span></label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => blur("name")} className={nameErr ? inputError : inputBase} placeholder="Jane Smith" />
          {nameErr && <p className="text-red-500 text-xs mt-1">{nameErr}</p>}
        </div>
        <div>
          <label className="block text-sand font-semibold text-sm mb-1">Phone <span className="text-blossom">*</span></label>
          <input type="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} onBlur={() => blur("phone")} className={phoneErr ? inputError : inputBase} placeholder="(952) 555-0123" />
          {phoneErr && <p className="text-red-500 text-xs mt-1">{phoneErr}</p>}
        </div>
        <div>
          <label className="block text-sand font-semibold text-sm mb-1">Email <span className="text-blossom">*</span></label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => blur("email")} className={emailErr ? inputError : inputBase} placeholder="you@email.com" />
          {emailErr && <p className="text-red-500 text-xs mt-1">{emailErr}</p>}
        </div>
        <div>
          <label className="block text-sand font-semibold text-sm mb-1">Approximate yards <span className="text-bark-light font-normal">(optional)</span></label>
          <div className="relative">
            <input type="number" inputMode="numeric" placeholder="0" value={yards} onChange={(e) => setYards(e.target.value)} className={`${inputBase} pr-16`} />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-bark-light text-sm font-medium">yards</span>
          </div>
          <button onClick={() => setShowCalc(!showCalc)} className="mt-2 text-bark hover:text-blossom text-xs font-medium underline underline-offset-2 transition-colors">
            {showCalc ? "Hide calculator" : "Don't know your yards? Use the calculator"}
          </button>
          {showCalc && <YardCalculator onFill={(y) => setYards(y)} />}
        </div>
        <div>
          <label className="block text-sand font-semibold text-sm mb-1">Preferred color <span className="text-bark-light font-normal">(optional)</span></label>
          <select value={color} onChange={(e) => setColor(e.target.value)} className={`${inputBase} appearance-none`} style={selectArrow}>
            <option value="">Not sure yet</option>
            {mulchColors.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sand font-semibold text-sm mb-1">Notes <span className="text-bark-light font-normal">(optional)</span></label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className={`${inputBase} resize-none`} placeholder="Access notes, specific areas, anything helpful." />
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mt-4 text-sm">{error}</div>}

      <button onClick={submit} disabled={loading} className="w-full mt-6 bg-blossom hover:bg-blossom-dark disabled:bg-sand/20 disabled:text-bark-light text-white font-bold py-4 rounded-xl transition-colors text-lg">
        {loading ? "Sending..." : "Request Free Estimate"}
      </button>
      <p className="text-bark-light text-xs text-center mt-2">
        We&apos;ll reach out by phone or text to schedule a time.
      </p>
    </div>
  );
}

// ─── Know Form (Button 2) — I know my yards + color ───────────────────────
function KnowForm({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [yards, setYards] = useState("");
  const [color, setColor] = useState("");
  const [notes, setNotes] = useState("");
  const [showCalc, setShowCalc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const blur = useCallback((f: string) => setTouched((p) => ({ ...p, [f]: true })), []);

  const nameErr = touched.name && name.trim().length < 2 ? "Required" : "";
  const phoneErr = touched.phone && phone.replace(/\D/g, "").length !== 10 ? "Enter a 10-digit phone" : "";
  const emailErr = touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "Enter a valid email" : "";
  const yardsErr = touched.yards && (!yards || parseInt(yards) <= 0) ? "Required" : "";
  const colorErr = touched.color && !color ? "Please select a color" : "";
  const valid =
    name.trim().length >= 2 &&
    phone.replace(/\D/g, "").length === 10 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    parseInt(yards) > 0 &&
    !!color;

  const submit = async () => {
    setTouched({ name: true, phone: true, email: true, yards: true, color: true });
    if (!valid) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "know", name, phone, email, yards, color, notes }),
      });
      if (!res.ok) throw new Error("Request failed");
      onSuccess();
    } catch {
      setError("Something went wrong. Please call us at (952) 314-4797.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-sand/10 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-bark-light hover:text-sand transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-outfit font-bold text-sand">I Know What I Want</h2>
      </div>
      <p className="text-bark text-sm mb-6">
        Lock in your yards and color — we&apos;ll be in touch to schedule your installation.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sand font-semibold text-sm mb-1">Full name <span className="text-blossom">*</span></label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => blur("name")} className={nameErr ? inputError : inputBase} placeholder="Jane Smith" />
          {nameErr && <p className="text-red-500 text-xs mt-1">{nameErr}</p>}
        </div>
        <div>
          <label className="block text-sand font-semibold text-sm mb-1">Phone <span className="text-blossom">*</span></label>
          <input type="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} onBlur={() => blur("phone")} className={phoneErr ? inputError : inputBase} placeholder="(952) 555-0123" />
          {phoneErr && <p className="text-red-500 text-xs mt-1">{phoneErr}</p>}
        </div>
        <div>
          <label className="block text-sand font-semibold text-sm mb-1">Email <span className="text-blossom">*</span></label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => blur("email")} className={emailErr ? inputError : inputBase} placeholder="you@email.com" />
          {emailErr && <p className="text-red-500 text-xs mt-1">{emailErr}</p>}
        </div>
        <div>
          <label className="block text-sand font-semibold text-sm mb-1">How many yards? <span className="text-blossom">*</span></label>
          <div className="relative">
            <input type="number" inputMode="numeric" placeholder="0" value={yards} onChange={(e) => setYards(e.target.value)} onBlur={() => blur("yards")} className={`${yardsErr ? inputError : inputBase} pr-16`} />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-bark-light text-sm font-medium">yards</span>
          </div>
          {yardsErr && <p className="text-red-500 text-xs mt-1">{yardsErr}</p>}
          <button onClick={() => setShowCalc(!showCalc)} className="mt-2 text-bark hover:text-blossom text-xs font-medium underline underline-offset-2 transition-colors">
            {showCalc ? "Hide calculator" : "Need help calculating yards?"}
          </button>
          {showCalc && <YardCalculator onFill={(y) => setYards(y)} />}
        </div>
        <div>
          <label className="block text-sand font-semibold text-sm mb-1">Mulch color <span className="text-blossom">*</span></label>
          <select value={color} onChange={(e) => setColor(e.target.value)} onBlur={() => blur("color")} className={`${colorErr ? inputError : inputBase} appearance-none`} style={selectArrow}>
            <option value="">Select a color...</option>
            {mulchColors.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          {colorErr && <p className="text-red-500 text-xs mt-1">{colorErr}</p>}
        </div>
        <div>
          <label className="block text-sand font-semibold text-sm mb-1">Notes <span className="text-bark-light font-normal">(optional)</span></label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className={`${inputBase} resize-none`} placeholder="Access notes, which beds, anything else we should know." />
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mt-4 text-sm">{error}</div>}

      <button onClick={submit} disabled={loading} className="w-full mt-6 bg-blossom hover:bg-blossom-dark disabled:bg-sand/20 disabled:text-bark-light text-white font-bold py-4 rounded-xl transition-colors text-lg">
        {loading ? "Sending..." : "Request My Installation"}
      </button>
      <p className="text-bark-light text-xs text-center mt-2">
        We&apos;ll call or text to confirm timing and details.
      </p>
    </div>
  );
}

// ─── Question Form (Button 3) — General question ──────────────────────────
function QuestionForm({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const blur = useCallback((f: string) => setTouched((p) => ({ ...p, [f]: true })), []);

  const nameErr = touched.name && name.trim().length < 2 ? "Required" : "";
  const phoneErr = touched.phone && phone.replace(/\D/g, "").length !== 10 ? "Enter a 10-digit phone" : "";
  const emailErr = touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "Enter a valid email" : "";
  const messageErr = touched.message && message.trim().length < 5 ? "Please write a message" : "";
  const valid =
    name.trim().length >= 2 &&
    phone.replace(/\D/g, "").length === 10 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    message.trim().length >= 5;

  const submit = async () => {
    setTouched({ name: true, phone: true, email: true, message: true });
    if (!valid) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "question", name, phone, email, message }),
      });
      if (!res.ok) throw new Error("Request failed");
      onSuccess();
    } catch {
      setError("Something went wrong. Please call us at (952) 314-4797.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-sand/10 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-bark-light hover:text-sand transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-outfit font-bold text-sand">Ask Us Anything</h2>
      </div>
      <p className="text-bark text-sm mb-6">
        Not sure where to start? Send us a message and we&apos;ll get back to you.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sand font-semibold text-sm mb-1">Full name <span className="text-blossom">*</span></label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => blur("name")} className={nameErr ? inputError : inputBase} placeholder="Jane Smith" />
          {nameErr && <p className="text-red-500 text-xs mt-1">{nameErr}</p>}
        </div>
        <div>
          <label className="block text-sand font-semibold text-sm mb-1">Phone <span className="text-blossom">*</span></label>
          <input type="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} onBlur={() => blur("phone")} className={phoneErr ? inputError : inputBase} placeholder="(952) 555-0123" />
          {phoneErr && <p className="text-red-500 text-xs mt-1">{phoneErr}</p>}
        </div>
        <div>
          <label className="block text-sand font-semibold text-sm mb-1">Email <span className="text-blossom">*</span></label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => blur("email")} className={emailErr ? inputError : inputBase} placeholder="you@email.com" />
          {emailErr && <p className="text-red-500 text-xs mt-1">{emailErr}</p>}
        </div>
        <div>
          <label className="block text-sand font-semibold text-sm mb-1">Your question <span className="text-blossom">*</span></label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} onBlur={() => blur("message")} rows={4} className={`${messageErr ? inputError : inputBase} resize-none`} placeholder="What would you like to know?" />
          {messageErr && <p className="text-red-500 text-xs mt-1">{messageErr}</p>}
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mt-4 text-sm">{error}</div>}

      <button onClick={submit} disabled={loading} className="w-full mt-6 bg-blossom hover:bg-blossom-dark disabled:bg-sand/20 disabled:text-bark-light text-white font-bold py-4 rounded-xl transition-colors text-lg">
        {loading ? "Sending..." : "Send Message"}
      </button>
    </div>
  );
}

// ─── Main Component — 3-button landing ───────────────────────────────────
type Mode = null | "estimate" | "know" | "question";

export default function PriceMulchForm() {
  const [mode, setMode] = useState<Mode>(null);
  const [success, setSuccess] = useState(false);

  if (success) {
    return <SuccessScreen onReset={() => { setMode(null); setSuccess(false); }} />;
  }

  if (mode === "estimate") return <EstimateForm onBack={() => setMode(null)} onSuccess={() => setSuccess(true)} />;
  if (mode === "know") return <KnowForm onBack={() => setMode(null)} onSuccess={() => setSuccess(true)} />;
  if (mode === "question") return <QuestionForm onBack={() => setMode(null)} onSuccess={() => setSuccess(true)} />;

  const buttons = [
    {
      mode: "estimate" as Mode,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Come Measure My Site",
      sub: "Free in-person estimate — we come to you",
    },
    {
      mode: "know" as Mode,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      label: "I Know My Yards & Color",
      sub: "Ready to book — let's get you scheduled",
    },
    {
      mode: "question" as Mode,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      label: "I Have a General Question",
      sub: "Not sure yet — just reach out",
    },
  ];

  return (
    <div className="space-y-4">
      {buttons.map((btn) => (
        <button
          key={btn.mode}
          onClick={() => setMode(btn.mode)}
          className="w-full bg-blossom hover:bg-blossom-dark text-white rounded-2xl px-6 py-5 flex items-center gap-4 text-left transition-colors shadow-md hover:shadow-lg group"
        >
          <div className="flex-shrink-0 opacity-90">{btn.icon}</div>
          <div className="flex-1">
            <div className="font-outfit font-bold text-lg leading-tight">{btn.label}</div>
            <div className="text-white/80 text-sm mt-0.5">{btn.sub}</div>
          </div>
          <svg className="w-5 h-5 opacity-70 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      ))}
      <p className="text-center text-bark-light text-sm pt-2">
        Or call us directly:{" "}
        <Link href="tel:9523144797" className="text-bark font-semibold hover:text-blossom transition-colors">
          (952) 314-4797
        </Link>
      </p>
    </div>
  );
}
