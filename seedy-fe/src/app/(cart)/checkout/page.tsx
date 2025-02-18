"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header/header";
import ShippingInformation from "./shipping-info";
import Invoice from "./invoice";
import PaymentMethod from "./payment-method";
import TotalSummary from "./total-summary";

export default function Page() {
  const [checkoutItems, setCheckoutItems] = useState<Record<string, any>>({});
  const [checkoutTotal, setCheckoutTotal] = useState<number>(0);
  const [selectedPayment, setSelectedPayment] = useState<string>("cod");

  useEffect(() => {
    const storedCart = localStorage.getItem("checkoutCart");
    const storedTotal = localStorage.getItem("checkoutTotal");

    if (storedCart) {
      setCheckoutItems(JSON.parse(storedCart));
    }
    if (storedTotal) {
      setCheckoutTotal(JSON.parse(storedTotal));
    }
  }, []);

  return (
    <div className="bg-black">
      <Header />
      <div className="flex flex-col rounded-none justify-center items-center ">
        <div className="px-12 py-12 w-[80%] mb-10 bg-white rounded-[33px] max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-2/5 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                <h1 className=" font-mantra text-headerGreen self-start text-6xl max-md:text-4xl">
                  CHECK OUT
                </h1>
                <ShippingInformation />
              </div>
            </div>
            <div className="flex flex-col ml-5 w-3/5 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col mt-16 w-full max-md:mt-10 max-md:max-w-full">
                <div className="max-w-full">
                  <div className="flex gap-5 max-md:flex-col">
                    <PaymentMethod onSelectPayment={setSelectedPayment} />
                    <Invoice items={checkoutItems} />
                  </div>
                </div>
                <TotalSummary
                  total={checkoutTotal}
                  selectedPaymentMethod={selectedPayment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
