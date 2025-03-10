"use client";
import { CarouselSize } from "@/components/carousel-list-items/carousel-list-items";
import { CarouselPlugin } from "@/components/carousel-plugin/carousel-plugin";

import React from "react";
import styles from "./product.module.css";
import Header from "@/components/header/header";
import Image from "next/image";
import NumberCounter from "@/components/ui/number-counter";
import { Share2, ShoppingCart } from "lucide-react";
import Footer from "@/components/footer/footer";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import productApiRequest, { ProductDetail } from "@/apiRequests/products";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);

  useEffect(() => {
    if (id) {
      productApiRequest.getProductDetail(id as string).then((data) => {
        setProduct(data); // ✅ Fix: Extract correct data
      });
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.item}>
        <div className={styles.productInfo}>
          <div className={styles.carouselContainer}>
            <CarouselPlugin />
          </div>
          <div className={styles.detailsContainer}>
            <h1 className={styles.title}>{product?.name}</h1>
            <p className={styles.price}>{product?.price}</p>
            <p className={styles.note}>Note: {product?.note}</p>
            <div className={styles.buttonsContainer}>
              <button className={styles.sizeButton}>One Size</button>
              <NumberCounter />
              <div></div>
              <button className={styles.buyButton}>Buy Now</button>
              <button className={styles.cartButton}>
                <span>Add to Cart</span>
                <ShoppingCart />
              </button>
              <Share2 className="w-10 h-10 text-green-500 mt-3" />
            </div>
          </div>
        </div>

        <div className={styles.descriptionSection}>
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
          <div className={styles.descriptionImage}>
            <Image
              src="/post 1 1.png"
              alt=""
              width={200}
              height={300}
              className={styles[""]}
            />
            <Image
              src="/Render_Mockup_1920_1920_2024-11-05 2.png"
              alt=""
              width={200}
              height={300}
              className={styles[""]}
            />
            <Image
              src="/IMG_3962 1.png"
              alt=""
              width={200}
              height={300}
              className={styles["bush"]}
            />
          </div>
        </div>
      </div>

      <div className={styles.relatedProductsSection}>
        <h1 className={styles.relatedTitle}>YOU MAY ALSO LIKE...</h1>
        <CarouselSize />
      </div>
      <div className={styles.customfooter}>
        <Footer />
      </div>
    </div>
  );
}
