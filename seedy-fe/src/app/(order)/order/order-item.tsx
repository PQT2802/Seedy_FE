import Image from "next/image";
import React from "react";
import { Order } from "@/apiRequests/order";
import Link from "next/link"; // Thêm Link để điều hướng
interface OrderItemProps {
  order: Order;
}

export default function OrderItem({ order }: OrderItemProps) {
  return (
    <>
      {/* list item */}
      <div className="w-[440px] mt-4 overflow-y-auto scrollbar-custom">
        {order.orderItems.map((item, index) => (
          <div
            key={index}
            className="flex w-[90%] gap-4 px-3 py-1.5 mb-4 rounded-lg bg-lime-950"
          >
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

              <div className="self-stretch text-sm">
                Quantity:{item.quantity}
              </div>
              <div className="self-stretch text-sm">Price:{item.price}</div>
            </div>
          </div>
        ))}
      </div>
      {/* button item */}
      <div className="flex flex-col justify-start items-start mt-4">
        <div className="bg-green-950 text-white p-3 rounded-lg">
          TRACKING YOUR ORDER
        </div>

        <Link href={`/order-detail?orderId=${order.id}`} legacyBehavior>
          <button className="bg-white p-3 mt-3 rounded-lg text-green-950 w-[220px]">
            VIEW ORDER DETAILS
          </button>
        </Link>
      </div>
    </>
  );
}
