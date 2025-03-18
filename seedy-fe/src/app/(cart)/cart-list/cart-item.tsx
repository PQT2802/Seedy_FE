"use client";

import Image from "next/image";
import React, { useState } from "react";
import styles from "./cart-Item.module.css";
import cartApiRequest from "@/apiRequests/cart";
import { Trash2 } from "lucide-react";

interface CartItemProps {
  cartItemId: string; // Thêm cartItemId để xác định sản phẩm trong giỏ hàng
  imageSrc: string;
  altText: string;
  title: string;
  price: string;
  quantity: number;
  token: string; // Thêm token để xác thực API
  onQuantityChange: (newQuantity: number) => void;
  onRemove: () => void; // Callback để thông báo xóa sản phẩm
}

export default function CartItem({
  cartItemId,
  imageSrc,
  altText,
  title,
  price,
  quantity,
  token,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const increaseQuantity = async () => {
    const newQuantity = itemQuantity + 1;
    setItemQuantity(newQuantity);
    onQuantityChange(newQuantity);
    try {
      await cartApiRequest.updateCartItem(cartItemId, newQuantity, token);
    } catch (error) {
      console.error("Error updating quantity:", error);
      setItemQuantity(quantity); // Hoàn nguyên nếu lỗi
      onQuantityChange(quantity);
    }
  };

  const decreaseQuantity = async () => {
    const newQuantity = itemQuantity > 1 ? itemQuantity - 1 : 1;
    setItemQuantity(newQuantity);
    onQuantityChange(newQuantity);
    try {
      await cartApiRequest.updateCartItem(cartItemId, newQuantity, token);
    } catch (error) {
      console.error("Error updating quantity:", error);
      setItemQuantity(quantity); // Hoàn nguyên nếu lỗi
      onQuantityChange(quantity);
    }
  };

  const handleRemove = async () => {
    try {
      await cartApiRequest.removeCartItem(cartItemId, token);
      onRemove(); // Gọi callback để cập nhật danh sách giỏ hàng
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            width={300}
            height={300}
            src={imageSrc}
            alt={altText}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.details}>
          <div className={styles.boxprice}>
            <div className={styles.title}>{title}</div>
            <div className={styles.price}>{price}</div>
          </div>
          <div className={styles.quantityControl}>
            <button
              aria-label="Decrease quantity"
              className="focus:outline-none"
              onClick={decreaseQuantity}
            >
              -
            </button>
            <div className="self-stretch">{itemQuantity}</div>
            <button
              aria-label="Increase quantity"
              className="focus:outline-none"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
          <button
            aria-label="Remove item"
            className="text-red-500 focus:outline-none ml-4"
            onClick={handleRemove}
          >
            <Trash2 size={30} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}
