import http from "@/lib/https";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  price: number;
  occasionName: string;
  productCategoryId: string;
  occasionId: string;
  imageStream: string;
  note: string;
  description: string;
  productImageUrls: [];
}

const productApiRequest = {
  getAllProducts: () => http.get<Product[]>(`api/Product/all`),

  getProductDetail: async (id: string): Promise<ProductDetail> => {
    const res = await http.get<{ extensions: { data: ProductDetail } }>(
      `api/Product/${id}`
    );
    return res.extensions.data as unknown as ProductDetail; // ✅ Explicitly cast to `ProductDetail`
  },
};

export default productApiRequest;
