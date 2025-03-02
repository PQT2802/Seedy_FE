"use client";
import React, { useEffect, useState } from "react";
import viettelPostApi from "@/apiRequests/viettelpost";

interface Province {
  PROVINCE_ID: number;
  PROVINCE_CODE: string;
  PROVINCE_NAME: string;
}

interface District {
  DISTRICT_ID: number;
  DISTRICT_NAME: string;
}

interface Ward {
  WARDS_ID: number;
  WARDS_NAME: string;
}

interface ShippingService {
  MA_DV_CHINH: string;
  TEN_DICHVU: string;
  GIA_CUOC: number;
  THOI_GIAN: string;
}

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

  // State để lưu thông tin người nhận
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    provinceId: null as number | null,
    districtId: null as number | null,
    wardId: null as number | null,
  });

  // Gọi API lấy danh sách tỉnh
  useEffect(() => {
    viettelPostApi.getProvinces().then((data) => {
      const formattedData = data.map((item: any) => ({
        PROVINCE_ID: item.provincE_ID,
        PROVINCE_CODE: item.provincE_CODE,
        PROVINCE_NAME: item.provincE_NAME,
      }));
      setProvinces(formattedData);
    });
  }, []);
  useEffect(() => {
    if (formData.provinceId) {
      viettelPostApi.getDistricts(formData.provinceId).then(setDistricts);
      setWards([]);
      setFormData((prev) => ({ ...prev, districtId: null, wardId: null }));
    }
  }, [formData.provinceId]);

  useEffect(() => {
    if (formData.districtId) {
      viettelPostApi.getWards(formData.districtId).then(setWards);
    }
  }, [formData.districtId]);

  // Xử lý thay đổi input
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id.includes("Id") ? (value ? Number(value) : null) : value,
    }));
  };
  // Xử lý tính phí vận chuyển
  const handleCalculateShipping = async () => {
    if (!formData.provinceId || !formData.districtId || !formData.wardId) {
      alert("Vui lòng chọn đầy đủ địa chỉ giao hàng!");
      return;
    }
    if (!formData.fullName || !formData.phoneNumber) {
      alert("Vui lòng nhập đầy đủ họ tên và số điện thoại!");
      return;
    }

    const finalTotal = total || 0;

    const receiverWard = wards.find(
      (ward) => ward.WARDS_ID === formData.wardId
    )?.WARDS_NAME;
    const receiverDistrict = districts.find(
      (district) => district.DISTRICT_ID === formData.districtId
    )?.DISTRICT_NAME;
    const receiverProvince = provinces.find(
      (province) => province.PROVINCE_ID === formData.provinceId
    )?.PROVINCE_NAME;

    if (!receiverWard || !receiverDistrict || !receiverProvince) {
      alert("Lỗi lấy thông tin địa chỉ.");
      return;
    }

    const receiverAddress = `${formData.address}, ${receiverWard}, ${receiverDistrict}, ${receiverProvince}`;

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

      console.log("API Response for Shipping Price:", response);
      if (response.length > 0) {
        setServices(response);
        setSelectedService(response[0].MA_DV_CHINH);
        setLocalShippingFee(response[0].GIA_CUOC);
        setShippingFee(response[0].GIA_CUOC);

        // Lưu thông tin giao hàng vào localStorage
        localStorage.setItem(
          "shippingInfo",
          JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            wardId: formData.wardId,
            districtId: formData.districtId,
            provinceId: formData.provinceId,
          })
        );
      } else {
        console.log("No services returned from API.");
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
          value={formData.fullName}
          onChange={handleInputChange}
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
          value={formData.email}
          onChange={handleInputChange}
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
          value={formData.phoneNumber}
          onChange={handleInputChange}
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
          value={formData.address}
          onChange={handleInputChange}
        />

        {/* Province Selection */}
        <label htmlFor="provinceId" className="sr-only">
          Province
        </label>
        <select
          id="provinceId"
          className="px-5 py-4 mt-2 bg-white rounded-2xl w-full"
          value={formData.provinceId || ""}
          onChange={handleInputChange}
        >
          <option value="">Select Province</option>

          {provinces.map((province, index) => (
            <option
              key={province.PROVINCE_ID || index}
              value={province.PROVINCE_ID}
            >
              {province.PROVINCE_NAME}
            </option>
          ))}
        </select>

        {/* District Selection */}
        <label htmlFor="districtId" className="sr-only">
          District
        </label>
        <select
          id="districtId"
          className="px-5 py-4 mt-2 bg-white rounded-2xl w-full"
          value={formData.districtId || ""}
          onChange={handleInputChange}
          disabled={!formData.provinceId}
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district.DISTRICT_ID} value={district.DISTRICT_ID}>
              {district.DISTRICT_NAME}
            </option>
          ))}
        </select>

        {/* Ward Selection */}
        <label htmlFor="wardId" className="sr-only">
          Ward
        </label>
        <select
          id="wardId"
          className="px-5 py-4 mt-2 bg-white rounded-2xl w-full"
          value={formData.wardId || ""}
          onChange={handleInputChange}
          disabled={!formData.districtId}
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
              setLocalShippingFee(selected?.GIA_CUOC || 0);
              setShippingFee(selected?.GIA_CUOC || 0);
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
