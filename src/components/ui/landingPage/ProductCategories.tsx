"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Cleansers",
    src: "/cleaners.png",
    href: "/shop?category=cleansers",
    description: "Pure. Gentle. Effective.",
  },
  {
    title: "Toners",
    src: "/toner.jpeg",
    href: "/shop?category=toner",
    description: "Balance & Prep.",
  },
];

export default function ProductCategories() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="font-valky text-3xl md:text-5xl tracking-tight text-black">
            Shop by <span className="italic">Category</span>
          </h2>
          <div className="mt-4 flex justify-center">
             <div className="h-px w-16 bg-[#0070bb]" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative h-[500px] w-full overflow-hidden bg-stone-50"
            >
              <Link href={cat.href} className="relative block h-full w-full">
                {/* Image Component */}
                <Image
                  src={cat.src}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  priority={index === 0}
                />

                {/* Editorial Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                {/* Content - Fresh Minimalist Style */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-center text-white">
                  <span className="mb-2 text-[10px] font-bold tracking-[0.4em] uppercase opacity-90">
                    Explore
                  </span>
                  <h3 className="font-valky text-4xl md:text-5xl mb-6 tracking-wide">
                    {cat.title}
                  </h3>
                  
                  {/* The Sharp-Edged Button */}
                  <div className="overflow-hidden">
                    <div className="translate-y-0 transition-transform duration-500 group-hover:-translate-y-full">
                      <div className="flex h-10 items-center border border-white px-8 text-[11px] font-bold tracking-[0.2em] uppercase">
                        Shop Now
                      </div>
                      <div className="flex h-10 items-center bg-white px-8 text-[11px] font-bold tracking-[0.2em] uppercase text-black">
                        Shop Now
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}