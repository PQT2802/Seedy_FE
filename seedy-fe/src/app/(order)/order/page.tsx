"use client";

import React, { useEffect, useState, Suspense } from "react";
import styles from "@/app/(user)/information/information.module.css";
import OrderItem from "./order-item";
import Header from "@/components/header/header";
import { useSearchParams } from "next/navigation";
import orderApiRequest, { Order } from "@/apiRequests/order";

// Separate component to use useSearchParams with Suspense
function OrderContent() {
  const searchParams = useSearchParams();
  const userName = searchParams?.get("userName") || "Guest";
  const avatar = searchParams?.get("avatar") || "/avatar.png";

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderApiRequest.getUserOrders();
        const data = response.extensions.data;
        setOrders(data);
      } catch (err) {
        setError("Failed to fetch orders");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Left Section */}
          <div className={styles.leftSection}>
            <h1 className={styles.greeting}>Hi, {userName}</h1>
            <div className={styles.avatarWrapper}>
              <img
                src={avatar}
                alt="User Avatar"
                className={styles.avatar}
                loading="lazy"
              />
            </div>
            <div className={styles.infoTabs}>
              <p className={styles.tab}>Personal Information</p>
              <p className={`${styles.tab} ${styles.activeTab}`}>Your Order</p>
            </div>
          </div>
          {/* Right Section */}
          <div className="bg-white w-full">
            <div className="font-utmavo text-headerGreen text-5xl">
              Your Order
            </div>
            {loading ? (
              <p>Loading orders...</p>
            ) : error ? (
              <p className={styles.error}>{error}</p>
            ) : (
              <div className="mt-4 max-h-[450px] overflow-y-auto scrollbar-custom">
                {orders.map((order, index) => (
                  <div
                    key={index}
                    className="bg-customGreen mb-4 w-[766px] h-[201px] rounded-2xl flex justify-around"
                  >
                    <OrderItem order={order} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense
export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading search params...</div>}>
      <OrderContent />
    </Suspense>
  );
}
