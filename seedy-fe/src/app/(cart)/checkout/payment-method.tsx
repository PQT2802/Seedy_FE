"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function PaymentMethod() {
  const [selectPayment, setSelectPayment] = useState("cod");
  return (
    <div className="flex flex-col  mt-[30px] w-[56%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col py-6 pr-2.5 pl-8 mx-auto w-full bg-lime-700 rounded-2xl max-md:pl-5 max-md:mt-2.5">
        <h2 className="text-5xl text-white max-md:mr-2.5 max-md:text-4xl">
          Payment Method
        </h2>
        <div className="flex items-center mt-3.5 gap-3 text-2xl text-white">
          <input
            type="radio"
            id="cod"
            value="cod"
            checked={selectPayment == "cod"}
            name="payment-method"
            onChange={(e) => setSelectPayment(e.target.value)}
            className="w-5 h-5 accent-lime-500 cursor-pointer"
          />
          <label htmlFor="cod" className="cursor-pointer">
            Cash on Delivery (COD)
          </label>
        </div>

        <div className="flex items-center mt-5 gap-3 text-2xl text-white max-md:ml-2.5">
          <input
            type="radio"
            id="online-banking"
            name="payment-method"
            value="online-banking"
            onChange={(e) => setSelectPayment(e.target.value)}
            checked={selectPayment === "online-banking"}
            className="w-5 h-5 accent-lime-500 cursor-pointer"
          />
          <label htmlFor="online-banking" className="cursor-pointer">
            Online Banking
          </label>
        </div>

        {/* Bank Icon */}
        <div className="flex gap-5 justify-between self-center mt-5 max-w-full w-[169px]">
          <div className="flex gap-5 items-start">
            <Image
              width={300}
              height={300}
              loading="lazy"
              src="/cart/checkout/Vnpay.png"
              className="object-contain shrink-0 w-7 rounded-lg aspect-[1.08]"
              alt="VNPAY"
            />
            <Image
              width={300}
              height={300}
              loading="lazy"
              src="/cart/checkout/Vnpay.png"
              className="object-contain shrink-0 w-7 rounded-lg aspect-[1.08]"
              alt="VNPAY"
            />
            <Image
              width={300}
              height={300}
              loading="lazy"
              src="/cart/checkout/Vnpay.png"
              className="object-contain shrink-0 w-7 rounded-lg aspect-[1.08]"
              alt="VNPAY"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
