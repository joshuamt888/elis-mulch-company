"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const slides = [
  { src: "/images/hero/hero-1.webp", alt: "Bulk mulch pile ready for delivery" },
  { src: "/images/hero/hero-5.webp", alt: "Front yard shrubs with fresh mulch" },
  { src: "/images/hero/hero-7.webp", alt: "Wheelbarrow with cedar mulch" },
  { src: "/images/hero/hero-9.webp", alt: "Colonial home with mulched landscape" },
  { src: "/images/hero/hero-2.webp", alt: "Aerial view of garden bed with mulch" },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, 6000);
    return () => clearInterval(timer);
  }, [advance]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1a1208]/50" />
    </div>
  );
}
