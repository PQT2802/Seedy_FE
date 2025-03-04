import http from "@/lib/https";

export interface OrderItem {
  productId: string;
  productName: string;
  productImageUrl: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  createdDate: string;
  orderItems: OrderItem[];
}

const orderApiRequest = {
  getUserOrders: () => http.get<Order[]>("api/Order/user/details"),
};

export default orderApiRequest;
