"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { createCheckoutLink, processEstimateBooking, searchAvailableSlots } from "@/app/actions/square";

// ─── Mulch colors & pricing ────────────────────────────────────────────────
const mulchColors = [
  { label: "Black Mulch", value: "black", pricePerYard: 100 },
  { label: "Brown Mulch", value: "brown", pricePerYard: 160 },
  { label: "Red Mulch", value: "red", pricePerYard: 100 },
  { label: "Cedar Mulch", value: "cedar", pricePerYard: 100 },
  { label: "Hardwood Mulch", value: "hardwood", pricePerYard: 100 },
];

const DELIVERY_FEE = 200;

const depthOptions = [
  { label: "2 inches — standard top-up", value: 2 },
  { label: "4 inches — heavy coverage", value: 4 },
];

// ─── Generate weeks starting from beginning of April ───────────────────────
function getAvailableWeeks() {
  const weeks: { label: string; value: string }[] = [];
  const now = new Date();
  // Start from April of current year; if past June, use next year's April
  const seasonYear = now.getMonth() >= 5 ? now.getFullYear() + 1 : now.getFullYear();
  const april1 = new Date(seasonYear, 3, 1); // April 1st (month 3 = April)
  // Find the first Monday on or after April 1
  const start = new Date(april1);
  const dayOfWeek = start.getDay(); // 0=Sun, 1=Mon
  if (dayOfWeek !== 1) {
    const daysToMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    start.setDate(start.getDate() + daysToMonday);
  }
  for (let i = 0; i < 10; i++) {
    const weekStart = new Date(start);
    weekStart.setDate(start.getDate() + i * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 4);
    const fmt = (d: Date) =>
      d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    weeks.push({
      label: `Week of ${fmt(weekStart)} – ${fmt(weekEnd)}`,
      value: weekStart.toISOString(),
    });
  }
  return weeks;
}

// ─── Generate 30-min time slots ────────────────────────────────────────────
function getTimeSlotsForDate(dateStr: string) {
  const slots: { label: string; value: string }[] = [];
  const date = new Date(dateStr);
  for (let hour = 8; hour < 18; hour++) {
    for (const min of [0, 30]) {
      if (hour === 17 && min === 30) continue;
      const d = new Date(date);
      d.setHours(hour, min, 0, 0);
      if (d.getTime() - Date.now() < 24 * 60 * 60 * 1000) continue;
      slots.push({
        label: d.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        value: d.toISOString(),
      });
    }
  }
  return slots;
}

