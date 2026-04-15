"use client";

import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/shopify";
import { Products } from "@/lib/shopify/types";
import { formatPrice } from "@/utils/formatPrice";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const NewArrival = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["featuredProducts", "anua"],
    queryFn: async () => {
      const { products: fetchedProducts } = await getProducts({
        pageSize: 4,
        searchParams: {
          vendors: "anua",
        },
      });
      return fetchedProducts;
    },
  });

  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Editorial Heading Section */}
        <div className="mb-16 text-center">
          <span className="text-[11px] font-bold tracking-[0.4em] text-[#0070bb] uppercase mb-4 block">
            The Latest Innovation
          </span>
          <h2 className="font-valky text-4xl md:text-6xl lg:text-7xl text-inherit mb-6">
            New Arrivals
          </h2>
          <div className="mx-auto h-px w-24 bg-current opacity-20"></div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] w-full bg-stone-200/20" />
                <div className="mt-4 h-4 w-3/4 bg-stone-200/20" />
                <div className="mt-2 h-4 w-1/4 bg-stone-200/20" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
            {products?.map((product: Products, index: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <Link href={`/shop/${product.handle}`} className="block">
                  {/* Image: Frameless & Sophisticated */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                    {product?.featuredImage && (
                      <Image
                        src={product?.featuredImage.url}
                        alt={product?.featuredImage.altText || product.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    )}
                    {/* Fresh-style Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white px-3 py-1 text-[9px] font-bold tracking-widest uppercase text-black">
                        NEW
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="mt-6 flex flex-col items-center text-center">
                    <h3 className="text-[12px] font-bold tracking-widest uppercase mb-2 line-clamp-1 group-hover:text-[#0070bb] transition-colors">
                      {product.title}
                    </h3>
                    
                    {/* Star Rating - Minimized */}
                    <div className="mb-3 flex justify-center opacity-60 scale-75 grayscale">
                      <Image src="/stars.png" alt="stars" width={80} height={16} />
                    </div>

                    <p className="text-[14px] font-medium tracking-tight opacity-80">
                      {formatPrice(product.price, {
                        currencyCode: product.currencyCode,
                      })}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* View More Button: Sharp & Modern */}
        <div className="mt-20 text-center">
          <Link href="/shop" className="inline-block group">
            <button className="relative h-14 border border-current px-12 text-[11px] font-bold tracking-[0.3em] uppercase transition-all hover:bg-white hover:text-black overflow-hidden">
               <span className="relative z-10">VIEW ALL ARRIVALS</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrival;