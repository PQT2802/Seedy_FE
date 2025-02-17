import Header from "@/components/header/header";
import React from "react";
import CartItem from "./cart-item";
import Link from "next/link";
import styles from './cart.module.css';
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

export default function page() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.cartWrapper}>
        <div className={`${styles.cartBox} ${styles['cartBox.maxMd']}`}>
          <h1 className= {`${styles.title} font-mantra text-headerGreen ${styles['title.maxMd']}`}>
            YOUR CART
          </h1>

          <div className={`${styles.cartList} overflow-y-auto scrollbar-custom`}>
            {cartItems.map((item, index) => (
              <div
                key={index}
                className={`py-3 pr-20 pl-6 mt-${
                  index === 0 ? "9" : "7"
                }  rounded-2xl bg-lime-950 w-[100%] max-w-[1340px] max-md:px-5`}
              >
                <CartItem {...item} />
              </div>
            ))}
          </div>
          <div className={`${styles.totalWrapper} ${styles['totalWrapper.maxMd']}`}>
            <div className={`${styles.totalBox} ${styles['totalBox.maxMd']} bg-lime-950 `}>
              <div className="text-4xl text-white">TOTAL:</div>
              <div className= {`${styles.totalAmount} text-customGreen`}>
                699.000 VND
              </div>
            </div>
            <Link
              href="/checkout"
              className={`${styles.checkoutButton} ${styles['checkoutButton.maxMd']} border-lime-950`}
            >
              CHECK OUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
