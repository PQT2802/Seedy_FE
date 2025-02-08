"use client";

import Header from "@/components/header/header";
import React from "react";
import styles from "./information.module.css";

export default function UserProfile() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Left Section */}
          <div className={styles.leftSection}>
            <h1 className={styles.greeting}>Hi, Sharon</h1>
            <div className={styles.avatarWrapper}>
              <img
                src="/avatar.png"
                alt="Female Avatar"
                className={styles.avatar}
              />
            </div>
            <div className={styles.infoTabs}>
              <p className={`${styles.tab} ${styles.activeTab}`}>
                Personal Information
              </p>
              <p className={styles.tab}>Your Order</p>
            </div>
          </div>
          {/* Right Section dfsdfdsfsdf*/}
          <div className={styles.rightSection}>
            <h2 className={styles.title}>Personal Information</h2>
            <div className={styles.form}>
              {/* Full Name */}
              <div className={styles.fullWidth}>
                <label className={styles.label}>Full Name</label>
                <input type="text" className={styles.input} />
              </div>
              {/* Date of Birth & Gender */}
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Date of Birth</label>
                  <input type="date" className={styles.input} />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Gender</label>
                  <input type="text" className={styles.input} />
                </div>
              </div>
              {/* Phone Number & Country/Religion */}
              <div className={styles.row}>
                <div className={styles.inputLarge}>
                  <label className={styles.label}>Phone Number</label>
                  <input type="text" className={styles.input} />
                </div>
                <div className={styles.inputSmall}>
                  <label className={styles.label}>Country/Religion</label>
                  <input type="text" className={styles.input} />
                </div>
              </div>
              {/* Home Address */}
              <div className={styles.fullWidth}>
                <label className={styles.label}>Home Address</label>
                <input type="text" className={styles.input} />
              </div>
              {/* Language & Log Out */}
              <div className={styles.row}>
                <div className={styles.languageContainer}>
                  <label className={styles.label}>Language</label>
                  <input type="text" className={styles.input} />
                </div>
                <div className={styles.spacer}></div>
                <button className={styles.logoutButton}>LOG OUT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
