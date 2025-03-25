"use client";
import React from "react";
import Image from "next/image";
import styles from "./header.module.css";
import { useRouter } from "next/navigation"; // ✅ Correct import for App Router

export default function Header() {
  const router = useRouter();

  const handleCartClick = () => {
    router.push("/cart-list");
  };

  const handleUserClick = () => {
    router.push("/information");
  };

  return (
    <div className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>
        <Image
          alt="Logo Seedy"
          src="/logo-seedy-mo-i-tra-ng-1.png"
          width={92}
          height={87}
          onClick={() => router.push("/")}
        />
      </div>

      {/* Header Container */}
      <div className={styles.headerContainer}>
        <div className={styles.navBar}>
          {/* Navigation Links */}
          <div className={styles.navLinks}>
            <span
              className={styles.navLink}
              onClick={() => router.push("/products")}
            >
              Sản phẩm
            </span>
            <span className={styles.navLink}>Lưu trữ</span>
            <span className={styles.navLink}>Về chúng tôi</span>
          </div>

          {/* Search Box */}
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className={styles.searchInput}
            />
            <Image
              alt="Biểu tượng tìm kiếm"
              src="/search-more.png"
              width={28}
              height={28}
            />
          </div>

          {/* Icons */}
          <div className={styles.icons}>
            <Image
              className={styles.icon}
              alt="Earth Icon"
              src="/earth-planet.png"
              width={45}
              height={45}
            />
            <Image
              className={styles.icon}
              alt="Shopping Cart Icon"
              src="/shopping-cart.png"
              width={45}
              height={45}
              onClick={handleCartClick}
              style={{ cursor: "pointer" }}
            />
            <Image
              className={styles.icon}
              alt="User Icon"
              src="/user.png"
              width={45}
              height={45}
              onClick={handleUserClick}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      {/* Circled Menu */}
      <div className={styles.circledMenu}>
        <Image
          alt="Menu tròn"
          src="/circled-menu.png"
          width={65}
          height={65}
          onClick={() => router.push("/information")}
        />
      </div>
    </div>
  );
}
