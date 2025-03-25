"use client";
import React, { useEffect, useState } from "react";
import styles from "./product.module.css";
import Header from "@/components/header/header";
import Image from "next/image";
import NumberCounter from "@/components/ui/number-counter";
import { ShoppingCart } from "lucide-react";
import Footer from "@/components/footer/footer";

import { useParams, useRouter } from "next/navigation";
import productApiRequest, {
  Product,
  ProductDetail,
} from "@/apiRequests/products";
import { CarouselDetail } from "@/components/generic/CarouselDetail";
import cartApiRequest from "@/apiRequests/cart";
import ArrowIcon from "@/components/background/Arrow";
import { CarouselList } from "@/components/generic/CarouselList";

export default function ProductInfor() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [animating, setAnimating] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
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

  useEffect(() => {
    if (product?.occasionId) {
      const fetchProducts = async () => {
        try {
          const response = await productApiRequest.getRelateProducts({
            OccasionId: product.occasionId,
            MaxProducts: 10,
          });

          setProducts(response.extensions.data);
        } catch (error) {
          console.error("Error fetching related products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [product?.occasionId]);

  const handleBackClick = () => {
    router.replace("/products");
  };

  const handleAddToCart = async () => {
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    setAnimating(true);
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
              <NumberCounter />
              <button className={styles.buyButton}>MUA NGAY</button>
              <button className={styles.cartButton} onClick={handleAddToCart}>
                <span>THÊM VÀO GIỎ</span>
                <ShoppingCart />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.relatedProductsSection}>
        <h1 className={styles.relatedTitle}>YOU MAY ALSO LIKE...</h1>
        {loading ? <p>Loading...</p> : <CarouselList products={products} />}
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