// ─── Get available dates (next 14 weekdays) ────────────────────────────────
function getAvailableDates() {
  const dates: { label: string; value: string }[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (dates.length < 14) {
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      dates.push({
        label: d.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        value: d.toISOString().split("T")[0],
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

// ─── Phone formatting ──────────────────────────────────────────────────────
function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// ─── Validation ────────────────────────────────────────────────────────────
function validateField(field: string, value: string): string {
  switch (field) {
    case "firstName":
    case "lastName":
      return value.trim().length < 2 ? "Required" : "";
    case "email":
      return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
        ? "Enter a valid email"
        : "";
    case "phone":
      return value.replace(/\D/g, "").length !== 10
        ? "Enter a 10-digit phone number"
        : "";
    case "street":
      return value.trim().length < 3 ? "Enter your street address" : "";
    case "city":
      return value.trim().length < 2 ? "Required" : "";
    case "zip":
      return !/^\d{5}$/.test(value.trim()) ? "Enter a 5-digit zip" : "";
    default:
      return "";
  }
}

// ═══════════════════════════════════════════════════════════════════════════
type Step = "pricing" | "estimate" | "confirmation";

export default function PriceMulchForm() {
  const [step, setStep] = useState<Step>("pricing");

  // Pricing + week
  const [color, setColor] = useState("");
  const [yards, setYards] = useState("");
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcSqft, setCalcSqft] = useState("");
  const [calcDepth, setCalcDepth] = useState(2);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [notes, setNotes] = useState("");

  // Contact info (shared — Plan A & Plan B)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("MN");
  const [zip, setZip] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Terms + UI
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [confirmationData, setConfirmationData] = useState<{
    type: "estimate";
    message: string;
  } | null>(null);

  // ─── Derived ───────────────────────────────────────────────────────────
  const selectedColor = mulchColors.find((c) => c.value === color);
  const yardsNum = parseInt(yards) || 0;
  const mulchCost = selectedColor ? yardsNum * selectedColor.pricePerYard : 0;
  const totalCost = yardsNum > 0 && selectedColor ? DELIVERY_FEE + mulchCost : 0;

  const availableWeeks = useMemo(() => getAvailableWeeks(), []);
  const availableDates = useMemo(() => getAvailableDates(), []);

  // Fetch real availability from Square (prevents double-booking)
  const [timeSlots, setTimeSlots] = useState<{ label: string; value: string }[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (!selectedDate) {
      setTimeSlots([]);
      return;
    }

    setLoadingSlots(true);
    setSelectedTime("");

    const startAt = new Date(selectedDate + "T08:00:00");
    const endAt = new Date(selectedDate + "T18:00:00");

    searchAvailableSlots(startAt.toISOString(), endAt.toISOString())
      .then((result) => {
        if (result.success && result.availabilities.length > 0) {
          const slots = result.availabilities
            .filter((a) => typeof a.startAt === "string")
            .map((a) => {
              const iso = a.startAt as string;
              const d = new Date(iso);
              return {
                label: d.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }),
                value: iso,
              };
            });
          setTimeSlots(slots);
        } else {
          // Fallback to client-side slots (sandbox / API down)
          setTimeSlots(getTimeSlotsForDate(selectedDate));
        }
      })
      .catch(() => {
        // Fallback to client-side slots
        setTimeSlots(getTimeSlotsForDate(selectedDate));
      })
      .finally(() => setLoadingSlots(false));
  }, [selectedDate]);

  // ─── Validation (Plan B) ──────────────────────────────────────────────
  const fieldErrors = useMemo(
    () => ({
      firstName: validateField("firstName", firstName),
      lastName: validateField("lastName", lastName),
      email: validateField("email", email),
      phone: validateField("phone", phone),
      street: validateField("street", street),
      city: validateField("city", city),
      zip: validateField("zip", zip),
    }),
    [firstName, lastName, email, phone, street, city, zip]
  );

  const contactValid =
    !fieldErrors.firstName &&
    !fieldErrors.lastName &&
    !fieldErrors.email &&
    !fieldErrors.phone &&
    !fieldErrors.street &&
    !fieldErrors.city &&
    !fieldErrors.zip;

  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const showError = useCallback(
    (field: string) =>
      touched[field] && fieldErrors[field as keyof typeof fieldErrors],
    [touched, fieldErrors]
  );

  const inputClass = useCallback(
    (field: string) =>
      `w-full px-4 py-3 rounded-xl border ${
        showError(field)
          ? "border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-2 focus:ring-red-200"
          : "border-sand/15 bg-[#faf7f2] focus:border-blossom focus:ring-2 focus:ring-blossom/20"
      } text-sand transition-all`,
    [showError]
  );

  // ─── Yard calculator ──────────────────────────────────────────────────
  const runCalculator = () => {
    const area = parseFloat(calcSqft);
    if (!area || area <= 0) return;
    setYards(String(Math.round((area * (calcDepth / 12)) / 27)));
  };

  // ─── Plan A: Redirect to Square ───────────────────────────────────────
  const handleCheckout = async () => {
    if (!selectedWeek || !selectedColor || totalCost <= 0 || !contactValid) return;
    setLoading(true);
    setError("");

    try {
      const weekLabel =
        availableWeeks.find((w) => w.value === selectedWeek)?.label ||
        selectedWeek;

      const result = await createCheckoutLink(
        { firstName, lastName, email, phone, street, city, state, zip },
        {
          color: selectedColor.label,
          yards: yardsNum,
          pricePerYard: selectedColor.pricePerYard,
          deliveryFee: DELIVERY_FEE,
          selectedWeek: weekLabel,
          notes,
        },
        window.location.origin
      );

      if (result.success && result.checkoutUrl) {
        localStorage.setItem(
          "mulchOrder",
          JSON.stringify({
            color: selectedColor.label,
            yards: yardsNum,
            weekStart: selectedWeek,
            weekLabel,
            totalCost,
          })
        );
        window.location.href = result.checkoutUrl;
      } else {
        setError(result.error || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Failed to create checkout. Please try again.");
      setLoading(false);
    }
  };

  // ─── Plan B: Book Estimate ────────────────────────────────────────────
  const handleEstimateBooking = async () => {
    if (!selectedTime || !contactValid) return;
    setLoading(true);
    setError("");
    try {
      const result = await processEstimateBooking(
        { firstName, lastName, email, phone, street, city, state, zip },
        selectedTime
      );
      if (result.success) {
        const slotDate = new Date(selectedTime);
        setStep("confirmation");
        setConfirmationData({
          type: "estimate",
          message: `Your free estimate is booked for ${slotDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at ${slotDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}. We'll see you at ${street}, ${city}.`,
        });
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Confirmation (Plan B only) ───────────────────────────────────────
  if (step === "confirmation" && confirmationData) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-sand/10 p-8 sm:p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blossom/10 rounded-full mb-6">
          <svg className="w-8 h-8 text-bark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-outfit font-bold text-sand mb-3">Estimate Booked!</h2>
        <p className="text-bark mb-6 leading-relaxed">{confirmationData.message}</p>
        <p className="text-bark-light text-sm">
          A confirmation will be sent to <strong className="text-sand">{email}</strong>
        </p>
      </div>
    );
  }

  // ─── Plan B: Estimate Booking ─────────────────────────────────────────
  if (step === "estimate") {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-lg border border-sand/10 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setStep("pricing")} className="text-bark-light hover:text-sand transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-xl font-outfit font-bold text-sand">Schedule a Free Estimate</h2>
          </div>

          <p className="text-bark text-sm mb-6">
            We&apos;ll visit your property, measure everything, and give you an exact price on the spot. No obligation.
          </p>

          {/* Contact Fields */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sand font-semibold text-sm mb-1">First name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} onBlur={() => handleBlur("firstName")} className={inputClass("firstName")} placeholder="First" />
                {showError("firstName") && <p className="text-red-500 text-xs mt-1">{fieldErrors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sand font-semibold text-sm mb-1">Last name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} onBlur={() => handleBlur("lastName")} className={inputClass("lastName")} placeholder="Last" />
                {showError("lastName") && <p className="text-red-500 text-xs mt-1">{fieldErrors.lastName}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sand font-semibold text-sm mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => handleBlur("email")} className={inputClass("email")} placeholder="you@email.com" />
              {showError("email") && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
            </div>
            <div>
              <label className="block text-sand font-semibold text-sm mb-1">Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} onBlur={() => handleBlur("phone")} className={inputClass("phone")} placeholder="(952) 555-0123" />
              {showError("phone") && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
            </div>
            <div>
              <label className="block text-sand font-semibold text-sm mb-1">Street address</label>
              <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} onBlur={() => handleBlur("street")} className={inputClass("street")} placeholder="123 Main St" />
              {showError("street") && <p className="text-red-500 text-xs mt-1">{fieldErrors.street}</p>}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <label className="block text-sand font-semibold text-sm mb-1">City</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} onBlur={() => handleBlur("city")} className={inputClass("city")} placeholder="Chanhassen" />
                {showError("city") && <p className="text-red-500 text-xs mt-1">{fieldErrors.city}</p>}
              </div>
              <div>
                <label className="block text-sand font-semibold text-sm mb-1">State</label>
                <input type="text" value={state} onChange={(e) => setState(e.target.value.toUpperCase().slice(0, 2))} className={inputClass("state")} placeholder="MN" />
              </div>
              <div>
                <label className="block text-sand font-semibold text-sm mb-1">Zip</label>
                <input type="text" inputMode="numeric" value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))} onBlur={() => handleBlur("zip")} className={inputClass("zip")} placeholder="55317" />
                {showError("zip") && <p className="text-red-500 text-xs mt-1">{fieldErrors.zip}</p>}
              </div>
            </div>
          </div>

          {/* Date Picker */}
          <div className="mb-4">
            <label className="block text-sand font-semibold text-sm mb-2">Pick a date</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableDates.map((d) => (
                <button key={d.value} onClick={() => { setSelectedDate(d.value); setSelectedTime(""); }} className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${selectedDate === d.value ? "bg-blossom text-white border-blossom" : "bg-[#faf7f2] text-sand border-sand/15 hover:border-blossom/30"}`}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {selectedDate && (
            <div className="mb-6">
              <label className="block text-sand font-semibold text-sm mb-2">Pick a time</label>
              {loadingSlots ? (
                <div className="flex items-center gap-2 text-bark-light text-sm py-4">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Loading available times...
                </div>
              ) : timeSlots.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((t) => (
                    <button key={t.value} onClick={() => setSelectedTime(t.value)} className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${selectedTime === t.value ? "bg-blossom text-white border-blossom" : "bg-[#faf7f2] text-sand border-sand/15 hover:border-blossom/30"}`}>
                      {t.label}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-bark-light text-sm">No available slots for this date. Try another day.</p>
              )}
            </div>
          )}

          {/* Terms Checkbox */}
          {contactValid && selectedTime && (
            <label className="flex items-start gap-3 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-sand/30 text-bark focus:ring-blossom/30"
              />
              <span className="text-bark text-sm leading-snug">
                I agree to the{" "}
                <Link href="/terms" target="_blank" className="text-bark hover:underline font-medium">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" target="_blank" className="text-bark hover:underline font-medium">Privacy Policy</Link>
              </span>
            </label>
          )}

          {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">{error}</div>}

          <button onClick={handleEstimateBooking} disabled={!contactValid || !selectedTime || !agreedToTerms || loading} className="w-full bg-blossom hover:bg-blossom-dark disabled:bg-sand/20 disabled:text-bark-light text-white font-bold py-4 rounded-xl transition-colors text-lg">
            {loading ? "Booking..." : "Book Free Estimate"}
          </button>
          {!contactValid && <p className="text-bark-light text-xs text-center mt-2">Please fill in all fields correctly above.</p>}
        </div>
      </div>
    );
  }

  // ─── Pricing Step (one-screen Plan A + estimate link) ─────────────────
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-sand/10 p-6 sm:p-8">
        <div className="space-y-6">
          {/* Color */}
          <div>
            <label htmlFor="color" className="block text-sand font-semibold mb-1.5 text-sm">What color mulch?</label>
            <select
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-sand/15 bg-[#faf7f2] text-sand text-lg focus:border-blossom focus:ring-2 focus:ring-blossom/20 transition-all appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%231e293b' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
            >
              <option value="">Select a color...</option>
              {mulchColors.map((c) => (
                <option key={c.value} value={c.value}>{c.label} — ${c.pricePerYard}/yd</option>
              ))}
            </select>
          </div>

          {/* Yards */}
          <div>
            <label htmlFor="yards" className="block text-sand font-semibold mb-1.5 text-sm">How many yards?</label>
            <div className="relative">
              <input id="yards" type="number" inputMode="numeric" placeholder="0" value={yards} onChange={(e) => setYards(e.target.value)} className="w-full px-4 py-3.5 pr-16 rounded-xl border border-sand/15 bg-[#faf7f2] text-sand text-lg focus:border-blossom focus:ring-2 focus:ring-blossom/20 transition-all" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-bark-light text-sm font-medium">yards</span>
            </div>
            <button onClick={() => setShowCalculator(!showCalculator)} className="mt-3 w-full border-2 border-blossom text-bark hover:bg-blossom hover:text-white py-3 px-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-colors">
              <svg className={`w-5 h-5 transition-transform ${showCalculator ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Don&apos;t know your yards? Use our calculator
            </button>
            {showCalculator && (
              <div className="mt-3 bg-[#faf7f2] border border-sand/10 rounded-xl p-4 space-y-3">
                <div>
                  <label className="block text-sand text-xs font-semibold mb-1">Area (square feet)</label>
                  <input type="number" inputMode="decimal" placeholder="e.g. 500" value={calcSqft} onChange={(e) => setCalcSqft(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-sand/15 bg-white text-sand focus:border-blossom focus:ring-2 focus:ring-blossom/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sand text-xs font-semibold mb-1">Depth</label>
                  <select value={calcDepth} onChange={(e) => setCalcDepth(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg border border-sand/15 bg-white text-sand focus:border-blossom focus:ring-2 focus:ring-blossom/20 transition-all appearance-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%231e293b' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
                    {depthOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <button onClick={runCalculator} className="w-full bg-blossom/10 hover:bg-blossom/20 text-bark font-semibold py-2.5 rounded-lg transition-colors text-sm">
                  Calculate &amp; Fill In
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Cost Breakdown */}
        {(color || yardsNum > 0) && (
          <div className="mt-8 pt-6 border-t border-sand/10">
            <h3 className="text-sm font-semibold text-bark-light uppercase tracking-wider mb-3">Cost of Mulch</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-bark">
                <span>Delivery</span>
                <span className="font-semibold text-sand">${DELIVERY_FEE}</span>
              </div>
              {selectedColor && yardsNum > 0 && (
                <div className="flex justify-between text-bark">
                  <span>{selectedColor.label} &times; {yardsNum} yd{yardsNum !== 1 ? "s" : ""} @ ${selectedColor.pricePerYard}/yd</span>
                  <span className="font-semibold text-sand">${mulchCost.toLocaleString()}</span>
                </div>
              )}
              {totalCost > 0 && (
                <div className="flex justify-between text-lg font-bold text-sand border-t border-sand/10 pt-3 mt-3">
                  <span>Total</span>
                  <span className="text-bark">${totalCost.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Week Picker + Checkout Button */}
        {totalCost > 0 && (
          <div className="mt-6 pt-6 border-t border-sand/10">
            <label className="block text-sand font-semibold text-sm mb-2">Pick your install week</label>
            <p className="text-bark-light text-xs mb-3">
              We&apos;ll confirm the exact day during your selected week.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {availableWeeks.map((w) => (
                <button
                  key={w.value}
                  onClick={() => setSelectedWeek(w.value)}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all text-left ${
                    selectedWeek === w.value
                      ? "bg-blossom text-white border-blossom"
                      : "bg-[#faf7f2] text-sand border-sand/15 hover:border-blossom/30"
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>

            {/* Contact Fields */}
            {selectedWeek && (
              <div className="space-y-4 mb-6">
                <label className="block text-sand font-semibold text-sm">Your details</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} onBlur={() => handleBlur("firstName")} className={inputClass("firstName")} placeholder="First name" />
                    {showError("firstName") && <p className="text-red-500 text-xs mt-1">{fieldErrors.firstName}</p>}
                  </div>
                  <div>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} onBlur={() => handleBlur("lastName")} className={inputClass("lastName")} placeholder="Last name" />
                    {showError("lastName") && <p className="text-red-500 text-xs mt-1">{fieldErrors.lastName}</p>}
                  </div>
                </div>
                <div>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => handleBlur("email")} className={inputClass("email")} placeholder="Email address" />
                  {showError("email") && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                </div>
                <div>
                  <input type="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} onBlur={() => handleBlur("phone")} className={inputClass("phone")} placeholder="(952) 555-0123" />
                  {showError("phone") && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
                </div>
                <div>
                  <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} onBlur={() => handleBlur("street")} className={inputClass("street")} placeholder="Street address" />
                  {showError("street") && <p className="text-red-500 text-xs mt-1">{fieldErrors.street}</p>}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} onBlur={() => handleBlur("city")} className={inputClass("city")} placeholder="City" />
                    {showError("city") && <p className="text-red-500 text-xs mt-1">{fieldErrors.city}</p>}
                  </div>
                  <div>
                    <input type="text" value={state} onChange={(e) => setState(e.target.value.toUpperCase().slice(0, 2))} className={inputClass("state")} placeholder="MN" />
                  </div>
                  <div>
                    <input type="text" inputMode="numeric" value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))} onBlur={() => handleBlur("zip")} className={inputClass("zip")} placeholder="Zip" />
                    {showError("zip") && <p className="text-red-500 text-xs mt-1">{fieldErrors.zip}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sand font-semibold text-sm mb-1">Anything you want us to know?</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-sand/15 bg-[#faf7f2] text-sand focus:border-blossom focus:ring-2 focus:ring-blossom/20 transition-all resize-none"
                    placeholder="e.g. Any sensitive areas in your garden? Where do you want it installed — front or backyard? Anything to watch out for?"
                  />
                </div>
              </div>
            )}

            {/* Terms Checkbox */}
            {selectedWeek && contactValid && (
              <label className="flex items-start gap-3 mb-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-sand/30 text-bark focus:ring-blossom/30"
                />
                <span className="text-bark text-sm leading-snug">
                  I agree to the{" "}
                  <Link href="/terms" target="_blank" className="text-bark hover:underline font-medium">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" target="_blank" className="text-bark hover:underline font-medium">Privacy Policy</Link>
                </span>
              </label>
            )}

            {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">{error}</div>}

            <button
              onClick={handleCheckout}
              disabled={!selectedWeek || !contactValid || !agreedToTerms || loading}
              className="w-full bg-blossom hover:bg-blossom-dark disabled:bg-sand/20 disabled:text-bark-light text-white font-bold py-4 rounded-xl transition-colors text-lg"
            >
              {loading
                ? "Preparing checkout..."
                : `Continue to Payment — $${totalCost.toLocaleString()}`}
            </button>

            <p className="text-bark-light text-xs text-center mt-2">
              {!selectedWeek
                ? "Pick an install week to continue."
                : !contactValid
                ? "Fill in your details above to continue."
                : !agreedToTerms
                ? "Please agree to the terms above."
                : "You'll be redirected to Square for payment only — no address needed there."}
            </p>
          </div>
        )}

        {/* Estimate Link */}
        <div className={`text-center ${totalCost > 0 ? "mt-4" : "mt-6 pt-6 border-t border-sand/10"}`}>
          {totalCost === 0 && <p className="text-bark-light text-base mb-2">Not sure what you need?</p>}
          <button
            onClick={() => setStep("estimate")}
            className="text-bark hover:text-blossom font-semibold text-base underline underline-offset-2 transition-colors"
          >
            {totalCost > 0 ? "Need an in-person estimate instead?" : "Schedule a free in-person estimate"}
          </button>
        </div>
      </div>
    </div>
  );
}
