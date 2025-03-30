import React from "react";
import Image from "next/image";
import styles from "./intro.module.css";

export default function Intro() {
  return (
    <div className={`${styles.background}`}>
      {/* Text Section */}
      <div className={`${styles["text-section"]}`}>
        <h1 className={`${styles.title}`}>Gửi yêu thương,Ươm mầm xanh</h1>
        <p className={`${styles.description}`}>
          Seedy là những chiếc thiệp biết “nảy mầm” – nơi yêu thương được trao
          đi và mầm xanh được ươm lên, biến từng món quà nhỏ thành hành trình
          kết nối cảm xúc và thiên nhiên.
        </p>
        <button className={`${styles.button}`}>TÌM HIỂU THÊM</button>
      </div>

      {/* Image Section */}
      <div className={`${styles["image-section"]}`}>
        <Image
          src="/about-img.png"
          alt="About image"
          width={900}
          height={900}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
