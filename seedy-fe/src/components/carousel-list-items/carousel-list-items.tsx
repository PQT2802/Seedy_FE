import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselSize() {
  return (
    <div className="text-center">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-4 flex flex-col items-center">
                {/* Glowing Effect */}
                <div className="relative group">
                  <div className="absolute -inset-2 bg-green-400 opacity-50 blur-lg transition group-hover:scale-110"></div>
                  <Card className="relative z-10 bg-green-800 shadow-lg rounded-lg overflow-hidden">
                    <CardContent className="flex flex-col items-center p-4">
                      {/* Product Image */}
                      <img
                        src={`/path-to-your-image-${index + 1}.png`}
                        alt={`Product ${index + 1}`}
                        className="w-32 h-32 object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Product Name */}
                <h3 className="text-white text-lg mt-3 font-semibold">
                  "Product {index + 1}" SET
                </h3>

                {/* Price */}
                <p className="text-gray-300 text-sm">249.000 VND</p>

                {/* Add to Cart Button */}
                <button className="mt-2 bg-green-900 text-white px-4 py-2 text-sm rounded-lg flex items-center">
                  Add to cart
                  <span className="ml-2">🛒</span>
                </button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-white hover:bg-green-600" />
        <CarouselNext className="text-white hover:bg-green-600" />
      </Carousel>
    </div>
  );
}
