"use client";

import { motion } from "framer-motion";
import { Search, Menu, ShoppingBag } from "lucide-react";

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between mix-blend-difference text-white pointer-events-auto"
    >
      <div className="flex items-center gap-6">
        <button className="hover:opacity-70 transition-opacity">
          <Menu className="w-6 h-6" />
        </button>
        <button className="hover:opacity-70 transition-opacity">
          <Search className="w-5 h-5" />
        </button>
      </div>

      <div className="text-xl font-medium tracking-[0.3em] uppercase">
        FT GUYS STORE
      </div>

      <div className="flex items-center gap-6">
        <div className="text-sm tracking-widest hidden md:block cursor-pointer hover:opacity-70 transition-opacity">
          ACCOUNT
        </div>
        <button className="relative hover:opacity-70 transition-opacity">
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-black text-[10px] flex items-center justify-center rounded-full font-bold">
            0
          </span>
        </button>
      </div>
    </motion.header>
  );
}
