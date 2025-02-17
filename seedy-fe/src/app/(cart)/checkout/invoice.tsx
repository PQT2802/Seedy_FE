import Image from "next/image";
import React from "react";

interface InvoiceItemProps {
  imageSrc: string;
  title: string;
  price: string;
  amount: number;
}

function InvoiceItem({ imageSrc, title, price, amount }: InvoiceItemProps) {
  return (
    <div className="flex gap-4 px-3 py-1.5 mt-2.5 rounded-2xl bg-lime-950 ">
      <div className="flex justify-center px-2.5 py-3 bg-white rounded-2xl max-h-[100px]">
        <Image
          width={300}
          height={300}
          loading="lazy"
          src={imageSrc}
          className="object-contain aspect-[1.65] shadow-[8px_11px_39px_rgba(0,0,0,0.25)] w-[71px]"
          alt={title}
        />
      </div>
      <div className="flex flex-col text-white items-start self-start text-lg ">
        <div className="self-stretch text-xl">{title}</div>
        <div className="mt-1 font-bold">{price}</div>
        <div className="mt-3.5">Amount: {amount}</div>
      </div>
    </div>
  );
}

export default function Invoice() {
  const invoiceItems = [
    {
      imageSrc: "/cart/cart-list/flower.png",
      title: "MAKE-PLANT BOX SET",
      price: "499.000 VND",
      amount: 1,
    },
    {
      imageSrc: "/cart/cart-list/flower.png",
      title: "MAKE-PLANT BOX SET",
      price: "499.000 VND",
      amount: 1,
    },
    {
      imageSrc: "/cart/cart-list/flower.png",
      title: "MAKE-PLANT BOX SET",
      price: "499.000 VND",
      amount: 1,
    },
    {
      imageSrc: "/cart/cart-list/flower.png",
      title: "MAKE-PLANT BOX SET",
      price: "499.000 VND",
      amount: 1,
    },
    {
      imageSrc: "/cart/cart-list/flower.png",
      title: "MAKE-PLANT BOX SET",
      price: "499.000 VND",
      amount: 1,
    },
    
   
  ];

  return (
    <div className="flex flex-col ml-5 w-[44%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full max-md:mt-2">
        <h2 className="self-start text-5xl text-black max-md:text-4xl">
          Invoice
        </h2>
        <div className=" max-h-[320px]  overflow-y-auto scrollbar-custom">
          {invoiceItems.map((item, index) => (
            <InvoiceItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
