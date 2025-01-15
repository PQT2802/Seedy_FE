import React from "react";
import styles from "./about.module.css";

export default function About() {
  return (
    <div className={`${styles.background}`}>
      {/* Main Title */}
      <div className="text-center">
        {/* "What is" Text */}
        <h1 className={`${styles.mainTitle}`}>What is</h1>
        {/* "Seedy" Text */}
        <h1 className={`${styles.mainTitle} ${styles.seedyTitle}`}>Seedy</h1>
      </div>

      {/* Description in the Middle-Right */}
      <p className={`${styles.middleDescription}`}>
        Seedy delivers lasting value in a growing market for creative, green
        experiences
      </p>

      {/* Description in the Bottom-Left */}
      <p className={`${styles.bottomDescription}`}>
        Where sustainability meets uniqueness. With eco-friendly, personalized
        products and a solid strategy
      </p>
    </div>
  );
}
