"use client"; // Ensure this runs only in the client-side

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Use next/navigation instead of next/router
import { ArrowRight } from "lucide-react";
import dashboardApiRequest from "@/apiRequests/dashboard";

export default function StatisticsCards() {
  const router = useRouter(); // ✅ Ensure it's only used in the client
  const [orderCount, setOrderCount] = useState<number>(0);
  const [productCount, setProductCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [orders, products, users] = await Promise.all([
          dashboardApiRequest.getOrders(),
          dashboardApiRequest.getProducts(),
          dashboardApiRequest.getUsers(),
        ]);

        setOrderCount(orders.extensions.data.length);
        setProductCount(products.extensions.data.length);
        setUserCount(users.extensions.data.length);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchCounts();
  }, []);

  const statistics = [
    { title: "Tổng đơn hàng", count: orderCount, path: "/dashboard/orders" },
    {
      title: "Tống sản phẩm",
      count: productCount,
      path: "/dashboard/products",
    },
    { title: "Tổng người dùng", count: userCount, path: "/dashboard/users" },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {statistics.map((stat, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-6 bg-green-600 text-white rounded-xl shadow-lg cursor-pointer hover:bg-green-700 transition-all"
          onClick={() => router.push(stat.path)}
        >
          <div>
            <h2 className="text-2xl font-bold">{stat.title}</h2>
            <p className="text-4xl font-semibold mt-2">{stat.count}</p>
          </div>
          <ArrowRight className="w-10 h-10" />
        </div>
      ))}
    </div>
  );
}
