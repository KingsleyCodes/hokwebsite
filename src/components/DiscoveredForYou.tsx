"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function DiscoveredForYou() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#FCFBFA]">
      {/* Decorative Floating Element - Integrated into the background */}
      <div className="absolute -top-10 -left-20 opacity-30 pointer-events-none lg:block hidden">
        <Image
          src="/flower.png"
          alt=""
          width={500}
          height={500}
          className="rotate-12"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content - The Editorial Side */}
          <div className="w-full lg:w-2/5 z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[11px] font-bold tracking-[0.4em] text-[#0070bb] uppercase mb-6 block">
                Curated Selection
              </span>
              <h2 className="font-valky text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-black mb-8">
                Discovered <br />
                <span className="italic">For You</span>
              </h2>
              <p className="text-stone-500 text-[15px] leading-relaxed mb-10 max-w-sm">
                A hand-picked collection of Korean innovations specifically 
                selected to elevate your daily ritual. Proven formulas, 
                visible results.
              </p>
              
              <Link href="/shop" className="group inline-flex items-center gap-6">
                <div className="flex h-12 items-center border-b border-black pb-2 text-[11px] font-bold tracking-[0.3em] uppercase transition-all group-hover:gap-8">
                  Explore The Edit
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Visual Side - The 'Magazine' Shot */}
          <div className="w-full lg:w-3/5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-square md:aspect-[4/5] lg:aspect-[3/4] w-full"
            >
              {/* Background Geometric Accent */}
              <div className="absolute top-10 right-10 bottom-10 left-10 border border-stone-200 pointer-events-none" />
              
              <Image
                src="/hero-products.png"
                alt="Korean beauty products featuring skincare items"
                fill
                className="object-contain p-8 lg:p-16 z-10 drop-shadow-2xl"
                priority
              />
              
              {/* Floating Aesthetic Detail */}
              <div className="absolute bottom-10 -right-12 hidden lg:block opacity-80">
                <Image
                  src="/flower.png"
                  alt=""
                  width={250}
                  height={250}
                  className="-rotate-45 blur-[1px]"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}