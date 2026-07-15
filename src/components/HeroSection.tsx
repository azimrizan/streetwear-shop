"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const MELVIN_PHOTOS = [
  { id: 1, image: "/melvin/melvin-1.png" },
  { id: 2, image: "/melvin/melvin-2.png" },
  { id: 3, image: "/melvin/melvin-3.png" },
  { id: 4, image: "/melvin/melvin-4.png" },
  { id: 5, image: "/melvin/melvin-5.png" },
];

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 280, damping: 32 },
      opacity: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      scale: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.96,
    transition: {
      x: { type: "spring", stiffness: 280, damping: 32 },
      opacity: { duration: 0.35 },
      scale: { duration: 0.35 },
    },
  }),
};

export default function HeroSection() {
  const [[page, direction], setPage] = useState([0, 0]);

  const activeIndex =
    ((page % MELVIN_PHOTOS.length) + MELVIN_PHOTOS.length) %
    MELVIN_PHOTOS.length;
  const currentItem = MELVIN_PHOTOS[activeIndex];

  const paginate = useCallback((newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  // Auto-sliding loop
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 3500);
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
    <section className="relative w-full h-screen min-h-[620px] sm:min-h-[680px] bg-black overflow-hidden flex flex-col justify-between select-none">
      {/* Ambient Lighting Stage (z-0) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(255,255,255,0.08)_0%,transparent_85%)] pointer-events-none" />

      {/* Massive Split Pure White Editorial Background Text (z-10) */}
      {/* Light layering: G and U layer subtly right behind Melvin's shoulders */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <div className="w-full flex items-center justify-center gap-[11vw] sm:gap-[12vw] md:gap-[13vw] lg:gap-[14vw]">
          <span className="text-[18vw] sm:text-[17vw] md:text-[16vw] lg:text-[15.5vw] font-black font-display tracking-tight text-white uppercase leading-none select-none drop-shadow-[0_10px_35px_rgba(255,255,255,0.18)]">
            FTG
          </span>
          <span className="text-[18vw] sm:text-[17vw] md:text-[16vw] lg:text-[15.5vw] font-black font-display tracking-tight text-white uppercase leading-none select-none drop-shadow-[0_10px_35px_rgba(255,255,255,0.18)]">
            UYS
          </span>
        </div>
      </div>

      {/* Main Center Stage */}
      <div className="relative z-20 flex-1 w-full flex flex-col items-center justify-center px-4 pt-8 sm:pt-10 pb-4 overflow-hidden">
        {/* Touch / Swipe Drag area for Mobile & Desktop */}
        <motion.div
          className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            const swipeThreshold = 40;
            if (info.offset.x < -swipeThreshold) {
              paginate(1);
            } else if (info.offset.x > swipeThreshold) {
              paginate(-1);
            }
          }}
        />

        {/* PARALLEL CLOTHING UNIVERSE Tagline in Gap above Melvin's Hair */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-40 w-full text-center mb-3 sm:mb-5 px-4 pointer-events-none"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight sm:tracking-normal uppercase select-none leading-none">
            <span className="text-white drop-shadow-[0_4px_20px_rgba(255,255,255,0.25)] mr-2 sm:mr-3">
              PARALLEL CLOTHING
            </span>
            <span className="text-[#EBB30A]">
              UNIVERSE.
            </span>
          </h2>
        </motion.div>

        {/* Centered Melvin Photo Frame IN FRONT of Pure White FTG / UYS Text (z-20) */}
        <div className="relative z-20 w-full max-w-5xl h-[52vh] sm:h-[60vh] md:h-[65vh] flex items-center justify-center pointer-events-none">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentItem.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={currentItem.image}
                alt="Melvin"
                className="w-full h-full object-contain object-center transform-gpu drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Apple Vision Pro style Shop Now Button (z-40) */}
        <div className="relative z-40 mt-4 sm:mt-6 md:mt-8 flex items-center justify-center pointer-events-auto">
          <a
            href="https://jkbaav-v4.myshopify.com/"
            className="px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm tracking-wide shadow-[0_0_40px_rgba(255,255,255,0.35)] hover:bg-white/90 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Shop Now
          </a>
        </div>

        {/* Manifesto Text under Shop Now */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-40 mt-4 sm:mt-5 text-center max-w-3xl px-4 pointer-events-none"
        >
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-sans font-normal tracking-[0.015em] sm:tracking-[0.025em] text-[#EBB30A] leading-relaxed">
            <span className="block sm:inline">We don’t judge clothes.</span>{" "}
            <span className="block sm:inline">We just make you feel.</span>
            <span className="block mt-1 sm:mt-1.5">
              Not just what you wear. It’s how you feel when you wear it.
            </span>
          </p>
        </motion.div>
      </div>

      {/* Responsive Apple-Style Bottom Dots Indicator (z-30) */}
      <div className="relative z-30 w-full pb-6 sm:pb-8 flex items-center justify-center pointer-events-auto">
        <div className="flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/15">
          {MELVIN_PHOTOS.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => {
                  const diff = idx - activeIndex;
                  if (diff !== 0) paginate(diff);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-5 sm:w-6 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
