'use client'
import React from "react";

export default function ShippingInformation() {
  return (
    <div className="flex flex-col px-5 pt-5 pb-11 mt-11 text-xl bg-lime-700 rounded-2xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <h2 className="mr-8 text-5xl text-white max-md:mr-2.5 max-md:text-4xl">
        Shipping Information
      </h2>
      <form>
        <label htmlFor="fullName" className="sr-only">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          className="px-5 py-4 mt-4 text-headerGreen  bg-white rounded-2xl w-full"
          placeholder="Full Name"
        />
        <label htmlFor="address" className="sr-only">
          Address
        </label>
        <input
          id="address"
          type="text"
          className="px-5 py-4 mt-2 whitespace-nowrap bg-white rounded-2xl w-full"
          placeholder="Address"
        />
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="px-5 pt-3 pb-5 mt-2 whitespace-nowrap bg-white rounded-2xl w-full"
          placeholder="Email"
        />
        <label htmlFor="phoneNumber" className="sr-only">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="tel"
          className="px-5 py-4 mt-2 bg-white rounded-2xl w-full"
          placeholder="Phone Number"
        />
        <label htmlFor="note" className="sr-only">
          Note
        </label>
        <textarea
          id="note"
          className="px-5 pt-2.5 pb-16 mt-2 whitespace-nowrap bg-white rounded-2xl w-full"
          placeholder="Note"
        ></textarea>
      </form>
    </div>
  );
}
