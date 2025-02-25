"use client";
import React, { useEffect, useState } from "react";
import viettelPostApi from "@/apiRequests/viettelpost";

export default function ShippingInformation({
  total,
  selectedPaymentMethod,
  setShippingFee,
}: {
  total: number;
  selectedPaymentMethod: string;
  setShippingFee: (fee: number) => void;
}) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [services, setServices] = useState<ShippingService[]>([]);
  const [selectedService, setSelectedService] = useState<string>("");
  const [shippingFee, setLocalShippingFee] = useState<number | null>(null);

  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const [selectedWard, setSelectedWard] = useState<number | null>(null);

  // Gọi API lấy danh sách tỉnh
  useEffect(() => {
    viettelPostApi.getProvinces().then(setProvinces);
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      viettelPostApi.getDistricts(selectedProvince).then(setDistricts);
      setWards([]);
      setSelectedDistrict(null);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      viettelPostApi.getWards(selectedDistrict).then(setWards);
    }
  }, [selectedDistrict]);

  // Xử lý tính phí vận chuyển
  const handleCalculateShipping = async () => {
    if (!selectedProvince || !selectedDistrict || !selectedWard) {
      alert("Vui lòng chọn đầy đủ địa chỉ giao hàng!");
      return;
    }

    // 🛠 Kiểm tra nếu total bị `undefined` thì set mặc định là 0
    const finalTotal = total || 0;

    const receiverWard = wards.find(
      (ward) => ward.WARDS_ID === selectedWard
    )?.WARDS_NAME;
    const receiverDistrict = districts.find(
      (district) => district.DISTRICT_ID === selectedDistrict
    )?.DISTRICT_NAME;
    const receiverProvince = provinces.find(
      (province) => province.PROVINCE_ID === selectedProvince
    )?.PROVINCE_NAME;

    if (!receiverWard || !receiverDistrict || !receiverProvince) {
      alert("Lỗi lấy thông tin địa chỉ.");
      return;
    }

    const receiverAddress = `${receiverWard}, ${receiverDistrict}, ${receiverProvince}`;

    const data = {
      SENDER_ADDRESS: "2640/3b Hẻm 109, P.An Phú Đông, Q.12, TP.Hồ Chí Minh",
      RECEIVER_ADDRESS: receiverAddress,
      PRODUCT_TYPE: "HH",
      PRODUCT_WEIGHT: 30,
      PRODUCT_PRICE: finalTotal,
      MONEY_COLLECTION:
        selectedPaymentMethod === "online-banking"
          ? "0"
          : finalTotal.toString(),
      PRODUCT_LENGTH: 12,
      PRODUCT_WIDTH: 15,
      PRODUCT_HEIGHT: 5,
      TYPE: 1,
    };

    try {
      const response = await viettelPostApi.getShippingPrice(data);

      console.log("API Response for Shipping Price:", response); // ✅ Debugging log
      if (response.length > 0) {
        setServices(response); // ✅ Update state
        setSelectedService(response[0].MA_DV_CHINH);
        setShippingFee(response[0].GIA_CUOC);
      } else {
        console.log("No services returned from API."); // ✅ Log when empty
      }
    } catch (error) {
      console.error("Lỗi gọi API vận chuyển:", error);
    }
  };

  return (
    <div className="flex flex-col px-5 pt-5 pb-11 mt-11 text-xl bg-lime-700 rounded-2xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <h2 className="mr-8 text-5xl text-white max-md:mr-2.5 max-md:text-4xl">
        Shipping Information
      </h2>
      <form>
        {/* Full Name */}
        <label htmlFor="fullName" className="sr-only">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          className="px-5 py-4 mt-4 text-headerGreen bg-white rounded-2xl w-full"
          placeholder="Full Name"
        />

        {/* Email */}
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="px-5 pt-3 pb-5 mt-2 whitespace-nowrap bg-white rounded-2xl w-full"
          placeholder="Email"
        />

        {/* Phone Number */}
        <label htmlFor="phoneNumber" className="sr-only">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="tel"
          className="px-5 py-4 mt-2 bg-white rounded-2xl w-full"
          placeholder="Phone Number"
        />

        {/* Address */}
        <label htmlFor="address" className="sr-only">
          Address
        </label>
        <input
          id="address"
          type="text"
          className="px-5 py-4 mt-2 whitespace-nowrap bg-white rounded-2xl w-full"
          placeholder="Address"
        />

        {/* Province Selection */}
        <label htmlFor="province" className="sr-only">
          Province
        </label>
        <select
          id="province"
          className="px-5 py-4 mt-2 bg-white rounded-2xl w-full"
          value={selectedProvince || ""}
          onChange={(e) => setSelectedProvince(Number(e.target.value))}
        >
          <option value="">Select Province</option>
          {provinces.map((province) => (
            <option key={province.PROVINCE_ID} value={province.PROVINCE_ID}>
              {province.PROVINCE_NAME}
            </option>
          ))}
        </select>

        {/* District Selection */}
        <label htmlFor="district" className="sr-only">
          District
        </label>
        <select
          id="district"
          className="px-5 py-4 mt-2 bg-white rounded-2xl w-full"
          value={selectedDistrict || ""}
          onChange={(e) => setSelectedDistrict(Number(e.target.value))}
          disabled={!selectedProvince}
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district.DISTRICT_ID} value={district.DISTRICT_ID}>
              {district.DISTRICT_NAME}
            </option>
          ))}
        </select>

        {/* Ward Selection */}
        <label htmlFor="ward" className="sr-only">
          Ward
        </label>
        <select
          id="ward"
          className="px-5 py-4 mt-2 bg-white rounded-2xl w-full"
          value={selectedWard || ""}
          onChange={(e) => setSelectedWard(Number(e.target.value))}
          disabled={!selectedDistrict}
        >
          <option value="">Select Ward</option>
          {wards.map((ward) => (
            <option key={ward.WARDS_ID} value={ward.WARDS_ID}>
              {ward.WARDS_NAME}
            </option>
          ))}
        </select>

        {/* Button để lấy phí ship */}
        <button
          type="button"
          className="px-5 py-2 mt-4 bg-white rounded-xl w-full"
          onClick={handleCalculateShipping}
        >
          Calculate Shipping Fee
        </button>

        {/* Select dịch vụ vận chuyển */}
        {services.length > 0 && (
          <select
            id="shippingService"
            className="px-5 py-4 mt-2 bg-white rounded-2xl w-full"
            value={selectedService}
            onChange={(e) => {
              const selected = services.find(
                (s) => s.MA_DV_CHINH === e.target.value
              );
              setSelectedService(e.target.value);
              setShippingFee(selected?.GIA_CUOC || 0); // ✅ Cập nhật Shipping Fee khi chọn dịch vụ khác
            }}
          >
            {services.map((service) => (
              <option key={service.MA_DV_CHINH} value={service.MA_DV_CHINH}>
                {service.TEN_DICHVU} - {service.GIA_CUOC.toLocaleString()} VND (
                {service.THOI_GIAN})
              </option>
            ))}
          </select>
        )}
      </form>
    </div>
  );
}
