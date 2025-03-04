"use client";

import dashboardApiRequest from "@/apiRequests/dashboard";
import { GenericTable } from "@/components/generic/GenericTable";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  stockQuantity: number;
  price: number;
  imageUrl: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    dashboardApiRequest
      .getProducts()
      .then((res) => setProducts(res.extensions.data));
  }, []);
  console.log(products);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <GenericTable data={products} />
    </div>
  );
}
