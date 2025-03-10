import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./productItem.module.css";
import { Product } from "@/apiRequests/products";
import cartApiRequest from "@/apiRequests/cart";
import { ShoppingCart } from "lucide-react";
import ProductBackGround from "@/components/background/product-background";
import Link from "next/link";

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const { id, name, price, imageUrl } = product;
  const [token, setToken] = useState("");
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) setToken(storedToken);
  }, []);

  const formatPrice = (price: number): string => {
    return `${price.toLocaleString("vi-VN")} VND`;
  };

  const handleAddToCart = async () => {
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    setAnimating(true);

    try {
      await cartApiRequest.addToCart(id, 1, token);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Thêm vào giỏ hàng thất bại.");
    }

    setTimeout(() => {
      setAnimating(false);
    }, 1000);
  };

  return (
    <div className={styles.productCard}>
      <Link href={`/products/${id}`} passHref>
        <div className={styles.imageContainer}>
          <div className={styles.svgHighlight}>
            <ProductBackGround />
          </div>
          <div className={styles.productImage}>
            <Image
              src={imageUrl}
              alt={name}
              width={150}
              height={150}
              layout="intrinsic"
              className={animating ? styles.animateImage : ""}
            />
          </div>
        </div>
      </Link>

      <h3 className={styles.productName}>{name}</h3>
      <p className={styles.productPrice}>{formatPrice(price)}</p>
      <button className={styles.addToCartButton} onClick={handleAddToCart}>
        <span>Thêm vào giỏ</span>
        <ShoppingCart />
      </button>

      {animating && (
        <div className={styles.flyingImageContainer}>
          <Image
            src={imageUrl}
            alt={name}
            width={50}
            height={50}
            className={styles.flyingImage}
          />
        </div>
      )}
    </div>
  );
}
