import http from "@/lib/https";

interface Order {
  id: string;
  orderService: string;
  totalPrice: number;
  receiverFullName: string;
  receiverAddress: string;
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

const dashboardApiRequest = {
  getOrders: () => http.get<Order[]>(`api/Admin/orders`),
  getProducts: () => http.get<Product[]>(`api/Admin/products`),
  getUsers: () => http.get<User[]>(`api/Admin/users`),
};

export default dashboardApiRequest;
