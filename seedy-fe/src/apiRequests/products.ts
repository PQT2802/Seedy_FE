import http from "@/lib/http";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

const productApiRequest = {
  getAllProducts: () => http.get(`api/Product/all`),
};

export default productApiRequest;
