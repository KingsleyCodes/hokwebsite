"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { testimonials } from "@/lib/data";
import Image from "next/image";
import { Star } from "lucide-react";

const Testimonial = () => {
  return (
    <section className="container mx-auto py-20">
      {/* Heading */}
      <div className=" text-center">
        <h1 className="font-playfair text-center text-2xl text-stone-900 lg:text-6xl">
          Customer <br />
          testimonials
        </h1>
      </div>

      {/* Tagline */}
      <div className="mx-auto mb-12 text-center lg:max-w-3xl">
        <p className="font-inter mt-11 text-base text-stone-900 lg:text-xl">
        See what our customers say about us
        </p>
      </div>

      {/* Carousel */}
      <>
        <section className="w-full py-4">
          <div className="mx-auto px-3 lg:max-w-6xl">
            <Carousel
              opts={{
                loop: true,
                align: "start",
              }}
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="flex flex-col rounded-lg bg-white px-4 py-5 sm:p-6">
                      {/* Rating */}
                      <div className="mb-4 flex text-orange-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <q className="flex-1 text-gray-500 text-lg leading-7 font-inter font-normal">
                        {testimonial.quote}
                      </q>
                      <div className="mt-6 flex gap-3">
                        <span className="inline-flex rounded-full">
                          <Image
                            className="h-10 w-10 rounded-full"
                            height={40}
                            width={40}
                            alt={testimonial.name}
                            src={testimonial.image}
                            loading="lazy"
                          />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>
      </>
    </section>
  );
};

export default Testimonial;
