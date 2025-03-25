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

export function CarouselList({ products }: CarouselSizeProps) {
  return (
    <div className="text-center">
      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="basis-1/4">
              {/* ✅ Display product inside Carousel */}
              <ProductItem
                product={product}
                className="text-white text-lg font-bold"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-white hover:bg-green-600" />
        <CarouselNext className="text-white hover:bg-green-600" />
      </Carousel>
    </div>
  );
}
