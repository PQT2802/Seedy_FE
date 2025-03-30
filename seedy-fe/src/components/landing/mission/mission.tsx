import React from "react";
import styles from "./mission.module.css";

export default function Mission() {
  return (
    <div className={`${styles.background}`}>
      <h1 className={`${styles.title}`}>Chúng tui ở đây để...</h1>

      <div className={`${styles.missionContainer}`}>
        <h2 className={`${styles.missionTitle}`}>SỨ MỆNH</h2>
        <p className={`${styles.missionText}`}>
          Khởi nguồn từ những chiếc thiệp nhỏ cùng sứ mệnh kết nối yêu thương và
          lan tỏa giá trị tốt đẹp. Chúng mình tin rằng mỗi thông điệp là một hạt
          mầm cảm xúc, mỗi hạt mầm gieo xuống là lời hứa với tương lai.”
        </p>
      </div>

      <div className={`${styles.visionContainer}`}>
        <h2 className={`${styles.visionTitle}`}>TẦM NHÌN</h2>
        <p className={`${styles.visionText}`}>
          Seedy mong muốn trở thành biểu tượng sáng tạo, gắn kết con người và
          thiên nhiên. Chúng mình mơ về một thế giới nơi mỗi món quà nhỏ lan tỏa
          yêu thương, truyền cảm hứng và vun đắp hành tinh xanh bền vững.
        </p>
      </div>
    </div>
  );
}
