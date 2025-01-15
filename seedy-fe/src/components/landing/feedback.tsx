import React from "react";

export default function Feedback() {
  return (
    <div
      className="relative top-0 left-0 w-full h-[155vh] bg-cover bg-no-repeat flex flex-col rounded-[25px] items-start px-6 py-12"
      style={{
        backgroundImage: "url('/feedback-bg.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div
        className="text-left mb-8 w-full max-w-xl"
        style={{ transform: "translateX(20%) translateY(30%)" }}
      >
        <h1 className="font-mantra text-white text-7xl mb-6">
          Let&apos;s Contact
        </h1>
        <form className="bg-opacity-100 p-8 text-white">
          <div className="mb-6 flex items-center">
            <label htmlFor="name" className="text-4xl font-mantra mr-4 w-20">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="flex-1  p-1 rounded-[8px] bg-[#92a380] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-6 flex items-center">
            <label htmlFor="email" className="text-4xl font-mantra mr-4 w-20">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="flex-1 p-1 rounded-[8px] bg-[#92a380] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-6 flex items-start">
            <label htmlFor="message" className="text-4xl font-mantra mr-4 w-30">
              Message
            </label>
            <textarea
              id="message"
              className="flex-1 p-3 rounded-[8px] bg-[#92a380] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={4}
            ></textarea>
          </div>
          <div className="text-left">
            <button
              type="submit"
              className=" w-3/5 bg-green-600  hover:bg-green-700 text-white font-utmavo font-bold py-3 px-6 rounded-[30px] focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ transform: "translateX(50%)" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
