"use client";

import { useEffect, useRef } from "react";

export default function JobberEstimateForm({ onBack }: { onBack: () => void }) {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    // Inject Jobber stylesheet
    if (!document.querySelector('link[href*="work_request_embed.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css";
      link.media = "screen";
      document.head.appendChild(link);
    }

    // Inject Jobber embed script
    if (!document.querySelector('script[src*="work_request_embed_snippet"]')) {
      const script = document.createElement("script");
      script.src =
        "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";
      script.setAttribute(
        "clienthub_id",
        "ba85d565-2eb6-413d-b8ee-fcaefbe58a8d-4729290"
      );
      script.setAttribute(
        "form_url",
        "https://clienthub.getjobber.com/client_hubs/ba85d565-2eb6-413d-b8ee-fcaefbe58a8d/public/work_request/embedded_work_request_form?form_id=4729290"
      );
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-sand/10 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="text-bark-light hover:text-sand transition-colors"
          aria-label="Go back"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-xl font-outfit font-bold text-sand">
          Free In-Person Estimate
        </h2>
      </div>
      <p className="text-bark text-sm mb-6">
        We&apos;ll come out, measure your beds, and give you an exact price —
        no obligation.
      </p>
      {/* Jobber work request embed mount point */}
      <div id="ba85d565-2eb6-413d-b8ee-fcaefbe58a8d-4729290" />
    </div>
  );
}
