import { CarouselSize } from "@/components/carousel-list-items/carousel-list-items";
import { CarouselPlugin } from "@/components/carousel-plugin/carousel-plugin";

import React from "react";
import styles from "./product.module.css";
import Header from "@/components/header/header";
import Image from "next/image";

export default function Product() {
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.item}>
        <div className={styles.productInfo}>
          <div className={styles.carouselContainer}>
            <CarouselPlugin />
          </div>
          <div className={styles.detailsContainer}>
            <h1 className={styles.title}>Flower Bloom &quot;Khơi&quot; Set</h1>
            <p className={styles.price}>200,000 VND</p>
            <p className={styles.note}>
              Note: This product requires a 1-5 day pre-order.
            </p>
            <div className={styles.buttonsContainer}>
              <button className={styles.sizeButton}>One Size</button>
              <button className={styles.buyButton}>Buy Now</button>
              <button className={styles.cartButton}>Add to Cart</button>
              <button className={styles.shareButton}>Share</button>
            </div>
          </div>
        </div>

        <div className={styles.descriptionSection}>
          <h2 className={styles.descriptionTitle}>&quot;Khơi&quot;</h2>
          <p className={styles.descriptionText}>
            Peach blossom: The symbol of spring and beginnings. &quot;Khơi&quot;
            carries the meaning of a start, where ideas bloom, bringing hope and
            new promises.
          </p>
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
    </div>
  );
}
