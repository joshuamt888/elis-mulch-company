"use client";

import { useState, useEffect } from "react";

export default function MobileCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const threshold = window.innerHeight * 0.5;
      setVisible(window.scrollY > threshold);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#1a1208] border-t border-bark/30 p-3">
      <a
        href="tel:6125550100"
        className="flex items-center justify-center gap-2 w-full bg-forest hover:bg-forest-light text-white font-semibold py-3 rounded-xl text-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        (612) 555-0100
      </a>
    </div>
  );
}
