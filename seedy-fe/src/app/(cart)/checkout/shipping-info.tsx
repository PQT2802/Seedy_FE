"use client";
import React, { useEffect, useState } from "react";
import viettelPostApi from "@/apiRequests/viettelpost";

// Cập nhật interface để khớp với BE và viettelpost.ts
interface Province {
  provinceId: number;
  provinceCode: string;
  provinceName: string;
}

interface District {
  districtId: number;
  districtName: string;
  provinceId: number; // Không dùng trong UI nhưng giữ để khớp BE
}

interface Ward {
  wardId: number;
  wardName: string;
  districtId: number; // Không dùng trong UI nhưng giữ để khớp BE
}

interface ShippingService {
  maDvChinh: string;
  tenDichVu: string;
  giaCuoc: number;
  thoiGian: string;
  exchangeWeight: number;
  extraServices: Array<{
    serviceCode: string;
    serviceName: string;
    description: string | null;
  }>;
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
      console.log("Provinces Data:", data);
      setProvinces(data); // Dữ liệu đã khớp với interface, không cần map lại
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
      (ward) => ward.wardId === formData.wardId
    )?.wardName;
    const receiverDistrict = districts.find(
      (district) => district.districtId === formData.districtId
    )?.districtName;
    const receiverProvince = provinces.find(
      (province) => province.provinceId === formData.provinceId
    )?.provinceName;

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
        setSelectedService(response[0].maDvChinh); // Dùng camelCase
        setLocalShippingFee(response[0].giaCuoc); // Dùng camelCase
        setShippingFee(response[0].giaCuoc); // Dùng camelCase

        const receiverWard =
          wards.find((ward) => ward.wardId === formData.wardId)?.wardName || "";
        const receiverDistrict =
          districts.find(
            (district) => district.districtId === formData.districtId
          )?.districtName || "";
        const receiverProvince =
          provinces.find(
            (province) => province.provinceId === formData.provinceId
          )?.provinceName || "";

        localStorage.setItem(
          "shippingInfo",
          JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            wardId: formData.wardId,
            wardName: receiverWard,
            districtId: formData.districtId,
            districtName: receiverDistrict,
            provinceId: formData.provinceId,
            provinceName: receiverProvince,
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
          {provinces.map((province) => (
            <option key={province.provinceId} value={province.provinceId}>
              {province.provinceName}
            </option>
          ))}
        </select>

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
            <option key={district.districtId} value={district.districtId}>
              {district.districtName}
            </option>
          ))}
        </select>

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
            <option key={ward.wardId} value={ward.wardId}>
              {ward.wardName}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="px-5 py-2 mt-4 bg-white rounded-xl w-full"
          onClick={handleCalculateShipping}
        >
          Calculate Shipping Fee
        </button>

        {services.length > 0 && (
          <select
            id="shippingService"
            className="px-5 py-4 mt-2 bg-white rounded-2xl w-full"
            value={selectedService}
            onChange={(e) => {
              const selected = services.find(
                (s) => s.maDvChinh === e.target.value
              );
              setSelectedService(e.target.value);
              setLocalShippingFee(selected?.giaCuoc || 0);
              setShippingFee(selected?.giaCuoc || 0);
            }}
          >
            {services.map((service) => (
              <option key={service.maDvChinh} value={service.maDvChinh}>
                {service.tenDichVu} - {service.giaCuoc.toLocaleString()} VND (
                {service.thoiGian})
              </option>
            ))}
          </select>
        )}
      </form>
    </div>
  );
}
