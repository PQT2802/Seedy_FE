"use client";
import Link from "next/link";
import React from "react";

export default function TotalSummary() {
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
          <div className="flex flex-col pr-px pl-2.5 ">
            <div>50.000 VND</div>
            <div className="self-end mt-2.5 max-md:mr-2.5">0 VND</div>
          </div>
          <div className="mt-3">749.000 VND</div>
          <div className="self-center mt-3.5">+ 69 </div>
        </div>
      </div>
      <button className="px-8 py-2 mt-4 text-base font-bold rounded-md border-solid border-[3px] border-lime-950 max-md:px-5 max-md:mr-1">
        Use Your Seeds To Discount
      </button>
      <div className="flex gap-3.5 mt-2">
        <button className="px-2  rounded-lg border-solid border-[3px] border-lime-950 max-md:pr-5">
          Continue Shopping
        </button>
        <Link
          href="/order-success"
          className="px-4 flex justify-center items-center whitespace-nowrap rounded-lg border-solid border-[3px] border-lime-950 max-md:pr-5"
        >
          Purchase
        </Link>
      </div>
    </div>
  );
}
