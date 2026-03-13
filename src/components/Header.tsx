"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";

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

const tools = [
  { name: "Mulch Calculator", href: "/tools/mulch-calculator" },
  { name: "Sod Calculator", href: "/tools/sod-calculator" },
  { name: "Rock/Stone Calculator", href: "/tools/rock-calculator" },
];

export default function Header() {
  const [areasOpen, setAreasOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const areasRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (areasRef.current && !areasRef.current.contains(e.target as Node)) {
        setAreasOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const chevron = (
    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/logos/logo-horizontal.png" alt="Mulch Company" width={220} height={70} className="h-12 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/services/mulch-installation"
              className="text-[#3d2b1f] hover:text-sand transition-colors font-medium"
            >
              Mulch Installation
            </Link>

            {/* Areas Dropdown */}
            <div ref={areasRef} className="relative">
              <button
                onClick={() => { setAreasOpen(!areasOpen); setToolsOpen(false); }}
                className="flex items-center text-[#3d2b1f] hover:text-sand transition-colors font-medium"
              >
                Areas {chevron}
              </button>
              {areasOpen && (
                <div className="absolute top-full mt-2 left-0 w-56 bg-white border border-stone-200 rounded-lg shadow-xl py-2 max-h-80 overflow-y-auto">
                  {areas.map((area) => (
                    <Link
                      key={area}
                      href={`/${area.toLowerCase().replace(/\s+/g, "-")}-mulch-delivery`}
                      onClick={() => setAreasOpen(false)}
                      className="block px-4 py-2.5 text-[#3d2b1f] hover:text-sand hover:bg-stone-100 transition-colors text-sm font-medium"
                    >
                      {area}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Tools Dropdown */}
            <div ref={toolsRef} className="relative">
              <button
                onClick={() => { setToolsOpen(!toolsOpen); setAreasOpen(false); }}
                className="flex items-center text-[#3d2b1f] hover:text-sand transition-colors font-medium"
              >
                Free Tools {chevron}
              </button>
              {toolsOpen && (
                <div className="absolute top-full mt-2 left-0 w-56 bg-white border border-stone-200 rounded-lg shadow-xl py-2">
                  {tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setToolsOpen(false)}
                      className="block px-4 py-2.5 text-[#3d2b1f] hover:text-sand hover:bg-stone-100 transition-colors text-sm font-medium"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="text-[#3d2b1f] hover:text-sand transition-colors font-medium"
            >
              About
            </Link>

            <a
              href="tel:9523144797"
              className="text-[#3d2b1f] hover:text-sand transition-colors font-medium"
            >
              (952) 314-4797
            </a>

            <Link
              href="/estimate"
              className="bg-blossom hover:bg-blossom-dark text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Price Mulch
            </Link>
          </nav>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
