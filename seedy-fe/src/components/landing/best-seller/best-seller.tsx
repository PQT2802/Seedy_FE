import React from "react";
import Image from "next/image";
import styles from "./best-seller.module.css";

export default function BestSeller() {
  return (
    <div className={styles.background}>
      {/* Product Cards */}
      <div className={styles["card-container"]}>
        {/* First Card */}
        <div className={styles.card}>
          <Image
            src="/box-set-1.png"
            alt="Seedy Make-Plant Box Set"
            width={600}
            height={600}
          />
        </div>

        {/* Second Card */}
        <div className={styles.card}>
          <Image
            src="/sticker-set-1.png"
            alt="Wild-Ture Sticker Set"
            width={600}
            height={600}
          />
        </div>
      </div>

      {/* Row for Names and Buttons */}
      <div className={styles["text-button-row"]}>
        {/* First Card Text and Button */}
        <div className="flex flex-col items-center">
          <h2 className={styles["card-text"]}>SEEDY MAKE-PLANT BOX SET</h2>
          <button className={styles["card-button"]}>BUY NOW</button>
        </div>

        {/* Second Card Text and Button */}
        <div className="flex flex-col items-center">
          <h2 className={`${styles["card-text"]} lg:mr-32`}>
            “WILD-TURE” STICKER SET
          </h2>
          <button className={`${styles["card-button"]} lg:mr-24`}>
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}
