"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const areas = [
  "Chanhassen",
  "Eden Prairie",
  "Chaska",
  "Shakopee",
  "Victoria",
  "Waconia",
  "Excelsior",
  "Minnetonka",
  "Shorewood",
  "Prior Lake",
  "Savage",
  "Carver",
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [areasExpanded, setAreasExpanded] = useState(false);

  const close = () => {
    setOpen(false);
    setAreasExpanded(false);
  };

  const chevron = (expanded: boolean) => (
    <svg
      className={`w-5 h-5 transition-transform ${expanded ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <div className="md:hidden">
      {/* Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="text-soil p-2"
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Full-screen overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-[#1a1208] overflow-y-auto">
          <div className="flex items-center justify-between px-4 h-16 border-b border-bark/30">
            <Link href="/" onClick={close} className="flex items-center gap-2">
              <Image src="/images/logos/logo-icon.webp" alt="Mulch Company" width={40} height={40} />
              <span className="text-soil font-outfit font-semibold text-lg">Mulch Company</span>
            </Link>
            <button onClick={close} className="text-soil p-2" aria-label="Close menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="px-4 py-6 space-y-1">
            <Link
              href="/services/mulch-installation"
              onClick={close}
              className="block py-3 text-soil-dark hover:text-white transition-colors font-medium text-lg"
            >
              Mulch Installation
            </Link>

            {/* Areas Accordion */}
            <div>
              <button
                onClick={() => setAreasExpanded(!areasExpanded)}
                className="flex items-center justify-between w-full py-3 text-soil-dark hover:text-white transition-colors font-medium text-lg"
              >
                Areas {chevron(areasExpanded)}
              </button>
              {areasExpanded && (
                <div className="pl-4 pb-2 space-y-1">
                  {areas.map((area) => (
                    <Link
                      key={area}
                      href={`/${area.toLowerCase().replace(/\s+/g, "-")}-mulch-delivery`}
                      onClick={close}
                      className="block py-2.5 text-soil-dark hover:text-white transition-colors font-medium"
                    >
                      {area}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              onClick={close}
              className="block py-3 text-soil-dark hover:text-white transition-colors font-medium text-lg"
            >
              About
            </Link>

            <a
              href="tel:6125550100"
              className="flex items-center gap-2 py-3 text-soil-dark hover:text-white transition-colors font-medium text-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (612) 555-0100
            </a>

            <div className="pt-4">
              <Link
                href="/estimate"
                onClick={close}
                className="block text-center bg-forest hover:bg-forest-light text-white font-semibold px-5 py-3 rounded-lg transition-colors text-lg"
              >
                Get a Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
