"use client";

import Header from "@/components/header/header";
import React, { useEffect, useState } from "react";
import styles from "./information.module.css";
import envConfig from "@/config";
import { useRouter } from "next/navigation";
import userApiRequest from "@/apiRequests/user";

export default function UserProfile() {
  const [userData, setUserData] = useState({
    userName: "Guest",
    email: "Not provided",
    phoneNumber: "N/A",
    address: "No address available",
    avatar: "/avatar.png",
    role: "Customer",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleGoToDashboard = () => {
    router.push("/dashboard"); // Adjust the path to your dashboard
  };
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("KHÔNG TÌM THẤY NGƯỜI DÙNG");
        setLoading(false);
        return;
      }

      try {
        const response = await userApiRequest.getUserInfo();
        const data = response.extensions.data;

        setUserData({
          userName: data.userName || "Guest",
          email: data.email || "Not provided",
          phoneNumber: data.phoneNumber || "N/A",
          address: data.address || "No address available",
          avatar: data.avatar || "/avatar.png",
          role: data.roleName || "Customer",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError((error as Error).message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    if (envConfig.NEXT_PUBLIC_API_ENDPOINT) {
      fetchUserData();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  // Hàm xử lý khi nhấn vào tab "Your Order"
  const handleViewOrders = () => {
    router.push(
      `/order?userName=${encodeURIComponent(
        userData.userName
      )}&avatar=${encodeURIComponent(userData.avatar)}`
    );
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Left Section */}
          <div className={styles.leftSection}>
            <h1 className={styles.greeting}>Hi, {userData.userName}</h1>
            <div className={styles.avatarWrapper}>
              <img
                src={userData.avatar}
                alt="User Avatar"
                className={styles.avatar}
                loading="lazy"
              />
            </div>
            <div className={styles.infoTabs}>
              <p className={`${styles.tab} ${styles.activeTab}`}>
                Thông tin người dùng
              </p>
              <p className={styles.tab} onClick={handleViewOrders}>
                ĐƠN ĐẶT HÀNG
              </p>

              {/* Show button only if the user is an Admin */}
              {userData.role === "Admin" && (
                <button
                  className={styles.dashboardButton}
                  onClick={handleGoToDashboard}
                >
                  ĐI ĐẾN DASHBOARD
                </button>
              )}
            </div>
          </div>
          {/* Right Section */}
          <div className={styles.rightSection}>
            {loading ? (
              <p>Loading user data...</p>
            ) : error ? (
              <p className={styles.error}>{error}</p>
            ) : (
              <>
                <h2 className={styles.title}>Thông tin người dùng</h2>
                <div className={styles.form}>
                  <div className={styles.fullWidth}>
                    <label className={styles.label}>Họ và tên</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={userData.userName}
                      readOnly
                    />
                  </div>
                  <div className={styles.fullWidth}>
                    <label className={styles.label}>Số điện thoại</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={userData.phoneNumber}
                      readOnly
                    />
                  </div>
                  <div className={styles.fullWidth}>
                    <label className={styles.label}>Email</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={userData.email}
                      readOnly
                    />
                  </div>
                  <div className={styles.fullWidth}>
                    <label className={styles.label}>Địa chỉ liên hệ</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={userData.address}
                      readOnly
                    />
                  </div>
                  <div className={styles.row}>
                    <button
                      className={styles.logoutButton}
                      onClick={handleLogout}
                    >
                      ĐĂNG XUẤT
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
