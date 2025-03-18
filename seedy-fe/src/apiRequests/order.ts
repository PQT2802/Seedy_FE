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
export interface OrderDetailItem {
  productId: string;
  productName: string;
  productImageUrl: string;
  price: number;
  quantity: number;
}
export interface OrderDetails {
  orderId: string;
  totalPrice: number;
  createdAt: string;
  orderNote: string;
  shippingFee: number;
  orderService: string;
  items: OrderDetailItem[];
}

const orderApiRequest = {
  getUserOrders: () => http.get<Order[]>("api/Order/user/details"),
  getOrderDetail: (orderId: string) =>
    http.get<OrderDetails>(`api/Order/details/${orderId}`),
};

export default orderApiRequest;
