"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
// Using Remix and IonIcons for a more refined, upscale look
import { RiFlashlightLine, RiShieldStarLine, RiMagicLine } from "react-icons/ri";
import { IoMoonOutline } from "react-icons/io5";

const concerns = [
  { 
    title: "Dark Spots", 
    subtitle: "Hyperpigmentation", 
    icon: <RiFlashlightLine className="h-5 w-5" />, 
    handle: "hyperpigmentation" 
  },
  { 
    title: "Clear Skin", 
    subtitle: "Acne & Blemishes", 
    icon: <RiShieldStarLine className="h-5 w-5" />, 
    handle: "acne" 
  },
  { 
    title: "Instant Glow", 
    subtitle: "Dullness & Radiance", 
    icon: <RiMagicLine className="h-5 w-5" />, 
    handle: "glow" 
  },
  { 
    title: "Age Defy", 
    subtitle: "Firming & Lines", 
    icon: <IoMoonOutline className="h-5 w-5" />, 
    handle: "anti-aging" 
  },
];

export default function ShopByConcern() {
  // We repeat the array enough times to ensure no gaps during the animation
  const marqueeItems = [...concerns, ...concerns, ...concerns, ...concerns, ...concerns];

  return (
    <div className="relative w-full overflow-hidden bg-stone-50 border-y border-stone-100 py-5">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }} // Improved logic for seamless looping
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25, // Slightly faster for better engagement
            ease: "linear",
          },
        }}
      >
        {marqueeItems.map((concern, index) => (
          <Link
            key={`${concern.handle}-${index}`}
            href={`/shop?collections=${concern.handle}`}
            className="flex items-center gap-5 px-14 group border-r border-stone-200/40"
          >
            {/* Minimalist Icon Container */}
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#73512C] shadow-sm ring-1 ring-stone-100 transition-all duration-500 group-hover:bg-[#73512C] group-hover:text-white">
              {concern.icon}
            </div>

            <div className="flex flex-col">
              <span className="font-valky text-xl text-stone-900 leading-tight">
                {concern.title}
              </span>
              <span className="text-[9px] font-bold tracking-[0.25em] text-stone-400 uppercase">
                {concern.subtitle}
              </span>
            </div>
          </Link>
        ))}
      </motion.div>

      {/* Subtle Gradient Fades on edges for that premium feel */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-stone-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-stone-50 to-transparent z-10 pointer-events-none" />
    </div>
  );
}