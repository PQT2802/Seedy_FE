import Image from "next/image";
import React from "react";

interface CartItemProps {
  imageSrc: string;
  altText: string;
  title: string;
  price: string;
  quantity: number;
}
const cartItems = [
  {
    imageSrc: "/cart/cart-list/flower.png",
    altText: "KHỞI SET product image",
    title: '"KHỞI" SET',
    price: "200.000 VND",
    time:"7:30",
    quantity: 1,
  },
  {
    imageSrc: "/cart/cart-list/box.png",
    altText: "MAKE-PLANT BOX SET product image",
    title: "MAKE-PLANT BOX SET",
    price: "499.000 VND",
    time:"7:30",
    quantity: 1,
  },
  {
    imageSrc: "/cart/cart-list/box.png",
    altText: "MAKE-PLANT BOX SET product image",
    title: "MAKE-PLANT BOX SET",
    price: "499.000 VND",
    time:"7:30",
    quantity: 1,
  },
  {
    imageSrc: "/cart/cart-list/box.png",
    altText: "MAKE-PLANT BOX SET product image",
    title: "MAKE-PLANT BOX SET",
    price: "499.000 VND",
    time:"7:30",
    quantity: 1,
  },
];
export default function OrderItem({
  imageSrc,
  altText,
  title,
  price,
  quantity,
}: CartItemProps) {
  return (
    <>
      {/* list item*/}
      <div className="w-[440px]  mt-4 overflow-y-auto scrollbar-custom ">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex w-[90%] gap-4 px-3 py-1.5   mb-4 rounded-lg bg-lime-950 "
          >
            <div className="flex px-2.5 py-3 bg-white rounded-2xl max-h-[70px]">
              <Image
                width={300}
                height={300}
                loading="lazy"
                src={item.imageSrc}
                className="object-contain aspect-[1.65] w-[71px]"
                alt={item.title}
              />
            </div>
            <div className="flex flex-col text-white items-start self-start text-lg ">
              <div className="self-stretch text-xl">{item.title}</div>
              <div className="self-stretch text-sm">Tiem of order: {item.time}</div>
            </div>
          </div>
        ))}
      </div>
      {/* button item*/}
      <div className="flex flex-col justify-start items-start mt-4 ">
        <div className="bg-green-950 text-white p-3 rounded-lg">
          TRACKING YOUR ORDER
        </div>
        <button className="bg-white p-3 mt-3 rounded-lg text-green-950 w-[220px]">
          VIEW ORDER DETAILS
        </button>
      </div>
    </>
  );
}
