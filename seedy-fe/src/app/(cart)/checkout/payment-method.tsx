"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function PaymentMethod() {
  const [selectPayment, setSelectPayment] = useState("cod");

  // Thông tin tài khoản ngân hàng để tạo QR Code
  const bankAccount = "0010000000355";
  const bankName = "Vietcombank";
  const amount = "100000"; // Số tiền mặc định
  const description = "Thanh toán đơn hàng"; // Nội dung chuyển khoản

  // URL QR Code động từ SePay
  const qrCodeUrl = `https://qr.sepay.vn/img?acc=${bankAccount}&bank=${bankName}&amount=${amount}&des=${encodeURIComponent(
    description
  )}`;

  return (
    <div className="flex flex-col mt-[30px] w-[56%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col py-6 pr-2.5 pl-8 mx-auto w-full bg-lime-700 rounded-2xl max-md:pl-5 max-md:mt-2.5">
        <h2 className="text-5xl text-white max-md:mr-2.5 max-md:text-4xl">
          Payment Method
        </h2>

        {/* Option COD */}
        <div className="flex items-center mt-3.5 gap-3 text-2xl text-white">
          <input
            type="radio"
            id="cod"
            value="cod"
            checked={selectPayment === "cod"}
            name="payment-method"
            onChange={(e) => setSelectPayment(e.target.value)}
            className="w-5 h-5 accent-lime-500 cursor-pointer"
          />
          <label htmlFor="cod" className="cursor-pointer">
            Cash on Delivery (COD)
          </label>
        </div>

        {/* Option Online Banking */}
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

        {/* Hiển thị mã QR khi chọn Online Banking */}
        {selectPayment === "online-banking" && (
          <div className="flex flex-col items-center mt-5 bg-white p-4 rounded-lg">
            <h3 className="text-xl font-bold text-black mb-3">
              Quét mã QR để thanh toán
            </h3>
            <Image
              src={qrCodeUrl}
              width={200}
              height={200}
              alt="QR Code Payment"
              className="object-contain"
            />
          </div>
        )}

        {/* Bank Icons */}
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
