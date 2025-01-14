import React from "react";
import Image from "next/image";

export default function Intro() {
  return (
    <div
      className="relative top-0 left-0 w-full h-[900px] bg-cover bg-no-repeat rounded-[30px] flex items-center justify-between px-12"
      style={{
        backgroundImage:
          "linear-gradient(rgba(14, 36, 9, 0.83), rgba(14, 36, 9, 0.83)), url('/bg-about-2.png')", // Dark green overlay
        backgroundPosition: "center",
        backgroundBlendMode: "multiply", // Blend the overlay and image
      }}
    >
      {/* Text Section */}
      <div className="text-left max-w-[50%] text-white space-y-6">
        <h1
          className="font-mantra text-9xl font-bold"
          style={{ lineHeight: "1.1" }} // Custom line-height for reduced spacing
        >
          Nature Embraces Your Stories
        </h1>
        <p className="font-utmavo text-2xl leading-relaxed">
          We redefine creativity with recycling: for each Seedy notebook
          isn&apos;t just for jotting down ideas, it&apos;s a testament to
          environmental protection and uniqueness in every writing and drawing
          experience.
        </p>
        <button className="px-6 py-3 bg-transparent border border-white rounded-[15px] text-white text-lg hover:bg-white hover:text-green-900 transition">
          LET’S EXPLORE
        </button>
      </div>

      {/* Image Section */}
      <div className="flex-shrink-0">
        <Image
          src="/about-img.png"
          alt="About image"
          width={900}
          height={900}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
