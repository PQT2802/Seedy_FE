import axios from "axios";

const VIETTELPOST_API_URL = "https://api.viettelpost.com.vn/api/v1";
const API_KEY = "YOUR_API_KEY"; // Thay thế bằng API Key của bạn

const axiosInstance = axios.create({
  baseURL: VIETTELPOST_API_URL,
  headers: {
    "Content-Type": "application/json",
    Token: API_KEY,
  },
});

export const calculateShippingFee = async (data: {
  senderProvince: string;
  senderDistrict: string;
  receiverProvince: string;
  receiverDistrict: string;
  weight: number;
  productType: string;
}) => {
  try {
    const response = await axiosInstance.post("/shipping-fee", data);
    return response.data;
  } catch (error) {
    console.error("Error calculating shipping fee:", error);
    throw error;
  }
};

export const createOrder = async (data: {
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  weight: number;
  productType: string;
}) => {
  try {
    const response = await axiosInstance.post("/create-order", data);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
