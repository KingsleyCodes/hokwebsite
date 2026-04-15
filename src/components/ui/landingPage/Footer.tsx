"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Send } from "lucide-react";

const Footer = () => {
  return (
    // Using a sophisticated, deep warm brown [#2A1F18] for that Apothecary feel
    <footer className="w-full bg-[#2A1F18] text-white pt-20 pb-10">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-3 lg:grid-cols-5">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="inline-block transition-opacity hover:opacity-80">
              <Image
                src="/hok-logo-white.svg" 
                alt="HOK Beauty"
                width={140}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <div className="max-w-sm">
              <h3 className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4 text-[#D4AF37]">
                Join the HOK Tribe
              </h3>
              <p className="text-[13px] text-stone-300 mb-6 leading-relaxed font-inter">
                Subscribe to receive skincare tips, personalized routines, and exclusive access to new Korean beauty arrivals.
              </p>
              <form className="relative flex border-b border-stone-500 pb-2 transition-colors focus-within:border-white">
                <input 
                  type="email" 
                  placeholder="ENTER YOUR EMAIL" 
                  className="w-full bg-transparent text-[11px] font-medium tracking-widest outline-none placeholder:text-stone-500 text-white"
                />
                <button type="submit" aria-label="Subscribe" className="hover:scale-110 transition-transform">
                  <Send className="h-4 w-4 text-white" strokeWidth={1.5} />
                </button>
              </form>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="space-y-6">
            <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/50">Information</h2>
            <ul className="space-y-4">
              {["About Us", "Brands", "Shop", "Skin Algorithm"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(" ", "-")}`} className="text-[12px] text-stone-200 hover:text-[#D4AF37] transition-colors tracking-wide">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/50">Wholesale</h2>
            <ul className="space-y-4">
              {["Shop Wholesale", "Wholesaler Terms", "Join The HOK Tribe"].map((item) => (
                <li key={item}>
                  <Link href="/wholesale" className="text-[12px] text-stone-200 hover:text-[#D4AF37] transition-colors tracking-wide">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/50">Follow Us</h2>
            <div className="flex flex-wrap gap-5">
              {[
                { name: "instagram", url: "https://www.instagram.com/thehomeofkoreanproducts/" },
                { name: "facebook", url: "https://www.facebook.com/share/1EK81bfAFp/" },
                { name: "whatsapp", url: "https://whatsapp.com/channel/0029VbAMxdn9hXF5cKnHxz12" },
                { name: "tiktok", url: "https://www.tiktok.com/@thehomeofkoreanproducts" }
              ].map((social) => (
                <Link key={social.name} href={social.url} className="opacity-70 hover:opacity-100 hover:brightness-200 transition-all">
                  <Image 
                    src={`/${social.name}.svg`} 
                    alt={social.name} 
                    width={18} 
                    height={18} 
                    className="invert" // Inverts black icons to white
                  />
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-white/10">
              <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/50 mb-2">Contact</h2>
              <Link href="/contact" className="text-[12px] text-stone-200 hover:text-[#D4AF37]">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between border-t border-white/10 pt-10 md:flex-row">
          <p className="text-[10px] tracking-[0.15em] text-stone-500 font-medium uppercase">
            © 2026 HOME OF KOREAN BEAUTY. ALL RIGHTS RESERVED.
          </p>
          <div className="mt-4 flex gap-8 md:mt-0">
            {["Privacy", "Terms", "Sitemap"].map((policy) => (
              <Link key={policy} href={`/${policy.toLowerCase()}`} className="text-[10px] tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors">
                {policy}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;