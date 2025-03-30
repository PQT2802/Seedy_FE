import React from "react";
import styles from "./about.module.css";

export default function About() {
  return (
    <div className={`${styles.background}`}>
      {/* Main Title */}
      <div className="text-center">
        {/* "What is" Text */}
        <h1 className={`${styles.mainTitle}`}>SEEDY</h1>
        {/* "Seedy" Text */}
        <h1 className={`${styles.mainTitle} ${styles.seedyTitle}`}>LÀ GÌ</h1>
      </div>

      {/* Description in the Middle-Right */}
      <p className={`${styles.middleDescription}`}>
        Biến từng món quà nhỏ thành hành trình kết nối cảm xúc và thiên nhiên.
      </p>

      {/* Description in the Bottom-Left */}
      <p className={`${styles.bottomDescription}`}>
        Seedy là những chiếc thiệp biết “nảy mầm” – nơi yêu thương được trao đi
        và mầm xanh được ươm lên
      </p>
    </div>
  );
}
