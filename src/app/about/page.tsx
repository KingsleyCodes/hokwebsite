"use client";

import { Button } from "@/components/ui/button";
import Newsletter from "@/components/ui/landingPage/Newsletter";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <main className="bg-white text-black selection:bg-stone-100">
      {/* --- HERO SECTION: Clinical Luxe --- */}
      <section className="pt-24 pb-16 lg:pt-40 border-b border-stone-100">
        <div className="container mx-auto px-6">
          <h1 className="text-[11px] font-bold tracking-[0.5em] uppercase text-stone-400 mb-10 text-center lg:text-left">
            Established 2024 — Lagos, Nigeria
          </h1>
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <h2 className="text-6xl lg:text-[120px] font-light tracking-tighter leading-[0.85] text-stone-900">
              The House of <br />
              <span className="text-stone-300 italic">Korean Beauty.</span>
            </h2>
            <p className="max-w-[280px] text-[12px] leading-relaxed uppercase tracking-widest text-stone-500 font-medium pb-4 border-b border-stone-200">
              Nigeria’s #1 destination for trusted, dermatologist-backed K-Beauty innovation.
            </p>
          </div>
        </div>
      </section>

      {/* --- BRAND STORY: THE "WHY" --- */}
      <section id="story" className="py-24 lg:py-40">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 sticky top-32">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#2D1801] mb-6 block">Our Origin</span>
            <h3 className="text-4xl font-serif leading-tight text-stone-900 mb-8">
              Why Home of <br />Korean Beauty?
            </h3>
            <div className="w-12 h-px bg-stone-300 mb-8"></div>
          </div>
          
          <div className="lg:col-span-8">
            <div className="max-w-3xl">
              <p className="text-xl lg:text-2xl leading-relaxed font-light text-stone-800 mb-12">
                At Home of Korean Beauty (HOK), skincare isn&apos;t just a routine—it&apos;s a journey to confidence, radiance, and self-care. 
                We saw a growing need for authentic, high-quality Korean skincare in Nigeria, but finding the right products was a challenge.
              </p>
              <div className="space-y-8 text-stone-600 leading-loose font-light">
                <p>
                  Too many beauty lovers struggled with counterfeit products, lack of expert guidance, and skincare that wasn&apos;t tailored to our climate. 
                  That&apos;s why we created HOK—to be Nigeria&apos;s #1 destination for trusted K-beauty, offering only genuine, dermatologist-backed 
                  skincare that works for all skin types and concerns.
                </p>
                <p>
                  From hydrating essentials to targeted treatments for acne, hyperpigmentation, and aging, we bring the best of Korean innovation straight to you. 
                  We believe that everyone deserves access to skincare that is both effective and safe.
                </p>
              </div>

              {/* Aesthetic Image Mosaic */}
              <div className="mt-20 grid grid-cols-2 gap-px bg-stone-100 border border-stone-100">
                <div className="aspect-square relative overflow-hidden bg-white">
                  <Image src="/why-hok1.png" alt="HOK Narrative 1" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="aspect-square relative overflow-hidden bg-white">
                  <Image src="/why-hok2.png" alt="HOK Narrative 2" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="aspect-square relative overflow-hidden bg-white">
                  <Image src="/why-hok3.png" alt="HOK Narrative 3" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="aspect-square relative overflow-hidden bg-white">
                  <Image src="/why-hok4.png" alt="HOK Narrative 4" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BRAND PARTNERS: THE CURATION --- */}
      <section id="brand" className="bg-stone-50 py-24 border-y border-stone-100">
        <div className="container mx-auto px-6">
          <div className="mb-32 text-center lg:text-left">
            <h2 className="text-5xl lg:text-7xl font-serif tracking-tight mb-8">
              Our Curated <span className="text-stone-400 italic">Partners.</span>
            </h2>
            <p className="max-w-2xl text-stone-500 font-light text-lg">
              We went all the way to Korea to partner with brands that deliver real results for African skin and climates.
            </p>
          </div>

          <div className="space-y-px bg-stone-200 border border-stone-200">
            {/* 1. Derma Factory */}
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-white">
              <div className="relative aspect-square lg:aspect-auto overflow-hidden border-r border-stone-100 group">
                <Image src="/derma-factory.jpg" alt="Derma Factory" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              </div>
              <div className="p-12 lg:p-24 flex flex-col justify-center">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400 mb-6 block">01 / Derma Factory</span>
                <h3 className="text-4xl font-serif mb-8">Science meets skincare.</h3>
                <p className="text-stone-600 font-light leading-relaxed mb-10">
                  Powered by high-performance ingredients, Derma Factory delivers effective, no-nonsense solutions for every skin type. 
                  Whether it&apos;s hydration, brightening, or anti-aging, this brand focuses on pure, concentrated formulas that work.
                </p>
                <Link href="/shop?vendors=derma-factory">
                  <Button variant="outline" className="rounded-none border-stone-300 px-12 py-6 hover:bg-black hover:text-white uppercase text-[10px] tracking-widest font-bold">Explore Collection</Button>
                </Link>
              </div>
            </div>

            {/* 2. 12 Grabs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-white">
              <div className="p-12 lg:p-24 flex flex-col justify-center lg:order-1 order-2">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400 mb-6 block">02 / 12 Grabs</span>
                <h3 className="text-4xl font-serif mb-8">Simple, effective beauty.</h3>
                <p className="text-stone-600 font-light leading-relaxed mb-10">
                  12 Grabs harnesses the power of natural extracts and skin-friendly actives to keep your skin healthy, hydrated, and glowing—without irritation. 
                  Perfect for those who love gentle yet powerful skincare.
                </p>
                <Link href="/shop?vendors=12-grabs">
                  <Button variant="outline" className="rounded-none border-stone-300 px-12 py-6 hover:bg-black hover:text-white uppercase text-[10px] tracking-widest font-bold">Explore Collection</Button>
                </Link>
              </div>
              <div className="relative aspect-square lg:aspect-auto overflow-hidden border-l border-stone-100 group lg:order-2 order-1">
                <Image src="/12grabs.jpg" alt="12 Grabs" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 object-bottom" />
              </div>
            </div>

            {/* 3. COSRX */}
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-white">
              <div className="relative aspect-square lg:aspect-auto overflow-hidden border-r border-stone-100 group">
                <Image src="/corsx-image.png" alt="COSRX" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              </div>
              <div className="p-12 lg:p-24 flex flex-col justify-center">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400 mb-6 block">03 / COSRX</span>
                <h3 className="text-4xl font-serif mb-8">Minimalist formulas.</h3>
                <p className="text-stone-600 font-light leading-relaxed mb-10">
                  A cult-favorite known for its ingredient-focused solutions like snail mucin and centella. 
                  Whether you&apos;re battling acne or dryness, COSRX is designed to heal, soothe, and transform.
                </p>
                <Link href="/shop?vendors=cosrx">
                  <Button variant="outline" className="rounded-none border-stone-300 px-12 py-6 hover:bg-black hover:text-white uppercase text-[10px] tracking-widest font-bold">Explore Collection</Button>
                </Link>
              </div>
            </div>

            {/* 4. Lizara */}
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-white">
              <div className="p-12 lg:p-24 flex flex-col justify-center lg:order-1 order-2">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400 mb-6 block">04 / Lizara</span>
                <h3 className="text-4xl font-serif mb-8">Traditional herbal wisdom.</h3>
                <p className="text-stone-600 font-light leading-relaxed mb-10">
                  Luxury meets nature in Lizara&apos;s carefully crafted skincare. Infused with premium botanical extracts, 
                  it offers a balance of tradition and modern science to nourish and rejuvenate your skin.
                </p>
                <Link href="/shop?vendors=lizara">
                  <Button variant="outline" className="rounded-none border-stone-300 px-12 py-6 hover:bg-black hover:text-white uppercase text-[10px] tracking-widest font-bold">Explore Collection</Button>
                </Link>
              </div>
              <div className="relative aspect-square lg:aspect-auto overflow-hidden border-l border-stone-100 group lg:order-2 order-1">
                <Image src="/lizare-image.png" alt="Lizara" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOURCING: THE MANIFESTO --- */}
      <section id="source" className="py-24 lg:py-40">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-24">
            <h2 className="text-5xl lg:text-8xl font-serif tracking-tighter mb-10">How we <span className="italic">Source.</span></h2>
            <p className="text-xl font-light text-stone-500 leading-relaxed uppercase tracking-wide">
              Authentic Korean Skincare, Straight from Seoul to Nigeria. No fakes. No shortcuts. Just the real deal.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-stone-200 border border-stone-200">
            {/* Step 1 */}
            <div className="bg-white p-12 lg:p-20">
              <div className="text-4xl font-serif text-stone-200 mb-10">01</div>
              <h4 className="text-[12px] font-bold tracking-[0.4em] uppercase mb-6">Direct Partnerships</h4>
              <p className="text-stone-500 font-light leading-relaxed text-sm lg:text-base">
                We work directly with top K-beauty brands and authorized distributors. This ensures original formulations 
                (no watered-down versions), fresh stock, and fair pricing by removing middleman markups.
              </p>
            </div>
            {/* Step 2 */}
            <div className="bg-white p-12 lg:p-20">
              <div className="text-4xl font-serif text-stone-200 mb-10">02</div>
              <h4 className="text-[12px] font-bold tracking-[0.4em] uppercase mb-6">Verified Authenticity</h4>
              <p className="text-stone-500 font-light leading-relaxed text-sm lg:text-base">
                Every product goes through strict verification checks. We track batch and serial numbers and verify 
                ingredient lists. We don&apos;t sell expired or near-expiry products.
              </p>
            </div>
            {/* Step 3 */}
            <div className="bg-white p-12 lg:p-20">
              <div className="text-4xl font-serif text-stone-200 mb-10">03</div>
              <h4 className="text-[12px] font-bold tracking-[0.4em] uppercase mb-6">Ethical Standards</h4>
              <p className="text-stone-500 font-light leading-relaxed text-sm lg:text-base">
                We believe in skin health, not skin bleaching. We only stock brands that are cruelty-free, 
                dermatologist-approved, and free from harmful chemicals.
              </p>
            </div>
            {/* Step 4 */}
            <div className="bg-white p-12 lg:p-20">
              <div className="text-4xl font-serif text-stone-200 mb-10">04</div>
              <h4 className="text-[12px] font-bold tracking-[0.4em] uppercase mb-6">Secure Logistics</h4>
              <p className="text-stone-500 font-light leading-relaxed text-sm lg:text-base">
                We handle logistics ourselves to guarantee proper storage conditions. No heat damage or contamination. 
                Fast, secure shipping straight to your doorstep across Nigeria.
              </p>
            </div>
          </div>

          <div className="mt-24 text-center">
            <h3 className="text-2xl font-serif mb-10 italic text-stone-400">Your glow starts with trust.</h3>
            <div className="flex justify-center gap-12">
               <div className="text-center">
                 <p className="text-3xl font-serif">100%</p>
                 <p className="text-[10px] uppercase tracking-widest text-stone-400">Authentic</p>
               </div>
               <div className="text-center">
                 <p className="text-3xl font-serif">0%</p>
                 <p className="text-[10px] uppercase tracking-widest text-stone-400">Harmful Chemicals</p>
               </div>
               <div className="text-center">
                 <p className="text-3xl font-serif">Direct</p>
                 <p className="text-[10px] uppercase tracking-widest text-stone-400">From Seoul</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CALL: THE SHOP --- */}
      <section className="bg-[#2D1801] py-24 lg:py-40 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-white text-4xl lg:text-7xl font-serif mb-12 italic">Ready to transform your skin?</h2>
          <Link href="/shop">
            <Button size="lg" className="rounded-none bg-white text-[#2D1801] hover:bg-stone-200 px-16 py-8 font-bold tracking-[0.3em] uppercase text-xs">
              Shop the Collection
            </Button>
          </Link>
        </div>
      </section>

      {/* --- FOOTER ELEMENTS --- */}
      <section className="container mx-auto py-24">
        <Newsletter />
      </section>
    </main>
  );
};

export default About;