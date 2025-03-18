"use client";
import { CarouselSize } from "@/components/carousel-list-items/carousel-list-items";

import React from "react";
import styles from "./product.module.css";
import Header from "@/components/header/header";
import Image from "next/image";
import NumberCounter from "@/components/ui/number-counter";
import { ShoppingCart } from "lucide-react";
import Footer from "@/components/footer/footer";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import productApiRequest, { ProductDetail } from "@/apiRequests/products";
import { CarouselDetail } from "@/components/generic/CarouselDetail";
import cartApiRequest from "@/apiRequests/cart";
import ArrowIcon from "@/components/background/Arrow";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [animating, setAnimating] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) setToken(storedToken);
  }, []);
  useEffect(() => {
    if (id) {
      productApiRequest.getProductDetail(id as string).then((data) => {
        setProduct(data);

        // Ensure imageStream is not null/undefined before merging
        const mergedImages = [
          ...(data.imageStream ? [data.imageStream] : []),
          ...(data.productImageUrls || []),
        ];
        setImages(mergedImages);
      });
    }
  }, [id]);
  const handleBackClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace("/products");
    }
  };

  const handleAddToCart = async () => {
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    setAnimating(true);
    console.log("Animation started:", animating);

    try {
      await cartApiRequest.addToCart(id as string, 1, token);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Thêm vào giỏ hàng thất bại.");
    }

    setTimeout(() => {
      setAnimating(false);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.item}>
        <button className={styles.arrow} onClick={handleBackClick}>
          <ArrowIcon color="#234014" width={100} height={50} />
        </button>
        <div className={styles.productInfo}>
          <div className={styles.carouselContainer}>
            {images.length > 0 ? (
              <CarouselDetail images={images} />
            ) : (
              <p>No images available</p>
            )}
          </div>
          <div className={styles.detailsContainer}>
            <h2 className={styles.occasionName}>
              &quot;{product?.occasionName}&quot;
            </h2>
            <h1 className={styles.title}>{product?.name}</h1>
            <p className={styles.price}>
              {product?.price
                ? new Intl.NumberFormat("vi-VN").format(product.price)
                : ""}{" "}
              VND
            </p>
            <p className={styles.note}>Note: {product?.note}</p>
            <div className={styles.buttonsContainer}>
              {/* <button className={styles.sizeButton}>One Size</button> */}
              <NumberCounter />
              <div></div>
              <button className={styles.buyButton}>MUA NGAY</button>
              <button className={styles.cartButton} onClick={handleAddToCart}>
                <span>THÊM VÀO GIỎ</span>
                <ShoppingCart />
              </button>
              {/* <Share2 className="w-10 h-10 text-green-500 mt-3" /> */}
            </div>
          </div>
        </div>
        {/* <div className={styles.descriptionSection}>
          <h2 className={styles.descriptionTitle}>{product?.name}</h2>
          <p className={styles.descriptionText}>{product?.description}</p>
          <Image
            src="/grass.png"
            alt=""
            width={250}
            height={450}
            className={styles["grass"]}
          />
          <Image
            src="/bush.png"
            alt=""
            width={200}
            height={300}
            className={styles["bush"]}
          />
        </div> */}
      </div>
      <div className={styles.relatedProductsSection}>
        <h1 className={styles.relatedTitle}>YOU MAY ALSO LIKE...</h1>
        <CarouselSize />
      </div>
      <div className={styles.customfooter}>
        <Footer />
      </div>
      {animating && product?.imageStream && (
        <div className={styles.flyingImageContainer}>
          <Image
            src={
              typeof product.imageStream === "string"
                ? product.imageStream
                : "/background-product.png"
            }
            alt={product?.name || "Product Image"}
            width={50}
            height={50}
            className={styles.flyingImage}
          />
        </div>
      )}
    </div>
  );
}
