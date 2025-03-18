"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header/header";
import CartItem from "./cart-item";
import { useRouter } from "next/navigation";
import styles from "./cart.module.css";
import cartApiRequest from "@/apiRequests/cart";

// Define the cart item type based on the API response structure
interface CartItem {
  cartItemId: string; // Thêm cartItemId
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  productImageUrl: string;
  productStockQuantity: number;
}

// Define the full response type for the API
interface CartResponse {
  title: string;
  statusCode: number;
  type: string;
  extensions: {
    data: {
      cartID: string;
      userID: string;
      cartItems: Record<string, CartItem>; // Key là cartItemId
    };
  };
}

export default function Page() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("accessToken"); // Thay bằng cách lấy token thực tế (localStorage, context, etc.)

  useEffect(() => {
    async function fetchCartDetails() {
      try {
        const response = (await cartApiRequest.getDetail()) as CartResponse;
        if (response.statusCode === 200) {
          const items = Object.entries(response.extensions.data.cartItems).map(
            ([cartItemId, item]) => ({
              ...item,
              cartItemId, // Thêm cartItemId vào dữ liệu
            })
          );
          setCartItems(items);
        } else {
          setError("Failed to load cart data");
        }
      } catch (err) {
        setError("Error fetching cart data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCartDetails();
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        console.log(
          item.productId === id ? { ...item, quantity: newQuantity } : item
        );

        return item.productId === id
          ? { ...item, quantity: newQuantity }
          : item;
      })
    );
  };

  const removeItem = (cartItemId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  const handleCheckout = () => {
    localStorage.setItem("checkoutCart", JSON.stringify(cartItems));
    localStorage.setItem("checkoutTotal", JSON.stringify(totalAmount));
    router.push("/checkout");
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
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
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.cartItemId} // Sử dụng cartItemId làm key
                  className="py-3 pr-20 pl-6 mt-7 rounded-2xl bg-lime-950 w-[85%] max-md:px-5 mb-4"
                >
                  <CartItem
                    cartItemId={item.cartItemId}
                    imageSrc={item.productImageUrl}
                    altText={item.productName}
                    title={item.productName}
                    price={`${item.productPrice.toLocaleString()} VND`}
                    quantity={item.quantity}
                    token={token ?? ""}
                    onQuantityChange={(newQuantity) =>
                      updateQuantity(item.productId, newQuantity)
                    }
                    onRemove={() => removeItem(item.cartItemId)}
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
