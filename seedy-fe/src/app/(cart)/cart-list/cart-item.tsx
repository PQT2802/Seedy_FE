import Image from "next/image";
import React from "react";

interface CartItemProps {
  imageSrc: string;
  altText: string;
  title: string;
  price: string;
  quantity: number;
}

export default function CartItem({
  imageSrc,
  altText,
  title,
  price,
  quantity,
}: CartItemProps) {
  return (
    <div className="flex gap-2 max-md:flex-col">
      <div className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow px-2.5 w-full bg-white rounded-2xl max-md:mt-10">
          <Image
            width={300}
            height={300}
            src={imageSrc}
            alt={altText}
            className="object-contain z-10 aspect-square w-[194px]"
          />
        </div>
      </div>
      <div className="flex  ml-5 w-[82%] max-md:ml-0 max-md:w-full">
        <div className="flex justify-between text-white items-start mt-3.5 w-full max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-col gap-20">
            <div className="text-4xl">{title}</div>
            <div className="mt-2.5 ml-3 text-3xl font-bold max-md:ml-2.5">
              {price}
            </div>
          </div>
          <div className="flex gap-10 items-start self-center mt-6 text-4xl tracking-tighter leading-loose text-black bg-white px-5 rounded-lg whitespace-nowrap">
            <button
              aria-label="Decrease quantity"
              className="focus:outline-none"
            >
              -
            </button>
            <div className="self-stretch">{quantity}</div>
            <button
              aria-label="Increase quantity"
              className="focus:outline-none"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
