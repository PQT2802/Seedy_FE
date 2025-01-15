import React from "react";
import Image from "next/image";

export default function BestSeller() {
  return (
    <div
      className="relative top-0 left-0 w-full h-[130vh] bg-cover bg-no-repeat flex flex-col items-center px-6 py-12"
      style={{
        backgroundImage: "url('/best-seller.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Product Cards */}
      <div className="flex flex-row gap-8 items-center justify-between w-full px-12 pt-[20vh]">
        {/* First Card */}
        <div className="flex flex-col items-center p-6 max-w-sm ml-32 mt-60">
          <Image
            src="/box-set-1.png"
            alt="Seedy Make-Plant Box Set"
            width={600}
            height={600}
          />
        </div>

        {/* Second Card */}
        <div className="flex flex-col items-center p-6 max-w-sm mr-32 mt-20">
          <Image
            src="/sticker-set-1.png"
            alt="Wild-Ture Sticker Set"
            width={600}
            height={600}
          />
        </div>
      </div>

      {/* Row for Names and Buttons */}
      <div className="flex flex-row items-center justify-between w-full px-32 ml-20">
        {/* First Card Text and Button */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-bold text-[#234014] text-center pb-5">
            SEEDY MAKE-PLANT BOX SET
          </h2>
          <button className="mt-2 px-6 py-2 text-xl bg-[#234014] text-white rounded-full hover:bg-green-700 transition">
            BUY NOW
          </button>
        </div>

        {/* Second Card Text and Button */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-bold text-[#234014] text-center mr-32 pb-5">
            “WILD-TURE” STICKER SET
          </h2>
          <button className="mt-2 px-6 py-2 text-xl bg-[#234014] text-white rounded-full hover:bg-green-700 transition mr-24">
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}
