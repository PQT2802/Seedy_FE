import http from "@/lib/https";

interface PaymentData {
  transactionId: string;
  bank: string;
  date: string;
  amount: string;
  description: string;
}

interface OrderRequest {
  AccountNumber: string;
  Amount: number;
  Description: string;
  ShippingFee: number;
  Items: { ProductId: string; Quantity: number; Price: number }[];
  Receiver: {
    FullName: string;
    Address: string;
    Phone: string;
    Email: string;
    WardId: number;
    WardName: string;
    DistrictId: number;
    DistrictName: string;
    ProvinceId: number;
    ProvinceName: string;
  };
}

const paymentApiRequest = {
  checkPayment: (accountNumber: string, amount: number, description: string) =>
    http.get<PaymentData>(
      `api/payment/check?accountNumber=${accountNumber}&amount=${amount}&description=${encodeURIComponent(
        description
      )}`
    ),
  createOrderAndCheckPayment: (orderData: OrderRequest) =>
    http.post<PaymentData>("/api/payment/create-and-check", orderData),
  createOrderCOD: (orderData: OrderRequest) =>
    http.post<{ message: string }>("/api/payment/create-cod", orderData),
};

export default paymentApiRequest;
