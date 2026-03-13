"use client";

import { useEffect, useState } from "react";

interface OrderData {
  color: string;
  yards: number;
  weekStart: string;
  weekLabel: string;
  totalCost: number;
}

function formatDateGCal(d: Date) {
  return d.toISOString().split("T")[0].replace(/-/g, "");
}

function formatDateICS(d: Date) {
  return d.toISOString().split("T")[0].replace(/-/g, "");
}

function buildGoogleCalendarUrl(order: OrderData) {
  const start = new Date(order.weekStart);
  const end = new Date(start);
  end.setDate(end.getDate() + 5);

  const title = `Mulch Installation — ${order.yards} yds ${order.color}`;
  const details = [
    `${order.yards} yards of ${order.color}`,
    `Total: $${order.totalCost.toLocaleString()}`,
    "",
    "Mulch Company MN will contact you to confirm the exact install day during this week.",
  ].join("\n");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${formatDateGCal(start)}/${formatDateGCal(end)}`,
    details,
  });

  return `https://calendar.google.com/calendar/event?${params.toString()}`;
}

function downloadICSFile(order: OrderData) {
  const start = new Date(order.weekStart);
  const end = new Date(start);
  end.setDate(end.getDate() + 5);

  const title = `Mulch Installation — ${order.yards} yds ${order.color}`;
  const description = [
    `${order.yards} yards of ${order.color}`,
    `Total: $${order.totalCost.toLocaleString()}`,
    "",
    "Mulch Company MN will contact you to confirm the exact install day during this week.",
  ].join("\\n");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mulch Company MN//Install//EN",
    "BEGIN:VEVENT",
    `DTSTART;VALUE=DATE:${formatDateICS(start)}`,
    `DTEND;VALUE=DATE:${formatDateICS(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "mulch-install.ics";
  link.click();
  URL.revokeObjectURL(url);
}

export default function AddToCalendar() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mulchOrder");
      if (stored) {
        setOrder(JSON.parse(stored));
        localStorage.removeItem("mulchOrder");
      }
    } catch {
      // localStorage not available or bad data
    }
  }, []);

  if (!order) return null;

  const gcalUrl = buildGoogleCalendarUrl(order);

  return (
    <div className="mt-8 space-y-4">
      <div className="bg-[#faf7f2] rounded-xl p-4 text-left">
        <div className="flex justify-between text-sm text-bark mb-1">
          <span>{order.color} &times; {order.yards} yds</span>
          <span>${(order.totalCost - 200).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-bark mb-2">
          <span>Delivery</span>
          <span>$200</span>
        </div>
        <div className="flex justify-between font-bold text-sand border-t border-sand/10 pt-2">
          <span>Total</span>
          <span>${order.totalCost.toLocaleString()}</span>
        </div>
        <div className="mt-3 pt-3 border-t border-sand/10 text-sm text-bark">
          <p>{order.weekLabel}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={gcalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-white border border-sand/15 hover:border-blossom/30 text-sand font-semibold px-5 py-3 rounded-lg transition-colors text-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 14h2v2H8zM14 14h2v2h-2z" fill="currentColor" />
          </svg>
          Google Calendar
        </a>

        <button
          onClick={() => downloadICSFile(order)}
          className="inline-flex items-center justify-center gap-2 bg-white border border-sand/15 hover:border-blossom/30 text-sand font-semibold px-5 py-3 rounded-lg transition-colors text-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1.5" fill="currentColor" />
          </svg>
          Apple / Outlook Calendar
        </button>
      </div>
    </div>
  );
}
