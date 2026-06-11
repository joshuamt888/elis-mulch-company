"use client";

import { useEffect, useRef } from "react";

interface Props {
  onBack: () => void;
  formId?: string;
  clientHubId?: string;
  title?: string;
  description?: string;
}

const DEFAULT_FORM_ID = "4762282";
const DEFAULT_CLIENTHUB_ID = "ba85d565-2eb6-413d-b8ee-fcaefbe58a8d";

export default function JobberEstimateForm({
  onBack,
  formId = DEFAULT_FORM_ID,
  clientHubId = DEFAULT_CLIENTHUB_ID,
  title = "Free In-Person Estimate",
  description = "We'll come out, measure your beds, and give you an exact price — no obligation.",
}: Props) {
  const mountId = `${clientHubId}-${formId}`;
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    // Inject Jobber stylesheet (once)
    if (!document.querySelector('link[href*="work_request_embed.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css";
      link.media = "screen";
      document.head.appendChild(link);
    }

    // Inject Jobber embed script for this specific form
    const scriptSelector = `script[clienthub_id="${mountId}"]`;
    if (!document.querySelector(scriptSelector)) {
      const script = document.createElement("script");
      script.src =
        "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";
      script.setAttribute("clienthub_id", mountId);
      script.setAttribute(
        "form_url",
        `https://clienthub.getjobber.com/client_hubs/${clientHubId}/public/work_request/embedded_work_request_form?form_id=${formId}`
      );
      document.body.appendChild(script);
    }
  }, [mountId, formId, clientHubId]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-sand/10 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="text-bark-light hover:text-sand transition-colors"
          aria-label="Go back"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-outfit font-bold text-sand">{title}</h2>
      </div>
      <p className="text-bark text-sm mb-6">{description}</p>
      {/* Jobber work request embed mount point */}
      <div id={mountId} />
    </div>
  );
}
