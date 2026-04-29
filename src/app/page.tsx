"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";

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
import ShopByConcern from "@/components/ui/landingPage/ShopByConcern";

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
            {/* SLIDE 1 */}
            <CarouselItem className="relative h-[80vh] min-h-[600px] w-full pl-0">
              <Image
                src="/lizare-image-2.png" 
                alt="Luxury Skincare"
                fill
                className="object-cover object-center"
                priority
              />
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
                    <Link href="/shop">
                      <button className="h-14 border border-white bg-white px-10 text-[11px] font-bold tracking-[0.2em] text-black uppercase transition-all hover:bg-transparent hover:text-white">
                        SHOP COLLECTION
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>

            {/* SLIDE 2 */}
            <CarouselItem className="relative h-[80vh] min-h-[600px] w-full pl-0">
              <Image
                src={carouselImages[0]?.src || "/lizare-image-2.png"}
                alt="New Collections"
                fill
                className="object-cover"
              />
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
          
          <div className="absolute bottom-10 right-10 hidden lg:flex gap-2 z-20">
            <CarouselPrevious className="static h-10 w-10 translate-y-0 rounded-none border border-white/50 bg-transparent text-white hover:bg-white hover:text-black transition-all" />
            <CarouselNext className="static h-10 w-10 translate-y-0 rounded-none border border-white/50 bg-transparent text-white hover:bg-white hover:text-black transition-all" />
          </div>
        </Carousel>
      </section>

      {/* --- MARQUEE SHOP BY CONCERN: Laps directly under Hero --- */}
      <ShopByConcern />

      {/* --- CONTENT BLOCKS --- */}
      <div className="space-y-32 py-24">
        
        {/* Trending Section */}
        <section className="w-full">
        
          <EnhancedCarousel />
        </section>

        {/* Clinical Care Grid */}
        <section className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center justify-center mb-16 text-center">
            <h2 className="font-valky text-4xl md:text-6xl mb-4">Shop Clinical Care</h2>
            <div className="h-px w-20 bg-stone-900 mb-6"></div>
            <p className="max-w-xl text-stone-500 text-[14px] leading-relaxed italic">
              Precision skincare formulated with advanced active ingredients to target your specific skin concerns.
            </p>
          </div>
          <ShopOurProducts />
          <div className="mt-16 flex justify-center">
             <Link href="/shop">
                <button className="group flex items-center gap-4 border-b border-black pb-2 text-[11px] font-bold tracking-[0.2em] uppercase transition-all hover:text-[#73512C] hover:border-[#73512C]">
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
        <section className="bg-white py-24 border-t border-stone-100">
          <div className="container mx-auto px-6">
            <NewArrival />
          </div>
        </section>
      </div>

      {/* Floating WhatsApp CTA */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="bg-white px-4 py-3 shadow-2xl border border-stone-100 rounded-2xl rounded-br-none mb-1 hidden md:block"
        >
          <p className="text-[11px] font-medium text-stone-600 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            We&apos;re online. How can we help?
          </p>
        </motion.div>

        <Link 
          href="https://wa.me/2347065095024" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative flex h-16 w-16 items-center justify-center bg-[#73512C] text-white rounded-full shadow-[0_20px_50px_rgba(115,81,44,0.3)] transition-all hover:scale-110"
        >
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">1</span>
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 transition-transform group-hover:rotate-12">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </Link>
      </div>
    </main>
  );
}