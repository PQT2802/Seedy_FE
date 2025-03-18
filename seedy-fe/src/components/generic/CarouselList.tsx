import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Product } from "@/apiRequests/products";
import ProductItem from "@/components/category/product-item/productItem";

interface CarouselSizeProps {
  products: Product[]; // ✅ Receive sorted products
}

export function CarouselSize({ products }: CarouselSizeProps) {
  return (
    <div className="text-center">
      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full max-w-lg mx-auto"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="basis-full">
              {/* ✅ Display product inside Carousel */}
              <ProductItem product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-white hover:bg-green-600" />
        <CarouselNext className="text-white hover:bg-green-600" />
      </Carousel>
    </div>
  );
}
