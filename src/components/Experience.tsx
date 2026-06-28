"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const VARIANTS = [
  { 
    name: "Classic White", 
    hex: "#EAEAEA", 
    spotlight: "rgba(255, 255, 255, 0.1)", 
    bg: "#000000", 
    image: "/image2.png", 
    scale: 1, x: "0%", y: "0%",
    title: "Signature White Tee", 
    price: "₹499.00", 
    desc: "A timeless classic. Premium organic cotton with a minimalist blue graphic, dropped shoulders, and a luxury drape that falls perfectly on the body." 
  },
  { 
    name: "Adi Boss Black", 
    hex: "#222222", 
    spotlight: "rgba(255, 204, 0, 0.15)", 
    bg: "#000000", 
    image: "/tshirt-1.png", 
    scale: 0.97, x: "17.5%", y: "-1.0%",
    title: "Adi Boss Tee", 
    price: "₹599.00", 
    desc: "A bold statement piece in premium black cotton. Features a vibrant yellow graphic design, regular fit, and comfortable neckline for everyday style." 
  },
  { 
    name: "RX100 Black", 
    hex: "#444444", 
    spotlight: "rgba(100, 149, 237, 0.15)", 
    bg: "#000000", 
    image: "/tshirt-2.png", 
    scale: 1.02, x: "17.5%", y: "0%",
    title: "RX100 Graphic Tee", 
    price: "₹699.00", 
    desc: "Classic motorcycle aesthetic printed on a heavyweight black tee. Featuring durable prints and a relaxed fit." 
  },
  { 
    name: "Cactus Yellow", 
    hex: "#D4AF37", 
    spotlight: "rgba(34, 139, 34, 0.15)", 
    bg: "#000000", 
    image: "/tshirt-3.png", 
    scale: 0.9, x: "18.7%", y: "-7.0%",
    title: "Desert Cactus Tee", 
    price: "₹499.00", 
    desc: "Brighten your wardrobe with this vibrant yellow tee. Features a minimalist cactus graphic and made with ultra-soft breathable fabric." 
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  
  const [activeVariant, setActiveVariant] = useState(VARIANTS[0]);

  // GSAP Animation
  useEffect(() => {
    if (!imageContainerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    // Initial downward movement
    tl.to(imageContainerRef.current, {
      y: "10vh",
      scale: 0.9,
      duration: 0.3,
      ease: "power1.inOut"
    }, 0);

    // Transition to the right
    tl.to(imageContainerRef.current, {
      x: "10vw", 
      y: "15vh",
      scale: 1.05, 
      duration: 0.4,
      ease: "power2.inOut"
    }, 0.3);

    // Details fade in
    tl.fromTo(detailsRef.current, 
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, 
      0.7
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef} 
      className="relative w-full h-[400vh]"
      animate={{ backgroundColor: activeVariant.bg }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background Spotlight */}
      <motion.div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] pointer-events-none z-0"
        animate={{ backgroundColor: activeVariant.spotlight }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

        {/* Product Details (Left) */}
        <div 
          ref={detailsRef}
          className="absolute left-[5%] md:left-[10%] w-[90%] max-w-[400px] h-full flex flex-col justify-center z-20 opacity-0 pointer-events-auto"
        >
          <div className="space-y-8">
            <div>
              <p className="font-mono text-luxury-muted text-xs tracking-widest uppercase mb-2">New Arrival</p>
              <h1 className="text-5xl font-display font-black uppercase tracking-tighter text-white mb-4 transition-all duration-300">{activeVariant.title}</h1>
              <p className="text-luxury-muted leading-relaxed font-light transition-all duration-300">
                {activeVariant.desc}
              </p>
            </div>

            <div className="text-3xl font-mono font-bold tracking-tight text-white transition-all duration-300">
              {activeVariant.price}
            </div>
          </div>

          <div className="space-y-8 mt-8">
            {/* Color Selector */}
            <div className="space-y-4">
              <p className="font-mono text-xs tracking-widest text-luxury-muted uppercase">Select Style</p>
              <div className="flex gap-4">
                {VARIANTS.map((variant) => (
                  <button
                    key={variant.name}
                    onClick={() => setActiveVariant(variant)}
                    className="relative w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                    style={{ backgroundColor: variant.hex }}
                    title={variant.name}
                  >
                    {activeVariant.name === variant.name && (
                      <motion.div
                        layoutId="activeVariantRing"
                        className="absolute -inset-2 rounded-full border border-white/30"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-4">
              <p className="font-mono text-xs tracking-widest text-luxury-muted uppercase">Size</p>
              <div className="flex gap-3">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className="w-12 h-12 rounded-none border border-white/20 text-white font-mono text-sm hover:bg-white hover:text-black transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <a 
              href="https://jkbaav-v4.myshopify.com/" 
              className="w-full py-4 bg-white text-black font-mono font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-white/90 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </a>
          </div>
        </div>

        {/* Product Image Container */}
        <div 
          ref={imageContainerRef}
          className="absolute w-[100vw] max-w-[1200px] aspect-video flex items-center justify-center pointer-events-none"
        >
          {VARIANTS.map((variant) => (
            <motion.img
              key={variant.name}
              src={variant.image}
              alt={variant.name}
              className="absolute inset-0 z-20 w-full h-full object-contain pointer-events-none"
              initial={{ opacity: 0, scale: variant.scale, x: variant.x, y: variant.y }}
              animate={{ 
                opacity: activeVariant.name === variant.name ? 1 : 0,
                scale: variant.scale,
                x: variant.x,
                y: variant.y 
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          ))}
        </div>

      </div>
    </motion.div>
  );
}
