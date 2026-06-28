"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MARQUEE_TEXT = "DM @SHOPFTGUYS TO ORDER / OFFER PRICE ₹650 / 320 GSM / PREMIUM HEAVYWEIGHT / COMFORT FIT / LIMITED STOCK / ";

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    gsap.to(".marquee-inner", {
      xPercent: -50,
      ease: "none",
      duration: 20, // Adjust speed here
      repeat: -1,
    });
  }, { scope: containerRef });

  // Creating a seamless loop by duplicating the content
  return (
    <div ref={containerRef} className="w-full bg-white text-black py-4 md:py-5 overflow-hidden flex relative z-20">
      <div className="marquee-inner flex whitespace-nowrap font-mono font-bold uppercase tracking-[0.2em] text-sm md:text-sm">
        <div className="flex-shrink-0">{MARQUEE_TEXT.repeat(5)}</div>
        <div className="flex-shrink-0">{MARQUEE_TEXT.repeat(5)}</div>
      </div>
    </div>
  );
}
