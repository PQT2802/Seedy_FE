import Image from "next/image";

export default function Footer() {
  return (
    <div className="relative w-full h-[60vh] overflow-hidden bg-[#234014]">
      {/* Background Wavy Image */}
      <div
        className="absolute top-0 left-0 w-full h-[900px] bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/footer-bg.png')", // Set the background image
          backgroundPosition: "center",
          transform: "scale(1.05)",
        }}
      ></div>

      {/* Footer Content */}
      <div className="container mx-auto relative z-10 py-10 mt-80">
        <div className="grid grid-cols-3 items-center">
          {/* Left Section: Social Icons */}
          <div className="flex space-x-4 justify-start text-black">
            <Image src="/fb-icon.png" alt="Facebook" width={50} height={50} />
            <Image src="/ig-icon.png" alt="Instagram" width={50} height={50} />
            <Image src="/tt-icon.png" alt="TikTok" width={50} height={50} />
          </div>

          {/* Center Section: Branding */}
          <div className="text-center text-green-900">
            <h2 className="text-8xl font-bold font-mantra">SEEDY</h2>
            <p className="text-6xl font-mantra">NATURE EMBRACES YOUR STORIES</p>
          </div>

          {/* Right Section: Copyright Text */}
          <div className="text-right text-black">
            <p className="text-xm">seedy © all rights reserved</p>
          </div>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="absolute right-5 bottom-5 space-y-3 z-20">
        {/* Scroll to Top Button */}
        <button className="w-10 h-10 rounded-full bg-[#64E07D] flex items-center justify-center shadow-md">
          <span className="text-black text-lg font-bold">↑</span>
        </button>

        {/* Chat Button */}
        <button className="w-10 h-10 rounded-full bg-[#64E07D] flex items-center justify-center shadow-md">
          <span className="text-black text-lg font-bold">💬</span>
        </button>
      </div>
    </div>
  );
}
