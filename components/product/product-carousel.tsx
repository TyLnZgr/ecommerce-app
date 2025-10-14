"use client";
import { Product } from "@/types";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
export default function ProductCarousel({ data }: { data: Product[] }) {
  return (
    <Carousel
      className="w-full mb-12"
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {data.map((item: Product) => (
          <CarouselItem key={item.id}>
            <Link href={`/product/${item.slug}`}>
              <div className="relative mx-auto">
                <Image
                  src={item.banner!}
                  alt={item.name}
                  height="0"
                  width="0"
                  sizes="100vw"
                  className="w-full h-[350px]"
                />
                <div className="absolute inset-0 flex items-end justify-center">
                  <h2 className="bg-ray-900 bg-opacity-50 text-2xl font-bold px-2 text-white">
                    {item.name}
                  </h2>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
