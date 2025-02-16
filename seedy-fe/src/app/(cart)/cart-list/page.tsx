import Header from "@/components/header/header";
import React from "react";
import CartItem from "./cart-item";
import Link from "next/link";

const cartItems = [
  {
    imageSrc: "/cart/cart-list/flower.png",
    altText: "KHỞI SET product image",
    title: '"KHỞI" SET',
    price: "200.000 VND",
    quantity: 1,
  },
  {
    imageSrc: "/cart/cart-list/box.png",
    altText: "MAKE-PLANT BOX SET product image",
    title: "MAKE-PLANT BOX SET",
    price: "499.000 VND",
    quantity: 1,
  },
  {
    imageSrc: "/cart/cart-list/box.png",
    altText: "MAKE-PLANT BOX SET product image",
    title: "MAKE-PLANT BOX SET",
    price: "499.000 VND",
    quantity: 1,
  },
  {
    imageSrc: "/cart/cart-list/box.png",
    altText: "MAKE-PLANT BOX SET product image",
    title: "MAKE-PLANT BOX SET",
    price: "499.000 VND",
    quantity: 1,
  },
];

export default function page() {
  return (
    <div className="bg-black">
      <Header />
      <div className="flex flex-col rounded-none justify-center items-center">
        <div className="flex flex-col items-end px-20 pt-12 pb-[86px] w-[80%] bg-white rounded-[33px] mb-[30px] max-md:px-5 max-md:pb-24 max-md:max-w-full">
          <h1 className="font-mantra self-start text-6xl text-headerGreen my-[20px] max-md:text-4xl">
            YOUR CART
          </h1>

          <div className="max-h-[500px] w-[100%] overflow-y-auto scrollbar-custom">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className={`py-3 pr-20 pl-6 mt-${
                  index === 0 ? "9" : "7"
                }  rounded-2xl bg-lime-950 w-[100%] max-w-[1340px] max-md:px-5`}
              >
                <CartItem {...item} />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-7 -mb-6 max-md:mb-2.5">
            <div className="flex flex-auto gap-10 px-6 py-3 text-black rounded-2xl bg-lime-950 max-md:px-5">
              <div className="text-4xl text-white">TOTAL:</div>
              <div className="self-start justify-center items-center text-3xl font-bold basis-auto text-customGreen">
                699.000 VND
              </div>
            </div>
            <Link
              href="/checkout"
              className="grow px-16 py-3 text-4xl text-black rounded-2xl border-4 border-solid border-lime-950 w-fit max-md:px-5"
            >
              CHECK OUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
