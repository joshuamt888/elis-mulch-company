"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";

const areas = ["Chanhassen", "Eden Prairie", "Chaska", "Shakopee", "Victoria", "Waconia", "Excelsior", "Minnetonka", "Shorewood", "Prior Lake", "Savage", "Carver"];

const tools = [
  { name: "Mulch Calculator", href: "/tools/mulch-calculator" },
  { name: "Sod Calculator", href: "/tools/sod-calculator" },
  { name: "Rock/Stone Calculator", href: "/tools/rock-calculator" },
];

const link = "text-[14px] font-semibold text-[#1c1c1c] hover:text-blossom transition-colors";

export default function Header() {
  const [open, setOpen] = useState<null | "areas" | "tools">(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const out = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null); };
    document.addEventListener("mousedown", out);
    return () => document.removeEventListener("mousedown", out);
  }, []);

  const chevron = (
    <svg aria-hidden viewBox="0 0 12 12" className="w-3.5 h-3.5 ml-1.5"><path d="M2 4.2 6 8l4-3.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
  const panel = "absolute top-full mt-3 left-0 w-56 rounded-2xl bg-white border border-black/10 shadow-xl py-2";
  const item = "block px-4 py-2.5 text-[15px] text-[#1c1c1c] hover:text-blossom hover:bg-[#f7f3ee] transition-colors";

  return (
    <header ref={ref} className="fixed top-0 left-0 right-0 z-50 bg-[rgba(247,243,238,0.88)] backdrop-blur-md border-b border-[rgba(28,28,28,0.12)] [transform:translateZ(0)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 py-2">
          <Link href="/" className="flex items-center">
            <Image src="/images/logos/logo-horizontal.png" alt="Mulch Company" width={220} height={70} className="h-12 w-auto" priority />
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            <Link href="/services/mulch-installation" className={link}>Mulch Installation</Link>

            <div className="relative">
              <button onClick={() => setOpen(open === "areas" ? null : "areas")} className={`flex items-center ${link}`} aria-expanded={open === "areas"}>Areas {chevron}</button>
              {open === "areas" && (
                <div className={`${panel} max-h-80 overflow-y-auto`}>
                  {areas.map((a) => (
                    <Link key={a} href={`/${a.toLowerCase().replace(/\s+/g, "-")}-mulch-delivery`} onClick={() => setOpen(null)} className={item}>{a}</Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => setOpen(open === "tools" ? null : "tools")} className={`flex items-center ${link}`} aria-expanded={open === "tools"}>Free Tools {chevron}</button>
              {open === "tools" && (
                <div className={panel}>
                  {tools.map((t) => (
                    <Link key={t.href} href={t.href} onClick={() => setOpen(null)} className={item}>{t.name}</Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about" className={link}>About</Link>
            <a href="tel:9523144797" className={link}>(952) 314-4797</a>
            <Link href="/estimate" className="bg-blossom hover:bg-blossom-dark text-white text-[14px] font-semibold px-5 py-2.5 rounded-full transition-colors">Price Mulch</Link>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
