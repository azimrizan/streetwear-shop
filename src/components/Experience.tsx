"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const COLORS = [
  { name: "Maroon", hex: "#5C1717", hueRotate: 0, spotlight: "rgba(92, 23, 23, 0.2)", isWhite: false, bg: "#000000" },
  { name: "White", hex: "#EAEAEA", hueRotate: 0, spotlight: "rgba(255, 255, 255, 0.1)", isWhite: true, bg: "#0B1526" } // Elegant dark blue
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const finalFrameRef = useRef<HTMLImageElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    const frameCount = 240;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const num = i.toString().padStart(3, "0");
      img.src = `/frames/ezgif-frame-${num}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  // GSAP Animation
  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current || !canvasContainerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High DPI Canvas Scaling for premium quality
    const dpr = window.devicePixelRatio || 2; // Force at least 2x for premium crispness
    const rect = canvasContainerRef.current.getBoundingClientRect();
    
    // Set actual resolution
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Normalize coordinates
    ctx.scale(dpr, dpr);

    // Draw frame
    const renderFrame = (index: number) => {
      if (images[index]) {
        ctx.clearRect(0, 0, rect.width, rect.height);
        
        ctx.globalCompositeOperation = 'source-over';
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        const img = images[index];
        // Calculate object-fit: contain equivalent
        const scale = Math.min(rect.width / img.width, rect.height / img.height);
        const drawWidth = img.width * scale;
        const drawHeight = img.height * scale;
        const x = (rect.width - drawWidth) / 2;
        const y = (rect.height - drawHeight) / 2;
        
        ctx.drawImage(img, x, y, drawWidth, drawHeight);
      }
    };
    renderFrame(0);

    const frameObj = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    // Animate frames
    tl.to(frameObj, {
      frame: images.length - 1,
      snap: "frame",
      ease: "none",
      duration: 1,
      onUpdate: () => renderFrame(frameObj.frame)
    }, 0);

    // Initial downward movement
    tl.to(canvasContainerRef.current, {
      y: "10vh",
      scale: 0.9,
      duration: 0.3,
      ease: "power1.inOut"
    }, 0);

    // Transition to the right
    tl.to(canvasContainerRef.current, {
      x: "10vw", // Move less to accommodate full 1.0 scale
      y: "15vh",
      scale: 1.05, // Extra large!
      duration: 0.4,
      ease: "power2.inOut"
    }, 0.3);

    // Details fade in
    tl.fromTo(detailsRef.current, 
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, 
      0.7
    );

    // Crossfade to transparent PNG at the exact end of the sequence
    tl.to(finalFrameRef.current, {
      opacity: 1,
      duration: 0.05,
      ease: "none"
    }, 0.95);
    
    tl.to(canvasRef.current, {
      opacity: 0,
      duration: 0.05,
      ease: "none"
    }, 0.95);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoaded, images]);

  return (
    <motion.div 
      ref={containerRef} 
      className="relative w-full h-[400vh]"
      animate={{ backgroundColor: activeColor.bg }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background Spotlight */}
      <motion.div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] pointer-events-none z-0"
        animate={{ backgroundColor: activeColor.spotlight }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Loading State */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 z-50 flex items-center justify-center bg-luxury-black"
            >
              <div className="text-luxury-text text-sm tracking-widest uppercase">
                Loading Experience...
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Details (Left) */}
        <div 
          ref={detailsRef}
          className="absolute left-[10%] w-[400px] h-full flex flex-col justify-center z-20 opacity-0 pointer-events-auto"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <p className="text-luxury-muted text-sm tracking-[0.2em] uppercase mb-2">New Arrival</p>
              <h1 className="text-5xl font-light tracking-tight text-white mb-4">The Heavyweight<br/>Oversized Tee</h1>
              <p className="text-luxury-muted leading-relaxed font-light">
                Crafted from 320gsm premium organic cotton. Features dropped shoulders, a tight neckline, and a luxury drape that falls perfectly on the body.
              </p>
            </div>

            <div className="text-2xl font-light tracking-wide text-white">
              ₹499.00
            </div>

            {/* Color Selector */}
            <div className="space-y-4">
              <p className="text-sm tracking-wider text-luxury-muted uppercase">Select Color</p>
              <div className="flex gap-4">
                {COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setActiveColor(color)}
                    className="relative w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                    style={{ backgroundColor: color.hex }}
                  >
                    {activeColor.name === color.name && (
                      <motion.div
                        layoutId="activeColorRing"
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
              <p className="text-sm tracking-wider text-luxury-muted uppercase">Size</p>
              <div className="flex gap-3">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className="w-12 h-12 rounded-none border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full py-4 bg-white text-black font-medium tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-white/90 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </button>
          </motion.div>
        </div>

        {/* Canvas & Product Container */}
        <div 
          ref={canvasContainerRef}
          className="absolute w-[100vw] max-w-[1200px] aspect-video flex items-center justify-center pointer-events-none"
        >
          {/* Canvas for Frame Sequence */}
          <motion.canvas 
            ref={canvasRef} 
            className="relative z-10 w-full h-full origin-top"
            animate={{ 
              filter: `hue-rotate(${activeColor.hueRotate}deg)`,
              display: activeColor.isWhite ? "none" : "block"
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          {/* Transparent Final Frame (Maroon) */}
          <motion.img
            ref={finalFrameRef}
            src="/last_frame.png"
            alt="Maroon Transparent"
            className="absolute inset-0 z-15 w-full h-full object-contain pointer-events-none opacity-0"
            animate={{ 
              filter: `hue-rotate(${activeColor.hueRotate}deg)`,
              display: activeColor.isWhite ? "none" : "block"
            }}
          />
          
          {/* Static White Image Override */}
          <motion.img
            src="/image2.png"
            alt="White Variant"
            className="absolute inset-0 z-20 w-full h-full object-contain pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: activeColor.isWhite ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>

      </div>
    </motion.div>
  );
}
