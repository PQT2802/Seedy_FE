"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header/header";
import CartItem from "./cart-item";
import { useRouter } from "next/navigation";
import styles from "./cart.module.css";
import cartApiRequest from "@/apiRequests/cart";

// Define the cart item type based on the API response structure
interface CartItem {
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
      cartItems: Record<string, CartItem>;
    };
  };
}

export default function Page() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Kiểm tra token trong localStorage (hoặc bất kỳ cơ chế nào bạn dùng)
    const token = localStorage.getItem("accessToken"); // Giả định token được lưu với key "token"
    if (!token) {
      setError("You need to log in to view your cart.");
      setLoading(false);
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(true);

    async function fetchCartDetails() {
      try {
        const response = (await cartApiRequest.getDetail()) as CartResponse;
        if (response.statusCode === 200) {
          const items = Object.values(response.extensions.data.cartItems);
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
      prevItems.map((item) =>
        item.productId === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    localStorage.setItem("checkoutCart", JSON.stringify(cartItems));
    localStorage.setItem("checkoutTotal", JSON.stringify(totalAmount));
    router.push("/checkout");
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;

  if (error) {
    return (
      <div className={styles.container}>
        <Header />
        <div className="text-center text-red-500 py-6">{error}</div>
        {!isAuthenticated && (
          <div className="text-center">
            <button
              onClick={handleLoginRedirect}
              className="mt-4 px-6 py-2 bg-customGreen text-white rounded-lg hover:bg-lime-700"
            >
              LOGIN
            </button>
          </div>
        )}
      </div>
    );
  }

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
                  key={item.productId}
                  className="py-3 pr-20 pl-6 mt-7 rounded-2xl bg-lime-950 w-[85%] max-md:px-5 mb-4"
                >
                  <CartItem
                    imageSrc={item.productImageUrl}
                    altText={item.productName}
                    title={item.productName}
                    price={`${item.productPrice.toLocaleString()} VND`}
                    quantity={item.quantity}
                    onQuantityChange={(newQuantity) =>
                      updateQuantity(item.productId, newQuantity)
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
