"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TRENDING = [
  { id: 1, src: "/posters/poster-1.jpeg", alt: "Urban Decay Drop", title: "Urban Decay Tee", price: "₹699.00" },
  { id: 2, src: "/posters/poster-2.jpeg", alt: "Neon Nights Drop", title: "Neon Nights Hoodie", price: "₹1299.00" },
  { id: 3, src: "/posters/poster-3.jpeg", alt: "Concrete Jungle Drop", title: "Concrete Jacket", price: "₹2499.00" },
  { id: 4, src: "/posters/poster-4.jpeg", alt: "Rebel Series Drop", title: "Rebel Cargo Pants", price: "₹1899.00" },
];

export default function TrendingProducts() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    gsap.from(".trending-card", {
      y: 80,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-16 md:py-24 px-6 md:px-12 bg-luxury-black text-white z-30 relative">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <p className="font-mono text-sm tracking-widest text-luxury-muted uppercase mb-4">Fast Moving</p>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter">
              Trending Now
            </h2>
          </div>
          
          <a 
            href="https://jkbaav-v4.myshopify.com/" 
            className="group flex items-center gap-4 hover:opacity-70 transition-opacity"
          >
            <span className="font-mono font-bold uppercase tracking-widest text-sm">View All Drops</span>
            <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {TRENDING.map((product) => (
            <a key={product.id} href="https://jkbaav-v4.myshopify.com/" className="trending-card group cursor-pointer block">
              <div className="relative aspect-[3/4] w-full rounded-2xl md:rounded-3xl overflow-hidden bg-luxury-dark mb-6 border border-white/5">
                <Image 
                  src={product.src} 
                  alt={product.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl uppercase tracking-tight mb-1">{product.title}</h3>
                  <p className="font-sans text-luxury-muted text-sm">{product.price}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
        
      </div>
    </section>
  );
}
