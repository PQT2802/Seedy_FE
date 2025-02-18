"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header/header";
import CartItem from "./cart-item";
import { useRouter } from "next/navigation";
import styles from "./cart.module.css";

import { GetCartResType } from "@/schemaValidations/cart.schema";
import cartApiRequest from "@/apiRequests/cart";

export default function Page() {
  const router = useRouter();
  const [cartData, setCartData] = useState<GetCartResType | null>(null);
  const [cartItems, setCartItems] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCartDetails() {
      try {
        const response = await cartApiRequest.getDetail();
        if (response.status === 200) {
          setCartData(response.payload);
          setCartItems(response.payload?.extensions.data.cartItems ?? {});
        } else {
          setError("Failed to load cart data");
        }
      } catch (err) {
        setError("Error fetching cart data");
      } finally {
        setLoading(false);
      }
    }
    fetchCartDetails();
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [id]: {
        ...prevCartItems[id],
        quantity: newQuantity,
      },
    }));
  };

  const handleCheckout = () => {
    // Save cart items & total amount to localStorage before navigating
    localStorage.setItem("checkoutCart", JSON.stringify(cartItems));
    localStorage.setItem("checkoutTotal", JSON.stringify(totalAmount));
    router.push("/checkout"); // Navigate to checkout
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const totalAmount = Object.values(cartItems).reduce(
    (sum, item: any) => sum + item.productPrice * item.quantity,
    0
  );

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.cartWrapper}>
        <div className={`${styles.cartBox} ${styles["cartBox.maxMd"]}`}>
          <h1
            className={`${styles.title} font-mantra text-headerGreen ${styles["title.maxMd"]}`}
          >
            YOUR CART
          </h1>

          <div
            className={`${styles.cartList} overflow-y-auto scrollbar-custom`}
          >
            {Object.keys(cartItems).length > 0 ? (
              Object.entries(cartItems).map(([id, item]) => (
                <div
                  key={id}
                  className="py-3 pr-20 pl-6 mt-7 rounded-2xl bg-lime-950 w-[85%] max-md:px-5 mb-4"
                >
                  <CartItem
                    imageSrc={item.productImageUrl}
                    altText={item.productName}
                    title={item.productName}
                    price={`${item.productPrice.toLocaleString()} VND`}
                    quantity={item.quantity}
                    onQuantityChange={(newQuantity) =>
                      updateQuantity(id, newQuantity)
                    }
                  />
                </div>
              ))
            ) : (
              <div className="text-center text-white py-6">
                Your cart is empty.
              </div>
            )}
          </div>

          <div
            className={`${styles.totalWrapper} ${styles["totalWrapper.maxMd"]}`}
          >
            <div
              className={`${styles.totalBox} ${styles["totalBox.maxMd"]} bg-lime-950`}
            >
              <div className="text-4xl text-white">TOTAL:</div>
              <div className={`${styles.totalAmount} text-customGreen`}>
                {totalAmount.toLocaleString()} VND
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className={`${styles.checkoutButton} ${styles["checkoutButton.maxMd"]} border-lime-950`}
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
