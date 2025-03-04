import http from "@/lib/https";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

const productApiRequest = {
  getAllProducts: () => http.get<Product[]>(`api/Product/all`),
};

export default productApiRequest;
