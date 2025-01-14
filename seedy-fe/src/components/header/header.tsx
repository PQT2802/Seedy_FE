import React, { JSX } from "react";
import Image from "next/image";

export const Header = (): JSX.Element => {
  return (
    <div className="relative w-full h-[87px] flex items-center justify-between px-8">
      {/* Logo */}
      <div className="w-[92px] h-[87px] flex items-center ml-20">
        <Image
          alt="Logo seedy moi trang"
          src="/logo-seedy-mo-i-tra-ng-1.png"
          width={92}
          height={87}
        />
      </div>

      {/* Header Container */}
      <div className="flex-1 h-[87px] flex items-center justify-center">
        <div className="w-[1144px] h-[65px] bg-[#d9d9d980] rounded-lg flex items-center justify-between px-10">
          {/* Navigation Links */}
          <div className="flex space-x-8">
            <span className="text-3xl text-white font-mantra tracking-normal">
              OUR PRODUCTS
            </span>
            <span className="text-3xl text-white font-mantra tracking-normal">
              OUR ARCHIVES
            </span>
            <span className="text-3xl text-white font-mantra tracking-normal">
              ABOUT US
            </span>
          </div>

          {/* Search Box */}
          <div className="flex items-center bg-[#d9d9d9b2] border border-white rounded-[15px] px-5 py-1 w-[300px]">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-white placeholder-gray-400 focus:outline-none w-full text-left"
            />
            <Image
              alt="Search Icon"
              src="/search-more.png"
              width={28}
              height={28}
              className="ml-1"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-10">
            <Image
              alt="Earth Icon"
              src="/earth-planet.png"
              width={45}
              height={45}
            />
            <Image
              alt="Shopping Cart Icon"
              src="/shopping-cart.png"
              width={45}
              height={45}
            />
            <Image alt="User Icon" src="/user.png" width={45} height={45} />
          </div>
        </div>
      </div>

      {/* Circled Menu */}
      <div className="w-[65px] h-[65px] flex items-center mr-20 ">
        <Image
          alt="Circled menu"
          src="/circled-menu.png"
          width={65}
          height={65}
        />
      </div>
    </div>
  );
};
