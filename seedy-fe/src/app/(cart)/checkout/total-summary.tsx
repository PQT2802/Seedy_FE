"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import paymentApiRequest from "@/apiRequests/payment";
import { useRouter } from "next/navigation";

interface TotalSummaryProps {
  total: number;
  selectedPaymentMethod: string;
}

export default function TotalSummary({
  total,
  selectedPaymentMethod,
}: TotalSummaryProps) {
  const [showQR, setShowQR] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const router = useRouter();

  const bankAccount = "09314448754"; // Số tài khoản ngân hàng
  const bankName = "Tpbank";
  const uniqueDescription = `PAY${Date.now()}`; // Tạo mô tả giao dịch duy nhất
  const qrCodeUrl = `https://qr.sepay.vn/img?acc=${bankAccount}&bank=${bankName}&amount=${total}&des=${encodeURIComponent(
    uniqueDescription
  )}`;

  const checkPaymentStatus = async () => {
    try {
      console.log("Checking payment status...");

      const response = await paymentApiRequest.checkPayment(
        bankAccount,
        total,
        uniqueDescription
      );

      console.log("Full API Response:", response);

      if (response.status !== 200) {
        console.log("Payment not found:", response.payload.payload.message);
        return;
      }

      const paymentData = response.payload.payload.data;
      if (!paymentData) {
        console.log("No transaction data found.");
        return;
      }

      console.log("✅ Payment successful:", paymentData);
      setIsCheckingPayment(false);
      setShowQR(false);
      router.push("/order-success");
    } catch (error) {
      console.error("Error calling API", error);
    }
  };

  const handlePurchase = () => {
    if (selectedPaymentMethod === "online-banking") {
      setShowQR(true);
      setIsCheckingPayment(true);
    } else {
      router.push("/order-success");
    }
  };

  useEffect(() => {
    if (!isCheckingPayment) return;

    const interval = setInterval(checkPaymentStatus, 3000);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setIsCheckingPayment(false);
      console.log("⏳ Payment check timeout exceeded (5 minutes).");
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isCheckingPayment]);

  return (
    <div className="flex flex-col mr-4 self-end mt-3.5 max-w-full text-xl text-black w-[318px]">
      <div className="flex gap-5 self-start">
        <div className="flex text-headerGreen flex-col items-start font-bold">
          <div className="self-stretch">Shipping Fee</div>
          <div className="mt-2">Discount</div>
          <div className="mt-2.5">Total</div>
          <div className="mt-3.5">Seeds</div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col pr-px pl-2.5">
            <div>50.000 VND</div>
            <div className="self-end mt-2.5 max-md:mr-2.5">0 VND</div>
          </div>
          <div className="mt-3">{(total + 50000).toLocaleString()} VND</div>
          <div className="self-center mt-3.5">+ 69 </div>
        </div>
      </div>
      <button className="px-8 py-2 mt-4 text-base font-bold rounded-md border-solid border-[3px] border-lime-950 max-md:px-5 max-md:mr-1">
        Use Your Seeds To Discount
      </button>

      {/* ✅ Giữ nguyên cả hai nút */}
      <div className="flex gap-3.5 mt-2">
        <button
          onClick={() => router.push("/shop")}
          className="px-2 rounded-lg border-solid border-[3px] border-lime-950 max-md:pr-5"
        >
          Continue Shopping
        </button>
        <button
          onClick={handlePurchase}
          className="px-4 flex justify-center items-center whitespace-nowrap rounded-lg border-solid border-[3px] border-lime-950 max-md:pr-5"
        >
          Purchase
        </button>
      </div>

      {showQR && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
            <h3 className="text-xl font-bold text-black mb-3">
              Scan the QR code to pay
            </h3>
            <Image
              src={qrCodeUrl}
              width={200}
              height={200}
              alt="QR Code Payment"
              className="object-contain"
            />
            <p className="text-sm mt-2 text-gray-600">
              Checking payment status...
            </p>
            <button
              onClick={() => {
                setShowQR(false);
                setIsCheckingPayment(false);
              }}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
