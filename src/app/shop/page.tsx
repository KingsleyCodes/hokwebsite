"use client";

import Filters from "@/components/shop/filters";
import Pagination from "@/components/ui/pagination";
import ProductGridSkeleton from "@/components/ui/ProductGridSkeleton";
import { getProducts } from "@/lib/shopify";
import { Products } from "@/lib/shopify/types";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

// Updated search params interface
interface ShopPageSearchParams {
  minPrice?: string;
  maxPrice?: string;
  collections?: string | string[];
  vendors?: string | string[];
  productType?: string | string[];
  tags?: string | string[];
  category?: string | string[];
  after?: string;
  before?: string;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: ShopPageSearchParams;
}) {
  const pageSize = 20;

  const { products, pageInfo } = await getProducts({
    searchParams,
    pageSize,
  });

  const buildPaginationUrl = (
    cursor: string,
    type: "before" | "after",
  ): string => {
    const params = new URLSearchParams();
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (key !== "before" && key !== "after") {
          if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, v));
          } else if (value) {
            params.append(key, value);
          }
        }
      });
    }
    params.set(type, cursor);
    return `/shop?${params.toString()}`;
  };

  const getBasePageUrl = (): string => {
    const params = new URLSearchParams();
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (key !== "before" && key !== "after") {
          if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, v));
          } else if (value) {
            params.append(key, value);
          }
        }
      });
    }
    const paramString = params.toString();
    return paramString ? `/shop?${paramString}` : "/shop";
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Editorial Header */}
      <header className="border-b border-stone-100 py-12 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <span className="mb-4 text-[11px] font-bold tracking-[0.4em] text-[#73512C] uppercase">
              Curated Selection
            </span>
            <h1 className="font-valky text-5xl md:text-7xl text-stone-900">
              The <span className="italic font-light">Shop</span>
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Sidebar Filters - Sticky and refined */}
          <aside className="lg:col-span-3">
            <div className="sticky top-32">
              <div className="mb-6 border-b border-stone-900 pb-2">
                <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-900">
                  Refine Search
                </h2>
              </div>
              <Filters />
            </div>
          </aside>

          {/* Product Grid Area */}
          <section className="lg:col-span-9">
            <Suspense fallback={<ProductGridSkeleton />}>
              <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {products && products.length > 0 ? (
                  products.map((product: Products) => (
                    <Link
                      key={product.id}
                      href={`/shop/${product.handle}`}
                      className="group flex flex-col"
                    >
                      {/* Image Container with Luxury Hover */}
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-50">
                        {product.featuredImage && (
                          <Image
                            src={product.featuredImage.url}
                            alt={product.featuredImage.altText || product.title}
                            fill
                            className="object-cover duration-700 ease-in-out group-hover:scale-105 "
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        )}
                        {/* Quick View / Hover Overlay */}
                        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-white/90 py-4 backdrop-blur-sm transition-transform duration-500 group-hover:translate-y-0">
                          <span className="text-[10px] font-bold tracking-[0.2em] text-[#73512C] uppercase">
                            View Details
                          </span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="mt-6 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-serif text-lg leading-tight text-stone-900 group-hover:text-[#73512C] transition-colors">
                            {product.title}
                          </h3>
                        </div>
                        <p className="text-[13px] font-bold tracking-widest text-stone-400">
                          {formatPrice(product.price, {
                            currencyCode: product.currencyCode,
                          })}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full py-24 text-center">
                    <p className="font-serif text-2xl text-stone-300 italic">
                      No products found matching your criteria.
                    </p>
                  </div>
                )}
              </div>

              {/* Refined Pagination Section */}
              <div className="mt-20 border-t border-stone-100 pt-12">
                <Pagination
                  hasNextPage={pageInfo.hasNextPage}
                  hasPreviousPage={pageInfo.hasPreviousPage}
                  startCursor={pageInfo.startCursor}
                  endCursor={pageInfo.endCursor}
                  buildUrl={buildPaginationUrl}
                  getBaseUrl={getBasePageUrl}
                />
              </div>
            </Suspense>
          </section>
        </div>
      </div>
    </main>
  );
}