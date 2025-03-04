"use client";

import dashboardApiRequest from "@/apiRequests/dashboard";
import { GenericTable } from "@/components/generic/GenericTable";
import { useEffect, useState } from "react";

interface Order {
  id: string;
  orderService: string;
  totalPrice: number;
  receiverFullName: string;
  receiverAddress: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    dashboardApiRequest
      .getOrders()
      .then((res) => setOrders(res.extensions.data));
  }, []);
  console.log(orders);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <GenericTable data={orders} />
    </div>
  );
}
