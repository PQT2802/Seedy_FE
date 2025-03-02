import http from "@/lib/http";

interface PaymentData {
  transactionId: string;
  bank: string;
  date: string;
  amount: string;
  description: string;
}

interface PaymentCheckResponse {
  status: number;
  payload: {
    message: string;
    data?: PaymentData;
  };
}
interface OrderRequest {
  accountNumber: string;
  amount: number;
  description: string;
  shippingFee: number;
  items: { productId: string; quantity: number; price: number }[];
  receiver: {
    fullName: string;
    address: string;
    phone: string;
    email: string;
    wardId: number;
    districtId: number;
    provinceId: number;
  };
}

const paymentApiRequest = {
  checkPayment: (accountNumber: string, amount: number, description: string) =>
    http.get<PaymentCheckResponse>(
      `api/payment/check?accountNumber=${accountNumber}&amount=${amount}&description=${encodeURIComponent(
        description
      )}`
    ),
  createOrderAndCheckPayment: (orderData: OrderRequest) =>
    http.post<PaymentCheckResponse>("/api/payment/create-and-check", orderData),
  createOrderCOD: (orderData: OrderRequest) =>
    http.post<{ status: number; payload: { message: string } }>(
      "/api/payment/create-cod",
      orderData
    ),
};

export default paymentApiRequest;
