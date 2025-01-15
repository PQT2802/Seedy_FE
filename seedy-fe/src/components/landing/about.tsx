import React from "react";

export default function About() {
  return (
    <div
      className="relative top-0 left-0 w-full h-[150vh] bg-cover bg-no-repeat flex flex-col items-center justify-center px-6"
      style={{
        backgroundImage: "url('/about-2-new.png')",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
      }}
    >
      {/* Main Title */}
      <div className="text-center">
        {/* "What is" Text */}
        <h1
          className="text-[12rem] md:text-[15rem] font-bold drop-shadow-lg font-mantra relative leading-none pt-10 pr-14"
          style={{
            WebkitTextStroke: "2px white", // White outline
            WebkitTextFillColor: "#205804", // Dark green fill
          }}
        >
          What is
        </h1>
        {/* "Seedy" Text */}
        <h1
          className="text-[12rem] md:text-[15rem] font-bold drop-shadow-lg font-mantra relative leading-none mt-[-20px] pr-14 "
          style={{
            WebkitTextStroke: "2px white", // White outline
            WebkitTextFillColor: "#205804", // Dark green fill
          }}
        >
          Seedy
        </h1>
      </div>

      {/* Description in the Middle-Right */}
      <p className="absolute top-1/2 right-12 transform -translate-y-1/2 text-4xl text-white max-w-sm leading-relaxed drop-shadow-sm text-right pt-40 font-utmavo">
        Seedy delivers lasting value in a growing market for creative, green
        experiences
      </p>

      {/* Description in the Bottom-Left */}
      <p className="absolute bottom-40 left-12 text-3xl text-white max-w-sm leading-relaxed drop-shadow-sm font-utmavo">
        Where sustainability meets uniqueness. With eco-friendly, personalized
        products and a solid strategy
      </p>
    </div>
  );
}
