import Header from "@/components/header/header";
import React from "react";
import styles from "./order-success.module.css";

export default function page() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.mainContent}>
        <div className={styles.successBox}>
          <div className={styles.contentWrapper}>
            <h1 className={styles.title}>Tuyệt vời!</h1>
            <p className={styles.orderComplete}>
              Đơn hàng của bạn đã được đặt thành thông
            </p>
            <p className={styles.confirmationMessage}>
              Bạn sẽ nhận được email xác nhận trong vòng 24 giờ tới..
            </p>
            <p className={styles.contactMessage}>
              Nếu bạn có bất kỳ câu hỏi nào, vui lòng đừng ngần ngại liên hệ với
              chúng tôi.
            </p>
            <button className={styles.continueButton}>TIẾP TỤC</button>
          </div>
        </div>
      </div>
    </div>
  );
}
