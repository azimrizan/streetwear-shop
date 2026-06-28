"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Package, Timer, Leaf } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Uncompromising Quality",
    description: "Every piece is crafted from premium 320gsm heavyweight organic cotton. Double-stitched for durability that lasts a lifetime.",
    icon: <Package className="w-8 h-8 md:w-10 md:h-10 text-white mb-6" />
  },
  {
    title: "Lightning Fast Delivery",
    description: "Don't wait for your drip. We offer 2-4 day express nationwide shipping on all orders, fully tracked to your doorstep.",
    icon: <Timer className="w-8 h-8 md:w-10 md:h-10 text-white mb-6" />
  },
  {
    title: "Climate Conscious",
    description: "Looking good shouldn't cost the earth. All our packaging is 100% biodegradable and we offset carbon for every delivery.",
    icon: <Leaf className="w-8 h-8 md:w-10 md:h-10 text-white mb-6" />
  }
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    
    gsap.from(".feature-card", {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="pt-8 pb-8 md:pb-12 px-6 md:px-12 bg-luxury-black text-white relative z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="feature-card flex flex-col items-start">
              {feature.icon}
              <h3 className="text-xl md:text-2xl font-display font-bold uppercase tracking-wider mb-4">
                {feature.title}
              </h3>
              <p className="text-luxury-muted font-sans font-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
