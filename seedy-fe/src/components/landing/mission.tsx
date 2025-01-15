import React from "react";

export default function Mission() {
  return (
    <div
      className="relative top-0 left-0 w-full h-[130vh] bg-cover bg-no-repeat flex flex-col items-center px-6 py-12"
      style={{
        backgroundImage: "url('/what-we-do.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <h1 className="absolute top-6 left-14 text-black text-9xl font-mantra">
        What We Do?
      </h1>

      <div
        className="absolute left-12 top-1/3 text-white max-w-sm"
        style={{ transform: "translateX(70%) translateY(60%)" }}
      >
        <h2 className="text-5xl  mb-4 font-mantra ">Our Mission</h2>
        <p className="text-xl ml-14">
          Originating from small cards with the mission of connecting love and
          spreading positive values, we believe that each message is a seed of
          emotion, and every seed sown is a promise to the future.
        </p>
      </div>

      <div
        className="absolute right-12 top-2/3 text-white max-w-sm"
        style={{ transform: "translateY(-140%) translateX(-60%)" }}
      >
        <h2
          className="text-5xl font-mantra mb-4"
          style={{
            position: "relative", // Ensures the adjustment applies only to the <h2>
            left: "200px", // Moves the H2 to the right
          }}
        >
          Our Vision
        </h2>
        <p className="text-xl">
          Seedy aspires to become a symbol of creativity, connecting people and
          nature. We dream of a world where every small gift spreads love,
          inspires others, and nurtures a sustainable green planet.
        </p>
      </div>
    </div>
  );
}
