"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const services = [
  { name: "Mulch Delivery", href: "/services/mulch-delivery" },
  { name: "Mulch Installation", href: "/services/mulch-installation" },
  { name: "Bulk Mulch", href: "/services/bulk-mulch" },
];

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

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const areasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (areasRef.current && !areasRef.current.contains(e.target as Node)) {
        setAreasOpen(false);
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1208]/95 backdrop-blur-sm border-b border-bark/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-soil font-outfit font-semibold text-lg">
            Eli&apos;s Mulch Company
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/services/mulch-delivery"
              className="text-soil-dark hover:text-white transition-colors font-medium"
            >
              Mulch Delivery
            </Link>

            {/* Services Dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => {
                  setServicesOpen(!servicesOpen);
                  setAreasOpen(false);
                }}
                className="flex items-center text-soil-dark hover:text-white transition-colors font-medium"
              >
                Services {chevron}
              </button>
              {servicesOpen && (
                <div className="absolute top-full mt-2 left-0 w-56 bg-[#1a1208] border border-bark/30 rounded-lg shadow-xl py-2">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setServicesOpen(false)}
                      className="block px-4 py-2.5 text-soil-dark hover:text-white hover:bg-bark/20 transition-colors text-sm font-medium"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Areas Dropdown */}
            <div ref={areasRef} className="relative">
              <button
                onClick={() => {
                  setAreasOpen(!areasOpen);
                  setServicesOpen(false);
                }}
                className="flex items-center text-soil-dark hover:text-white transition-colors font-medium"
              >
                Areas {chevron}
              </button>
              {areasOpen && (
                <div className="absolute top-full mt-2 left-0 w-56 bg-[#1a1208] border border-bark/30 rounded-lg shadow-xl py-2 max-h-80 overflow-y-auto">
                  {areas.map((area) => (
                    <Link
                      key={area}
                      href={`/${area.toLowerCase().replace(/\s+/g, "-")}-mulch-delivery`}
                      onClick={() => setAreasOpen(false)}
                      className="block px-4 py-2.5 text-soil-dark hover:text-white hover:bg-bark/20 transition-colors text-sm font-medium"
                    >
                      {area}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="text-soil-dark hover:text-white transition-colors font-medium"
            >
              About
            </Link>

            <a
              href="tel:6125550100"
              className="text-soil-dark hover:text-white transition-colors font-medium"
            >
              (612) 555-0100
            </a>

            <Link
              href="/estimate"
              className="bg-forest hover:bg-forest-light text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
