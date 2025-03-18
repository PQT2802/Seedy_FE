import http from "@/lib/https";

interface Order {
  id: string;
  orderService: string;
  totalPrice: number;
  receiverFullName: string;
  receiverAddress: string;
  provinceName: string;
  districtName: string;
  wardName: string;
}

interface Product {
  id: string;
  name: string;
  stockQuantity: number;
  price: number;
  imageUrl: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}
interface Payment {
  id: string;
  userId: string;
  email: string;
  transactionId: string;
  bankBrandName: string;
  accountNumber: string;
  amount: number;
  transactionContent: string;
  transactionDate: string;
  referenceNumber: string;
}

const dashboardApiRequest = {
  getOrders: () => http.get<Order[]>(`api/Admin/orders`),
  getProducts: () => http.get<Product[]>(`api/Admin/products`),
  getUsers: () => http.get<User[]>(`api/Admin/users`),
  getPayments: () => http.get<Payment[]>(`api/Admin/payments`),
};

export default dashboardApiRequest;
