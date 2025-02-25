import http from "@/lib/http";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

interface ProductResponse {
  status: number;
  payload: {
    extensions: {
      message: string;
      data?: Product[];
    };
  };
}

const productApiRequest = {
  getAllProducts: async (): Promise<ProductResponse> => {
    return await http.get<ProductResponse>(`api/Product/all`);
  },
};

export default productApiRequest;
