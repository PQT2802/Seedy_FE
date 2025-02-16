import Header from "@/components/header/header";
import React from "react";

export default function page() {
  return (
    <div className="bg-black">
      <Header />
      <div className="flex flex-col text-black rounded-none justify-center items-center  ">
        <div className="flex flex-col justify-center items-center px-20 py-48 mb-[20px] w-[80%] bg-white rounded-[33px] max-md:px-5 max-md:py-24 max-md:max-w-full">
          <div className="flex flex-col items-center h-[392px] mb-0 max-w-full  max-md:mb-2.5">
            <h1 className="text-9xl max-md:max-w-full max-md:text-4xl">
              Great News!
            </h1>
            <p className="self-stretch mt-10 text-[60px] font-bold tracking-tight leading-7 text-center max-md:max-w-full">
              Your order is now complete
            </p>
            <p className="self-stretch mt-10 text-3xl font-bold tracking-tight leading-7 text-center max-md:max-w-full">
              You will receive a confirmation email within the next 24 hours.
            </p>
            <p className="self-stretch text-3xl font-bold tracking-tight leading-7 text-center max-md:max-w-full">
              If you have any questions, please don't hesitate to contact us.
            </p>
            <button className="px-6 py-3 mt-20 max-w-full text-4xl rounded-2xl border-4 border-solid border-lime-950 w-[309px] max-md:px-5 max-md:mt-10">
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
