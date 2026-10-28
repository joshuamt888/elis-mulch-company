"use client";

import { useState } from "react";
import Link from "next/link";

const tools = [
  { name: "Mulch Calculator", href: "/tools/mulch-calculator" },
  { name: "Sod Calculator", href: "/tools/sod-calculator" },
  { name: "Rock/Stone Calculator", href: "/tools/rock-calculator" },
];

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
  const [toolsOpen, setToolsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
    setAreasOpen(false);
    setToolsOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sand p-2 hover:text-blossom transition-colors"
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
        <div className="absolute right-4 top-full mt-2 w-64 bg-white border border-stone-200 rounded-lg shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="py-2">
            <Link
              href="/services/mulch-installation"
              onClick={closeMenu}
              className="block px-4 py-2 text-[#3d2b1f] hover:text-sand hover:bg-stone-100 transition-colors font-medium"
            >
              Mulch Installation
            </Link>

            {/* Areas Accordion */}
            <div>
              <button
                onClick={() => setAreasOpen(!areasOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-[#3d2b1f] hover:text-sand hover:bg-stone-100 transition-colors"
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
                <div className="bg-stone-50 border-t border-b border-stone-200 grid grid-cols-2 gap-x-2">
                  {areas.map((area) => (
                    <Link
                      key={area.href}
                      href={area.href}
                      onClick={closeMenu}
                      className="block px-4 py-1.5 text-[#3d2b1f] hover:text-blossom text-sm transition-colors"
                    >
                      {area.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Tools Accordion */}
            <div>
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-[#3d2b1f] hover:text-sand hover:bg-stone-100 transition-colors"
              >
                <span>Free Tools</span>
                <svg
                  className={`w-4 h-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {toolsOpen && (
                <div className="bg-stone-50 border-t border-b border-stone-200">
                  {tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={closeMenu}
                      className="block px-4 py-1.5 text-[#3d2b1f] hover:text-blossom text-sm transition-colors"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              onClick={closeMenu}
              className="block px-4 py-2 text-[#3d2b1f] hover:text-sand hover:bg-stone-100 transition-colors font-medium"
            >
              About
            </Link>

            <a
              href="tel:9523144797"
              className="block px-4 py-2 text-[#3d2b1f] hover:text-sand hover:bg-stone-100 transition-colors font-medium"
            >
              (952) 314-4797
            </a>

            <div className="border-t border-stone-200 mt-2 pt-2 px-4 pb-2">
              <Link
                href="/estimate"
                onClick={closeMenu}
                className="block bg-blossom hover:bg-blossom-dark text-white font-semibold px-4 py-2.5 rounded-lg text-center transition-colors"
              >
                Price Mulch
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
