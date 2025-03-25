"use client";
import Image from "next/image";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <div className={styles.heroContainer}>
      {/* Background Layer with Border */}
      <div className={styles.heroBackground}>
        {/* Background Image */}
        <Image
          src="/homepage/hero-background.svg"
          alt="Hero Background"
          layout="fill"
          className={styles.heroImage}
        />
        {/* Border Layer */}
        <div className={styles.heroBorder}></div>
      </div>

      {/* Text Content */}
      <div className={styles.heroText}>Gửi yêu thương, Ươm mầm xanh</div>
    </div>
  );
}
