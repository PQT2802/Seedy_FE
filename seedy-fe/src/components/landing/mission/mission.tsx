import React from "react";
import styles from "./mission.module.css";

export default function Mission() {
  return (
    <div className={`${styles.background}`}>
      <h1 className={`${styles.title}`}>What We Do?</h1>

      <div className={`${styles.missionContainer}`}>
        <h2 className={`${styles.missionTitle}`}>Our Mission</h2>
        <p className={`${styles.missionText}`}>
          Originating from small cards with the mission of connecting love and
          spreading positive values, we believe that each message is a seed of
          emotion, and every seed sown is a promise to the future.
        </p>
      </div>

      <div className={`${styles.visionContainer}`}>
        <h2 className={`${styles.visionTitle}`}>Our Vision</h2>
        <p className={`${styles.visionText}`}>
          Seedy aspires to become a symbol of creativity, connecting people and
          nature. We dream of a world where every small gift spreads love,
          inspires others, and nurtures a sustainable green planet.
        </p>
      </div>
    </div>
  );
}
