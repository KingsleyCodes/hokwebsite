"use client";

import { getProducts } from "@/lib/shopify";
import { Products } from "@/lib/shopify/types";
import { formatPrice } from "@/utils/formatPrice";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ShopOurProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const { products: fetchedProducts } = await getProducts({
        pageSize: 4,
      });
      return fetchedProducts;
    },
  });

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] w-full bg-gray-100" />
                <div className="mt-4 h-4 w-3/4 bg-gray-100" />
                <div className="mt-2 h-4 w-1/4 bg-gray-100" />
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
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative"
              >
                <Link href={`/shop/${product.handle}`} className="block">
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F9F9F9]">
                    {product?.featuredImage && (
                      <Image
                        src={product?.featuredImage.url}
                        alt={product?.featuredImage.altText || product.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    )}
                    
                    {/* Fresh-style Hover Quick Add (Desktop) */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/90 p-3 transition-transform duration-300 group-hover:translate-y-0 hidden lg:block">
                      <button className="w-full border border-black py-2 text-[10px] font-bold tracking-[0.1em] uppercase hover:bg-black hover:text-white transition-colors">
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="mt-5 flex flex-col items-center text-center px-2">
                    <span className="mb-2 text-[10px] font-bold tracking-widest text-[#0070bb] uppercase">
                      Featured
                    </span>
                    <h3 className="mb-2 text-[13px] font-medium leading-tight tracking-wide text-black uppercase lg:text-[14px]">
                      {product.title}
                    </h3>
                    
                    {/* Stars - Cleaned up to match Fresh minimalist rating style */}
                    <div className="mb-2 flex justify-center opacity-80 scale-75">
                      <Image src="/stars.png" alt="rating" width={80} height={16} />
                    </div>

                    <p className="text-[14px] font-semibold text-gray-900 tracking-tight">
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
      </div>
    </section>
  );
}