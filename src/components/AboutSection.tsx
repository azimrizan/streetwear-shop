"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    
    // Apple-style text reveal on scroll
    const lines = gsap.utils.toArray<HTMLElement>(".reveal-text");
    
    lines.forEach((line) => {
      gsap.from(line, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: line,
          start: "top 85%",
        }
      });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="pt-24 pb-16 px-6 md:px-12 bg-luxury-black text-white relative z-20 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="space-y-2 md:space-y-4 mb-32" ref={textRef}>
          <div className="overflow-hidden">
            <h2 className="reveal-text text-6xl md:text-[7vw] leading-[0.9] font-display font-black uppercase tracking-tighter">
              We Don't Just
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="reveal-text text-6xl md:text-[7vw] leading-[0.9] font-display font-black uppercase tracking-tighter text-luxury-muted">
              Make Clothes.
            </h2>
          </div>
          <div className="overflow-hidden pt-8">
            <h2 className="reveal-text text-6xl md:text-[7vw] leading-[0.9] font-display font-black uppercase tracking-tighter">
              We Engineer
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="reveal-text text-6xl md:text-[7vw] leading-[0.9] font-display font-black uppercase tracking-tighter text-[#EBB30A]">
              Experiences.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-end mt-24">
          <div className="reveal-text md:col-span-6 lg:col-span-5">
            <p className="text-lg md:text-xl font-sans font-light leading-relaxed text-luxury-muted">
              Born from a desire to merge high-fashion aesthetics with everyday streetwear comfort. Every piece is meticulously crafted using climate-friendly, premium heavy-weight cotton designed to last a lifetime.
            </p>
          </div>
          
          <div className="reveal-text md:col-span-6 lg:col-span-7 flex md:justify-end">
            <a 
              href="https://jkbaav-v4.myshopify.com/" 
              className="group flex items-center justify-between w-full md:w-auto gap-8 px-6 py-4 md:px-8 md:py-5 bg-white text-black rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] duration-300"
            >
              <span className="font-mono font-bold uppercase tracking-widest text-sm">Explore Store</span>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 ease-out">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
