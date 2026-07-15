"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const BANNER_IMAGES = [
  {
    id: 1,
    image: "/banner-section/62192ff0-9c0e-456c-b211-a57b9774322a.JPG",
    alt: "FTG Streetwear Campaign 01",
  },
  {
    id: 2,
    image: "/banner-section/88487088-8465-4989-9f81-385081924ae2.JPG",
    alt: "FTG Streetwear Campaign 02",
  },
  {
    id: 3,
    image: "/banner-section/b41cfc57-658f-4060-866f-abdaa21c2380.JPG",
    alt: "FTG Streetwear Campaign 03",
  },
  {
    id: 4,
    image: "/banner-section/f9d4f881-c14e-4c69-b943-bfeccfbb67cd.JPG",
    alt: "FTG Streetwear Campaign 04",
  },
];

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 1.02,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 35 },
      opacity: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
      scale: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 35 },
      opacity: { duration: 0.35 },
      scale: { duration: 0.35 },
    },
  }),
};

export default function BannerSection() {
  const [[page, direction], setPage] = useState([0, 0]);

  const activeIndex =
    ((page % BANNER_IMAGES.length) + BANNER_IMAGES.length) %
    BANNER_IMAGES.length;
  const currentItem = BANNER_IMAGES[activeIndex];

  const paginate = useCallback((newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  // Continuous auto-sliding loop every 4 seconds (no hover pause blocking on desktop)
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 4000);
    return () => clearInterval(timer);
  }, [paginate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  return (
    <section className="relative w-full bg-luxury-black pt-20 sm:pt-24 md:pt-24 pb-0 mb-0 px-0 select-none overflow-hidden group">
      {/* Full-Bleed Edge-to-Edge Container: Zero side margins/borders, increased cinematic height so hair/head is fully visible */}
      <div className="relative w-full h-[55vh] min-h-[400px] sm:h-[65vh] md:h-[78vh] lg:h-[86vh] max-h-[880px] overflow-hidden bg-black flex items-center justify-center">
        
        {/* Ambient Blur Backdrop Layer for rich color atmosphere across widescreen or mobile */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={`blur-${currentItem.id}`}
            src={currentItem.image}
            alt="ambient background"
            className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-40 scale-110 pointer-events-none transform-gpu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>

        {/* Touch / Swipe & Mouse Drag Area */}
        <motion.div
          className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            const swipeThreshold = 40;
            if (info.offset.x < -swipeThreshold) {
              paginate(1);
            } else if (info.offset.x > swipeThreshold) {
              paginate(-1);
            }
          }}
        />

        {/* Main Artwork Slide */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentItem.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden"
          >
            <img
              src={currentItem.image}
              alt={currentItem.alt}
              className="w-full h-full object-cover md:object-contain lg:object-cover object-[center_12%] transform-gpu select-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* Top & Bottom Seamless Blending Gradients */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 via-black/20 to-transparent pointer-events-none z-20" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-20" />

        {/* Left & Right Glass Navigation Arrows */}
        <div className="absolute inset-y-0 left-3 sm:left-6 md:left-8 right-3 sm:right-6 md:right-8 z-40 flex items-center justify-between pointer-events-none">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous slide"
            className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 pointer-events-auto hover:scale-105 active:scale-95 shadow-xl"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="Next slide"
            className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 pointer-events-auto hover:scale-105 active:scale-95 shadow-xl"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Bottom Navigation Indicators with Continuous Auto-Slide Progress */}
        <div className="absolute bottom-4 sm:bottom-6 inset-x-0 z-40 flex items-center justify-center pointer-events-auto">
          <div className="flex items-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15 shadow-2xl">
            {BANNER_IMAGES.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    const diff = idx - activeIndex;
                    if (diff !== 0) paginate(diff);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`relative overflow-hidden transition-all duration-300 rounded-full h-1.5 sm:h-2 ${
                    isActive
                      ? "w-8 sm:w-12 bg-white/30"
                      : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/70"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      key={`progress-${page}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, ease: "linear" }}
                      className="absolute inset-y-0 left-0 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
