"use client";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/formatPrice";
import { useSearchProducts } from "@/utils/hooks/useSearchProducts";
import { LoaderCircle, Search, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

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
    if (!query) return;
    const handler = setTimeout(() => setDebouncedQuery(query), 1000);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch search results using the debounced query
  const { data: results = [], isLoading } = useSearchProducts(debouncedQuery);

  // Remove focus if overlay is clicked
  const handleOverlayClick = () => {
    setFocused(false);
    inputRef.current?.blur();
  };

  return (
    <>
      {focused && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={handleOverlayClick}
        />
      )}
      <div className="relative z-50">
        <div
          className={cn(
            "flex h-10 w-full items-center rounded-xs bg-neutral-400/40 p-2 lg:w-96",
            {
              "bg-white": focused,
            },
          )}
        >
          {isLoading && query.length > 0 ? (
            <LoaderCircle className="ml-2 size-5 animate-spin text-black" />
          ) : (
            <Search className="ml-2 size-5 text-black" />
          )}
          <Input
            ref={inputRef}
            type="text"
            placeholder="type to search..."
            className="h-full w-full border-none bg-transparent text-xl font-bold text-gray-700 shadow-none placeholder:font-semibold placeholder:italic focus:border-none focus:shadow-none focus:ring-0 focus:outline-none focus-visible:ring-0"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            tabIndex={focused ? 0 : -1}
          />
          {focused && query.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
            >
              <X className="h-5 w-5 text-gray-500" strokeWidth={3} />
            </Button>
          )}
        </div>
        {!isLoading && focused && query.length > 0 && (
          <div className="absolute left-0 mt-2 w-full rounded-sm bg-black/50 p-2 shadow-lg">
            {results.length === 0 ? (
              <div className="py-2 text-center text-white">
                No results found.
              </div>
            ) : (
              results.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded p-2 hover:bg-neutral-600"
                  onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.preventDefault(); // Prevent input blur
                    window.location.href = `/shop/${item.handle}`; // Navigate manually
                    setFocused(false);
                    setQuery(""); // Clear query after navigation
                  }}
                >
                  <Image
                    src={item.featuredImage?.url}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="h-10 w-10 rounded"
                  />
                  <div className="flex flex-col gap-2">
                    <h2 className="text-base font-semibold text-white">
                      {item.title}
                    </h2>
                    <p className="text-sm font-semibold text-white">
                      {formatPrice(
                        item.priceRange?.maxVariantPrice.amount || "0",
                        {
                          currencyCode:
                            item.priceRange?.maxVariantPrice.currencyCode,
                        },
                      )}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductSearch;
