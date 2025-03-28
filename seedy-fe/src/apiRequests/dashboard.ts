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
export interface Payment {
  id: string;
  userId: string;
  userName: string;
  email: string;
  transactionId: string;
  bankBrandName: string;
  accountNumber: string;
  amount: number;
  transactionContent: string;
  transactionDate: string;
  referenceNumber: string;
  status: string;
  paymentMethod: string;
}

export interface RevenueOverTime {
  date: Date;
  revenue: number;
  totalPayment: number;
}

export interface SalesCategory {
  category: string;
  revenue: number;
}

export interface TopSellingCard {
  cardName: string;
  revenue: number;
}

export interface DashboardRevenueDto {
  revenueOverTime: RevenueOverTime[];
  salesByCategory: SalesCategory[];
  topSellingCards: TopSellingCard[];
}

const dashboardApiRequest = {
  getOrders: () => http.get<Order[]>(`api/Admin/orders`),
  getProducts: () => http.get<Product[]>(`api/Admin/products`),
  getUsers: () => http.get<User[]>(`api/Admin/users`),
  getPayments: () => http.get<Payment[]>(`api/Admin/payments`),
  getRevunes: () => http.get<DashboardRevenueDto>(`api/Admin/revenues`),
};

export default dashboardApiRequest;
