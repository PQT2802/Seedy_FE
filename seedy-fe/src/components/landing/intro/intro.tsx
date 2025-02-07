import React from "react";
import Image from "next/image";
import styles from "./intro.module.css";

export default function Intro() {
  return (
    <div className={`${styles.background}`}>
      {/* Text Section */}
      <div className={`${styles["text-section"]}`}>
        <h1 className={`${styles.title}`}>Nature Embraces Your Stories</h1>
        <p className={`${styles.description}`}>
          We redefine creativity with recycling: for each Seedy notebook
          isn&apos;t just for jotting down ideas, it&apos;s a testament to
          environmental protection and uniqueness in every writing and drawing
          experience.
        </p>
        <button className={`${styles.button}`}>LET’S EXPLORE</button>
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
