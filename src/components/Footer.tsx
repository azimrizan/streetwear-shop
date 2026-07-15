"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;

    gsap.from(".footer-logo", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
      }
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="bg-black pt-32 pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
          <div>
            <h3 className="font-display text-4xl font-bold uppercase mb-8">Join the cult</h3>
            <p className="text-luxury-muted font-sans text-lg mb-8 max-w-md">
              Subscribe to get early access to new drops, exclusive content, and climate-friendly streetwear updates.
            </p>
            <form className="flex gap-4 max-w-md" onSubmit={(e) => { e.preventDefault(); window.location.href = "https://jkbaav-v4.myshopify.com/"; }}>
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-b border-white/30 pb-2 w-full font-mono focus:outline-none focus:border-white transition-colors"
              />
              <button type="submit" className="font-mono uppercase tracking-widest text-sm hover:text-luxury-muted transition-colors whitespace-nowrap">
                Subscribe ↗
              </button>
            </form>
          </div>
          
          <div className="grid grid-cols-2 gap-8 font-sans">
            <div>
              <h4 className="font-mono text-sm tracking-widest text-luxury-muted mb-6 uppercase">Shop</h4>
              <ul className="space-y-4">
                <li><a href="https://jkbaav-v4.myshopify.com/" className="hover:text-luxury-muted transition-colors">All Products</a></li>
                <li><a href="https://jkbaav-v4.myshopify.com/" className="hover:text-luxury-muted transition-colors">T-Shirts</a></li>
                <li><a href="https://jkbaav-v4.myshopify.com/" className="hover:text-luxury-muted transition-colors">Hoodies</a></li>
                <li><a href="https://jkbaav-v4.myshopify.com/" className="hover:text-luxury-muted transition-colors">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-sm tracking-widest text-luxury-muted mb-6 uppercase">Socials</h4>
              <ul className="space-y-4">
                <li><a href="https://www.instagram.com/shopftguys" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-muted transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center overflow-hidden">
          <h2 className="footer-logo text-[15vw] leading-none font-display font-black tracking-tighter uppercase">
            FT GUYS
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-white/10 font-mono text-xs text-luxury-muted uppercase tracking-widest">
          <p>© 2026 FT Guys. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="https://jkbaav-v4.myshopify.com/" className="hover:text-white transition-colors">Privacy</a>
            <a href="https://jkbaav-v4.myshopify.com/" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
