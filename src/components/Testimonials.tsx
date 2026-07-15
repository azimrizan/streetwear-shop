"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    id: 1,
    quote: "The heavyweight cotton feels incredibly premium. Best fit I've ever had from a t-shirt. The drape is just flawless.",
    name: "Alex M.",
    role: "Verified Buyer"
  },
  {
    id: 2,
    quote: "Finally a brand that understands luxury streetwear. Washed it a dozen times and the fabric still looks brand new.",
    name: "Sarah",
    role: "Verified Buyer"
  },
  {
    id: 3,
    quote: "Insane quality. The minimalist design combined with the thick cotton makes it the perfect everyday statement piece.",
    name: "Ravi",
    role: "Verified Buyer"
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    gsap.from(".testimonial-card", {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-16 md:py-24 px-6 md:px-12 bg-luxury-black text-white relative z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="font-mono text-sm tracking-widest text-luxury-muted uppercase mb-4">Cult Following</p>
            <h2 className="text-4xl md:text-6xl lg:text-[5vw] leading-[0.9] font-display font-black uppercase tracking-tighter">
              <span className="text-white">Verified</span> <br className="hidden md:block" />{" "}
              <span className="text-[#EBB30A]">Experiences.</span>
            </h2>
          </div>
          <p className="font-sans text-luxury-muted max-w-sm text-lg md:text-right">
            Thousands of individuals have upgraded their wardrobe with our signature heavy-weight pieces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="testimonial-card flex flex-col p-10 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors duration-500">
              <div className="flex gap-2 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-white text-white" />
                ))}
              </div>
              <p className="font-sans text-2xl md:text-[1.75rem] font-light leading-[1.4] mb-12 text-white/90 grow tracking-tight">
                "{t.quote}"
              </p>
              <div>
                <p className="font-mono font-bold uppercase tracking-widest text-sm">{t.name}</p>
                <p className="font-sans text-luxury-muted text-sm mt-2">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
