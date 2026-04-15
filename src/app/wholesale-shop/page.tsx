import Filters from "@/components/shop/filters";
import { Badge } from "@/components/ui/badge";
import Pagination from "@/components/ui/pagination";
import ProductGridSkeleton from "@/components/ui/ProductGridSkeleton";
import { getProducts } from "@/lib/shopify";
import { Products } from "@/lib/shopify/types";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

interface WholesaleShopPageSearchParams {
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

// 1. We create a wrapper component to handle the async data fetching
async function WholesaleProductContent({
  searchParams,
}: {
  searchParams?: WholesaleShopPageSearchParams;
}) {
  const pageSize = 15;
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
    return `/wholesale-shop?${params.toString()}`;
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
    return paramString ? `/wholesale-shop?${paramString}` : "/wholesale-shop";
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products && products.length > 0 ? (
          products.map((product: Products) => (
            <Link
              key={product.id}
              href={`/wholesale-shop/${product.handle}`}
              className="group"
            >
              <div className="rounded border p-4 transition-shadow duration-200 group-hover:shadow-md h-full flex flex-col">
                {product.featuredImage && (
                  <div className="relative h-48 w-full mb-2">
                    <Image
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <Badge
                  variant="default"
                  className="my-2 w-fit rounded-3xl bg-[#73512C] px-3 py-1 text-white text-[10px] uppercase tracking-wider"
                >
                  Buy 5 get 5% off
                </Badge>
                <div className="flex-grow">
                  <h3 className="text-sm font-medium line-clamp-2">
                    {product.title}
                  </h3>
                </div>
                <p className="font-bold mt-2 text-lg">
                  {formatPrice(product.price, {
                    currencyCode: product.currencyCode,
                  })}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-stone-500">No products found matching your filters.</p>
          </div>
        )}
      </div>

      <Pagination
        hasNextPage={pageInfo.hasNextPage}
        hasPreviousPage={pageInfo.hasPreviousPage}
        startCursor={pageInfo.startCursor}
        endCursor={pageInfo.endCursor}
        buildUrl={buildPaginationUrl}
        getBaseUrl={getBasePageUrl}
      />
    </>
  );
}

// 2. The Main Page Component
// We wrap both Filters and Product Content in Suspense
export default function WholesaleShop({
  searchParams,
}: {
  searchParams?: WholesaleShopPageSearchParams;
}) {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-16">
      <h1 className="text-3xl font-serif mb-10">Wholesale Collection</h1>
      
      <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
        {/* Left Column: Filters */}
        <aside className="md:col-span-1">
          <Suspense fallback={<div className="h-64 bg-stone-50 animate-pulse rounded" />}>
            <Filters />
          </Suspense>
        </aside>

        {/* Right Column: Products */}
        <main className="md:col-span-3">
          <Suspense fallback={<ProductGridSkeleton />}>
            <WholesaleProductContent searchParams={searchParams} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}