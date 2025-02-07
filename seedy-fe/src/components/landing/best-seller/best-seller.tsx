import React from "react";
import Image from "next/image";
import styles from "./best-seller.module.css";

export default function BestSeller() {
  return (
    <div className={styles.background}>
      {/* First Item */}
      <div className={styles.item}>
        <Image
          src="/box-set-1.png"
          alt="Seedy Make-Plant Box Set"
          width={200}
          height={200}
        />
        <div>
          <h1>SEEDY MAKE-PLANT BOX SET</h1>
          <button>BUY NOW</button>
        </div>
      </div>

      {/* Second Item */}
      <div className={styles.item}>
        <Image
          src="/sticker-set-1.png"
          alt="Wild-Ture Sticker Set"
          width={200}
          height={200}
        />
        <div>
          <h1>“WILD-TURE” STICKER SET</h1>
          <button>BUY NOW</button>
        </div>
      </div>
    </div>
  );
}
