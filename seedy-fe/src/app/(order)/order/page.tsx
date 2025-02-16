import React from "react";
import styles from "@/app/(user)/information/information.module.css";
import OrderItem from "./order-item";
import Header from "@/components/header/header";
export default function page() {
  const userData = {
    userName: "Sharon",
    avatar: "avatar",
  };

  const cartItems = [
    {
      imageSrc: "/cart/cart-list/flower.png",
      altText: "KHỞI SET product image",
      title: '"KHỞI" SET',
      price: "200.000 VND",
      quantity: 1,
    },
    {
      imageSrc: "/cart/cart-list/box.png",
      altText: "MAKE-PLANT BOX SET product image",
      title: "MAKE-PLANT BOX SET",
      price: "499.000 VND",
      quantity: 1,
    },
    {
      imageSrc: "/cart/cart-list/box.png",
      altText: "MAKE-PLANT BOX SET product image",
      title: "MAKE-PLANT BOX SET",
      price: "499.000 VND",
      quantity: 1,
    },
    {
      imageSrc: "/cart/cart-list/box.png",
      altText: "MAKE-PLANT BOX SET product image",
      title: "MAKE-PLANT BOX SET",
      price: "499.000 VND",
      quantity: 1,
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Left Section */}
          <div className={styles.leftSection}>
            <h1 className={styles.greeting}>Hi, {userData.userName}</h1>
            <div className={styles.avatarWrapper}>
              <img
                src={userData.avatar}
                alt="User Avatar"
                className={styles.avatar}
                loading="lazy"
              />
            </div>
            <div className={styles.infoTabs}>
              <p className={`${styles.tab} ${styles.activeTab}`}>
                Personal Information
              </p>
              <p className={styles.tab}>Your Order</p>
            </div>
          </div>
          {/* Right Section */}
          <div className="bg-white w-full">
            <div className="font-utmavo text-headerGreen text-5xl">
              Your Order
            </div>
            <div className="mt-4 max-h-[450px] overflow-y-auto scrollbar-custom">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-customGreen mb-4 w-[766px] h-[201px] rounded-2xl  flex justify-around"
                >
                  <OrderItem {...item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
