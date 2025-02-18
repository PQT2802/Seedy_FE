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

const paymentApiRequest = {
  checkPayment: (accountNumber: string, amount: number, description: string) =>
    http.get<PaymentCheckResponse>(
      `api/payment/check?accountNumber=${accountNumber}&amount=${amount}&description=${encodeURIComponent(
        description
      )}`
    ),
};

export default paymentApiRequest;
