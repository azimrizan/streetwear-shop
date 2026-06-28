"use client";

import { motion } from "framer-motion";
import { Search, Menu, ShoppingBag } from "lucide-react";
import Image from "next/image";

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

      <a href="https://jkbaav-v4.myshopify.com/" className="relative h-12 w-12 md:h-20 md:w-20 flex items-center justify-center">
        <Image 
          src="/logo.png" 
          alt="FT Guys Logo" 
          fill 
          sizes="(max-width: 768px) 48px, 80px"
          className="object-contain"
        />
      </a>

      <div className="flex items-center gap-6">
        <a href="https://jkbaav-v4.myshopify.com/" className="text-xs font-mono tracking-widest hidden md:block cursor-pointer hover:opacity-70 transition-opacity">
          SHOP
        </a>
        <div className="text-xs font-mono tracking-widest hidden md:block cursor-pointer hover:opacity-70 transition-opacity">
          ACCOUNT
        </div>
        <a href="https://jkbaav-v4.myshopify.com/" className="relative hover:opacity-70 transition-opacity">
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-black text-[10px] flex items-center justify-center rounded-full font-bold">
            0
          </span>
        </a>
      </div>
    </motion.header>
  );
}
