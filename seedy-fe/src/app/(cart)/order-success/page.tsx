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
            <h1 className={styles.title}>Great News!</h1>
            <p className={styles.orderComplete}>Your order is now complete</p>
            <p className={styles.confirmationMessage}>
              You will receive a confirmation email within the next 24 hours.
            </p>
            <p className={styles.contactMessage}>
              If you have any questions, please don’t hesitate to contact us.
            </p>
            <button className={styles.continueButton}>CONTINUE SHOPPING</button>
          </div>
        </div>
      </div>
    </div>
  );
}
