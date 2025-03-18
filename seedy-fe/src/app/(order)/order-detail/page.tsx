"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image"; // Import Image
import styles from "@/app/(user)/information/information.module.css";
import OrderDetailItem from "./order-detail-item";
import Header from "@/components/header/header";
import { useSearchParams } from "next/navigation";
import orderApiRequest, { OrderDetails } from "@/apiRequests/order";
import Link from "next/link";

function OrderDetailContent() {
  const searchParams = useSearchParams();
  const userName = searchParams?.get("userName") || "Guest";
  const avatar = searchParams?.get("avatar") || "/avatar.png";
  const orderId = searchParams?.get("orderId");

  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) {
      setError("Order ID is missing");
      setLoading(false);
      return;
    }
    const fetchOrderDetails = async () => {
      try {
        const data = await orderApiRequest.getOrderDetail(orderId);
        const orderDetails = {
          ...data.extensions.data,
          items: data.extensions.data.items.map((item) => ({
            ...item,
            productImageUrl: item.productImageUrl, // Map imageUrl to productImageUrl
          })),
        };
        setOrder(orderDetails);
      } catch (err) {
        setError("Failed to fetch order details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!order) {
    return <p>Order not found</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Left Section */}
          <div className={styles.leftSection}>
            <h1 className={styles.greeting}>Hi, {userName}</h1>
            <div className={styles.avatarWrapper}>
              <Image
                src={avatar}
                alt="User Avatar"
                className={styles.avatar}
                width={100}
                height={100}
              />
            </div>
            <div className={styles.infoTabs}>
              <p className={styles.tab}>Personal Information</p>
              <p className={`${styles.tab} ${styles.activeTab}`}>Your Order</p>
            </div>
          </div>
          {/* Right Section */}
          <div className="bg-white w-full p-4">
            <div className="font-utmavo text-headerGreen text-5xl">
              Chi Tiết Đơn Hàng
            </div>
            <div className="mt-4">
              <Link
                href="/order"
                className="bg-green-950 text-white p-3 rounded-lg"
              >
                Quay Lại Đơn Hàng
              </Link>
            </div>
            <div className="mt-4 bg-customGreen p-4 rounded-2xl">
              <div className="bg-lime-300 p-4 rounded-t-2xl flex justify-between text-black">
                <span className="font-bold">Order ID: {order.orderId}</span>
                <span>
                  Ngày:{" "}
                  {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="max-h-[300px] overflow-y-auto scrollbar-custom mt-4">
                {order.items.map((item, index) => (
                  <OrderDetailItem key={index} item={item} />
                ))}
              </div>
              <div className="bg-lime-300 p-4 rounded-b-2xl mt-4 text-black">
                <p>Ghi Chú: {order.orderNote}</p>
                <p>Dịch Vụ: {order.orderService}</p>
                <p>
                  Phí Vận Chuyển: {order.shippingFee.toLocaleString("vi-VN")}{" "}
                  VND
                </p>
                <p className="font-bold">
                  Tổng Cộng: {order.totalPrice.toLocaleString("vi-VN")} VND
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderDetailContent />
    </Suspense>
  );
}
