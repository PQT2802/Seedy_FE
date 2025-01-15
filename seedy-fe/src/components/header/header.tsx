import React, { JSX } from "react";
import Image from "next/image";
import styles from "./header.module.css";

export const Header = (): JSX.Element => {
  return (
    <div className={styles.header}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Image
          alt="Logo seedy moi trang"
          src="/logo-seedy-mo-i-tra-ng-1.png"
          width={92}
          height={87}
        />
      </div>

      {/* Header Container */}
      <div className={styles.headerContainer}>
        <div className={styles.navContainer}>
          {/* Navigation Links */}
          <div className={styles.navLinks}>
            <span className={styles.navItem}>OUR PRODUCTS</span>
            <span className={styles.navItem}>OUR ARCHIVES</span>
            <span className={styles.navItem}>ABOUT US</span>
          </div>

          {/* Search Box */}
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
            />
            <Image
              alt="Search Icon"
              src="/search-more.png"
              width={28}
              height={28}
              className={styles.searchIcon}
            />
          </div>

          {/* Icons */}
          <div className={styles.icons}>
            <Image
              alt="Earth Icon"
              src="/earth-planet.png"
              width={45}
              height={45}
            />
            <Image
              alt="Shopping Cart Icon"
              src="/shopping-cart.png"
              width={45}
              height={45}
            />
            <Image alt="User Icon" src="/user.png" width={45} height={45} />
          </div>
        </div>
      </div>

      {/* Circled Menu */}
      <div className={styles.menuIcon}>
        <Image
          alt="Circled menu"
          src="/circled-menu.png"
          width={65}
          height={65}
        />
      </div>
    </div>
  );
};
