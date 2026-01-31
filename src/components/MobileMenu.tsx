"use client";

import { useState } from "react";
import Link from "next/link";

const areas = [
  { name: "Chanhassen", href: "/chanhassen-mulch-delivery" },
  { name: "Eden Prairie", href: "/eden-prairie-mulch-delivery" },
  { name: "Chaska", href: "/chaska-mulch-delivery" },
  { name: "Shakopee", href: "/shakopee-mulch-delivery" },
  { name: "Victoria", href: "/victoria-mulch-delivery" },
  { name: "Waconia", href: "/waconia-mulch-delivery" },
  { name: "Excelsior", href: "/excelsior-mulch-delivery" },
  { name: "Minnetonka", href: "/minnetonka-mulch-delivery" },
  { name: "Shorewood", href: "/shorewood-mulch-delivery" },
  { name: "Prior Lake", href: "/prior-lake-mulch-delivery" },
  { name: "Savage", href: "/savage-mulch-delivery" },
  { name: "Carver", href: "/carver-mulch-delivery" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
    setAreasOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-soil p-2 hover:text-white transition-colors"
        aria-label="Menu"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-4 top-full mt-2 w-64 bg-[#1a1208] border border-bark/30 rounded-lg shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="py-2">
            <Link
              href="/services/mulch-installation"
              onClick={closeMenu}
              className="block px-4 py-2 text-soil-dark hover:text-white hover:bg-bark/20 transition-colors font-medium"
            >
              Mulch Installation
            </Link>

            {/* Areas Accordion */}
            <div>
              <button
                onClick={() => setAreasOpen(!areasOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-soil-dark hover:text-white hover:bg-bark/20 transition-colors"
              >
                <span>Areas</span>
                <svg
                  className={`w-4 h-4 transition-transform ${areasOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {areasOpen && (
                <div className="bg-bark/10 border-t border-b border-bark/20 grid grid-cols-2 gap-x-2">
                  {areas.map((area) => (
                    <Link
                      key={area.href}
                      href={area.href}
                      onClick={closeMenu}
                      className="block px-4 py-1.5 text-soil-dark hover:text-white text-sm transition-colors"
                    >
                      {area.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              onClick={closeMenu}
              className="block px-4 py-2 text-soil-dark hover:text-white hover:bg-bark/20 transition-colors font-medium"
            >
              About
            </Link>

            <a
              href="tel:6125550100"
              className="block px-4 py-2 text-soil-dark hover:text-white hover:bg-bark/20 transition-colors font-medium"
            >
              (612) 555-0100
            </a>

            <div className="border-t border-bark/20 mt-2 pt-2 px-4 pb-2">
              <Link
                href="/estimate"
                onClick={closeMenu}
                className="block bg-forest hover:bg-forest-light text-white font-semibold px-4 py-2.5 rounded-lg text-center transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
