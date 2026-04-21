"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useFetchAllCollections } from "@/utils/hooks/useFetchAllCollections";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function EnhancedCarousel() {
  const { data: collections, isLoading, error } = useFetchAllCollections();

  if (isLoading) {
    return (
      <section className="container mx-auto px-6 py-24">
        <div className="flex h-[400px] w-full flex-col items-center justify-center bg-stone-50/50">
          <Loader2 className="mb-4 h-8 w-8 animate-spin text-[#73512C]" />
          <p className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase">
            Loading Collections
          </p>
        </div>
      </section>
    );
  }

  if (error) return null;

  // Shared Card Component to keep design consistent
  const CollectionCard = ({ collection }: { collection: any }) => (
    <Link
      href={`/shop?collections=${collection.handle}`}
      className="group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
        {collection.image ? (
          <Image
            src={collection.image.url}
            alt={collection.image.altText || collection.title}
            fill
            className="object-cover  duration-1000 ease-in-out group-hover:scale-110 group-hover:grayscale-0"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4 text-center">
            <span className="font-serif text-sm text-stone-300 uppercase italic">
              {collection.title}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
      </div>

      <div className="mt-6 text-center">
        <h3 className="font-serif text-lg md:text-xl text-stone-900 transition-colors group-hover:text-[#73512C]">
          {collection.title}
        </h3>
        <div className="mt-2 inline-block border-b border-stone-100 pb-1 text-[8px] md:text-[9px] font-bold tracking-[0.2em] text-stone-400 uppercase transition-all group-hover:border-[#73512C] group-hover:text-[#73512C]">
          Explore Range
        </div>
      </div>
    </Link>
  );

  return (
    <section className="container mx-auto px-6 py-16 lg:py-24">
      {/* Editorial Header */}
      <div className="mb-12 md:mb-16 text-center">
        <span className="mb-4 block text-[11px] font-bold tracking-[0.4em] text-[#73512C] uppercase">
          Curated Ranges
        </span>
        <h2 className="font-valky text-5xl md:text-7xl lg:text-8xl">
          The <span className="italic font-light text-stone-500">Collections</span>
        </h2>
        <div className="mx-auto mt-8 h-px w-24 bg-stone-200"></div>
      </div>

      {/* MOBILE VIEW: Visible Grid (2 columns) */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:hidden">
        {collections?.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>

      {/* DESKTOP/TABLET VIEW: Carousel */}
      <div className="hidden md:block w-full">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {collections?.map((collection) => (
              <CarouselItem
                key={collection.id}
                className="pl-4 md:basis-1/3 lg:basis-1/4"
              >
                <CollectionCard collection={collection} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}