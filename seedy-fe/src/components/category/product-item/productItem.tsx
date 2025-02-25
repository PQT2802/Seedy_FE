import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./productItem.module.css";
import { Product } from "@/apiRequests/products";
import cartApiRequest from "@/apiRequests/cart";

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const { id, name, price, imageUrl } = product;
  const [showPopup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) setToken(storedToken);
  }, []);

  const formatPrice = (price: number): string => {
    return `${price.toLocaleString("vi-VN")} VND`;
  };

  const handleAddToCart = (): void => {
    setShowPopup(true);
  };

  const handleConfirmAddToCart = async () => {
    if (quantity < 1) {
      alert("Số lượng phải lớn hơn 0");
      return;
    }

    if (!token) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    try {
      await cartApiRequest.addToCart(id, quantity, token);
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
      setShowPopup(false);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Thêm vào giỏ hàng thất bại.");
    }
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <div className={styles.greenHighlight}></div>
        <div className={styles.productImage}>
          <Image
            src={imageUrl}
            alt={name}
            width={150}
            height={150}
            layout="responsive"
          />
        </div>
      </div>
      <h3 className={styles.productName}>{name}</h3>
      <p className={styles.productPrice}>{formatPrice(price)}</p>
      <button className={styles.addToCartButton} onClick={handleAddToCart}>
        Thêm vào giỏ
      </button>

      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Chọn số lượng</h3>
            <input
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button onClick={handleConfirmAddToCart}>Xác nhận</button>
            <button onClick={() => setShowPopup(false)}>Hủy</button>
          </div>
        </div>
      )}
    </div>
  );
}
