import Header from "@/components/header/header";
import Image from "next/image";
import React from "react";
import styles from "./title.module.css";

export default function Title() {
  return (
    <div className={styles.background}>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles["image-container"]}>
        <Image
          src="/title-ld.png"
          alt="Title"
          width={1000}
          height={1000}
          className={styles["title-image"]}
        />
      </div>
    </div>
  );
}
