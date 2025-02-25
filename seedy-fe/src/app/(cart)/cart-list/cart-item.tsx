"use client";

import Image from "next/image";
import React, { useState } from "react";
import styles from "./cart-Item.module.css";

interface CartItemProps {
  imageSrc: string;
  altText: string;
  title: string;
  price: string;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

export default function CartItem({
  imageSrc,
  altText,
  title,
  price,
  quantity,
  onQuantityChange,
}: CartItemProps) {
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const increaseQuantity = () => {
    const newQuantity = itemQuantity + 1;
    setItemQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const decreaseQuantity = () => {
    const newQuantity = itemQuantity > 1 ? itemQuantity - 1 : 1;
    setItemQuantity(newQuantity);
    onQuantityChange(newQuantity);
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
        </div>
      </div>
    </div>
  );
}
