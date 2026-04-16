"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Components
import ShopOurProducts from "@/components/ShopOurProducts";
import EnhancedCarousel from "@/components/ui/landingPage/Carousel";
import NewArrival from "@/components/ui/landingPage/NewArrival";
import ProductCategories from "@/components/ui/landingPage/ProductCategories";
import { carouselImages } from "@/lib/constants";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#1A1A1A]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full">
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 7000 })]}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {/* SLIDE 1: Left Aligned Editorial */}
            <CarouselItem className="relative h-[80vh] min-h-[600px] w-full pl-0">
              <Image
                src="/lizare-image-2.png" 
                alt="Luxury Skincare"
                fill
                className="object-cover object-center"
                priority
              />
              
              {/* Vibe Check: Subtle Black Overlay (25% opacity) + Gradient for Text Legibility */}
              <div className="absolute inset-0 bg-black/25" /> 
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
              
              <div className="container relative mx-auto h-full px-6 lg:px-12">
                <div className="flex h-full flex-col justify-center items-start lg:w-1/2">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <span className="text-[12px] font-bold tracking-[0.3em] text-white uppercase mb-4 block">
                      The Korean Beauty Standard
                    </span>
                    <h1 className="font-valky text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-8">
                      Radiance <br /> <span className="italic">Redefined</span>
                    </h1>
                    <div className="flex flex-wrap gap-4">
                      <Link href="/shop">
                        <button className="h-14 border border-white bg-white px-10 text-[11px] font-bold tracking-[0.2em] text-black uppercase transition-all hover:bg-transparent hover:text-white">
                          SHOP COLLECTION
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>

            {/* SLIDE 2: Center Aligned Brand Focus */}
            <CarouselItem className="relative h-[80vh] min-h-[600px] w-full pl-0">
              <Image
                src={carouselImages[0]?.src || "/lizare-image-2.png"}
                alt="New Collections"
                fill
                className="object-cover"
              />
              
              {/* Vibe Check: Center-weighted Gradient for the centered text */}
              <div className="absolute inset-0 bg-black/30" /> 
              
              <div className="container relative mx-auto h-full px-6 lg:px-12">
                <div className="flex h-full flex-col justify-center items-center text-center">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                  >
                    <h2 className="font-valky text-5xl md:text-7xl lg:text-8xl text-white mb-6">
                      {carouselImages[0]?.name || "New Arrivals"}
                    </h2>
                    <p className="mx-auto max-w-lg text-[15px] tracking-wide text-white mb-10 font-inter">
                      Clinical results meet botanical luxury. Discover the latest in dermatological innovation.
                    </p>
                    <Link href="/shop">
                      <button className="h-14 border border-white px-12 text-[11px] font-bold tracking-[0.2em] text-white uppercase transition-all hover:bg-white hover:text-black">
                        DISCOVER MORE
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          
          {/* Refined Navigation Arrows */}
          <div className="absolute bottom-10 right-10 hidden lg:flex gap-2 z-20">
            <CarouselPrevious className="static h-10 w-10 translate-y-0 rounded-none border border-white/50 bg-transparent text-white hover:bg-white hover:text-black transition-all" />
            <CarouselNext className="static h-10 w-10 translate-y-0 rounded-none border border-white/50 bg-transparent text-white hover:bg-white hover:text-black transition-all" />
          </div>
        </Carousel>
      </section>

      {/* --- THE TRUST ROW --- */}
      <div className="w-full border-b border-gray-100 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap justify-between items-center gap-4 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
            <span className="flex items-center gap-2 italic text-[#0070bb]">● 100% AUTHENTIC</span>
            <span className="hidden md:block">|</span>
            <span>WORLDWIDE SHIPPING</span>
            <span className="hidden md:block">|</span>
            <span>DERMATOLOGIST TESTED</span>
            <span className="hidden md:block">|</span>
            <span>SECURE CHECKOUT</span>
          </div>
        </div>
      </div>

      {/* --- CONTENT BLOCKS --- */}
      <div className="space-y-32 py-24">
        
        {/* Trending Section */}
        <section className="w-full">
          <div className="container mx-auto px-6 mb-12 text-center">
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#0070bb] uppercase mb-3 block">Most Loved</span>
            <h3 className="font-valky text-4xl md:text-5xl">The Trending Edit</h3>
          </div>
          <EnhancedCarousel />
        </section>

        {/* Clinical Care Grid */}
        <section className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center justify-center mb-16 text-center">
            <h2 className="font-valky text-4xl md:text-6xl mb-4">Shop Clinical Care</h2>
            <div className="h-px w-20 bg-[#0070bb] mb-6"></div>
            <p className="max-w-xl text-gray-500 text-[14px] leading-relaxed">
              Precision skincare formulated with advanced active ingredients to target your specific skin concerns.
            </p>
          </div>
          <ShopOurProducts />
          <div className="mt-16 flex justify-center">
             <Link href="/shop">
                <button className="group flex items-center gap-4 border-b border-black pb-2 text-[11px] font-bold tracking-[0.2em] uppercase transition-all hover:text-[#0070bb] hover:border-[#0070bb]">
                  Explore All Products <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </button>
             </Link>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-[#f4f7f9] py-24">
           <div className="container mx-auto px-6">
              <ProductCategories />
           </div>
        </section>

        {/* New Arrival Section */}
        <section className="bg-white py-24 border-t border-gray-100">
          <div className="container mx-auto px-6">
            <NewArrival />
          </div>
        </section>
      </div>

      {/* Floating Partner CTA */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link href="/wholesale">
          <button className="flex h-14 items-center gap-3 bg-black px-8 text-[11px] font-bold tracking-[0.2em] text-white shadow-2xl transition-all hover:bg-[#0070bb]">
            PARTNER WITH US
          </button>
        </Link>
      </div>

    </main>
  );
}