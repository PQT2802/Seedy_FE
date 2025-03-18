import Image from "next/image";
import React from "react";
import { OrderItem } from "@/apiRequests/order";

interface OrderDetailItemProps {
  item: OrderItem;
}

export default function OrderDetailItem({ item }: OrderDetailItemProps) {
  return (
    <div className="flex w-[90%] gap-4 px-3 py-1.5 mb-4 rounded-lg bg-lime-950">
      <div className="flex px-2.5 py-3 bg-white rounded-2xl max-h-[70px]">
        <Image
          width={300}
          height={300}
          loading="lazy"
          src={item.productImageUrl}
          className="object-contain aspect-[1.65] w-[71px]"
          alt={item.productName}
        />
      </div>
      <div className="flex flex-col text-white items-start self-start text-lg">
        <div className="self-stretch text-xl">{item.productName}</div>
        <div className="self-stretch text-sm">Quantity: {item.quantity}</div>
        <div className="text-sm">
          Price: {item.price.toLocaleString("vi-VN")} VND
        </div>
        <div className="text-sm">
          Subtotal: {(item.price * item.quantity).toLocaleString("vi-VN")} VND
        </div>
      </div>
    </div>
  );
}
