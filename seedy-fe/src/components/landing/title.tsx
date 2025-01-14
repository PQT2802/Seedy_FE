import Header from "@/components/header/header";
import Image from "next/image";
import React from "react";

export default function Title() {
  return (
    <div className="">
      {/* Background Wavy Image */}
      <div
        className="top-0 left-0 w-full h-[900px] bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/bg-ld-1.svg')", // Set the background image
          backgroundPosition: "center",
        }}
      >
        <Header />
        <div className="flex items-center justify-center h-full pl-20 ml-20">
          <Image
            src="/title-ld.png"
            alt="Title"
            width={1000}
            height={1000}
            className="object-center"
          />
        </div>
      </div>
    </div>
  );
}
