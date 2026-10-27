"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, SplitText, MorphSVGPlugin, useGSAP);

export const MOTION = "(prefers-reduced-motion: no-preference)";
export const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export { gsap, ScrollTrigger, SplitText, MorphSVGPlugin, useGSAP };
