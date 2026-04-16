"use client";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/formatPrice";
import { useSearchProducts } from "@/utils/hooks/useSearchProducts";
import { LoaderCircle, Search, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./input";
import Link from "next/link";

const ProductSearch = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    // Only debounce if there is actually a query
    const handler = setTimeout(() => {
      if (query.trim().length > 0) setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  const { data: results = [], isLoading } = useSearchProducts(debouncedQuery);

  const handleOverlayClick = () => {
    setFocused(false);
    inputRef.current?.blur();
  };

  return (
    <>
      {/* 1. FIXED: Only show overlay on Desktop (lg and up) to prevent mobile hijacking */}
      {focused && (
        <div
          className="hidden lg:block fixed inset-0 z-40 bg-white/80 backdrop-blur-sm transition-all duration-500"
          onClick={handleOverlayClick}
        />
      )}

      <div className="relative z-50 w-full">
        {/* Input Field Container */}
        <div
          className={cn(
            "flex h-11 w-full items-center border-b border-stone-200 bg-transparent transition-all duration-300 lg:w-[400px]",
            {
              "border-stone-900": focused,
            },
          )}
        >
          {isLoading && query.length > 0 ? (
            <LoaderCircle className="size-4 animate-spin text-stone-400" />
          ) : (
            <Search className="size-4 text-stone-400 stroke-[1.5px]" />
          )}
          
          <Input
            ref={inputRef}
            type="text"
            placeholder="SEARCH PRODUCTS..."
            className="h-full w-full border-none bg-transparent text-[11px] font-bold tracking-[0.2em] text-stone-900 shadow-none placeholder:text-stone-300 placeholder:italic placeholder:tracking-widest focus-visible:ring-0"
            onFocus={() => setFocused(true)}
            onBlur={() => {
              // Delay blur slightly so clicks on results register first
              setTimeout(() => setFocused(false), 200);
            }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />

          {query.length > 0 && (
            <button
              className="p-1 hover:text-red-500 transition-colors"
              onMouseDown={(e) => e.preventDefault()} // Prevents blur before click
              onClick={() => {
                setQuery("");
                setDebouncedQuery("");
                inputRef.current?.focus();
              }}
            >
              <X className="h-4 w-4 stroke-[1.2px]" />
            </button>
          )}
        </div>

        {/* 2. FIXED: Improved Results Logic for Mobile */}
        {focused && query.length > 1 && (
          <div className={cn(
            "absolute left-0 mt-px w-full border border-stone-100 bg-white shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300",
            "lg:w-[450px]"
          )}>
            {isLoading ? (
               <div className="p-8 text-center text-[10px] tracking-widest text-stone-400 uppercase">Searching...</div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center text-[10px] tracking-widest text-stone-400 uppercase">
                No products found
              </div>
            ) : (
              <div className="max-h-[60vh] overflow-y-auto divide-y divide-stone-50">
                <div className="px-4 py-2 bg-stone-50/50 text-[9px] font-bold tracking-[0.2em] text-stone-400 uppercase">
                  Suggestions
                </div>
                {results.map((item) => (
                  <Link
                    key={item.id}
                    href={`/shop/${item.handle}`}
                    className="flex items-center gap-4 p-4 hover:bg-stone-50 transition-colors group"
                    onClick={() => {
                      setFocused(false);
                      setQuery("");
                    }}
                  >
                    <div className="relative h-14 w-14 overflow-hidden bg-stone-100 flex-shrink-0">
                      <Image
                        src={item.featuredImage?.url}
                        alt={item.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-xs font-serif text-stone-900 leading-tight">
                        {item.title}
                      </h2>
                      <p className="text-[10px] font-bold tracking-widest text-stone-400">
                        {formatPrice(
                          item.priceRange?.maxVariantPrice.amount || "0",
                          {
                            currencyCode:
                              item.priceRange?.maxVariantPrice.currencyCode,
                          },
                        )}
                      </p>
                    </div>
                  </Link>
                ))}
                <Link 
                  href={`/shop?q=${query}`}
                  className="block p-4 text-center text-[10px] font-bold tracking-[0.2em] uppercase text-[#0070bb] hover:bg-stone-50"
                  onClick={() => setFocused(false)}
                >
                  View all results
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductSearch;