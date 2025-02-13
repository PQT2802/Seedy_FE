"use client";

import Header from "@/components/header/header";
import React, { useEffect, useState } from "react";
import styles from "./information.module.css";
import envConfig from "@/config";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const [userData, setUserData] = useState({
    userName: "Guest",
    email: "Not provided",
    phoneNumber: "N/A",
    address: "No address available",
    avatar: "/avatar.png",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://seedbe-cdhggmh7h0hef3ff.eastasia-01.azurewebsites.net/api/User/user-infor`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch user data");
        }

        const result = await response.json();
        const data = result?.extensions?.data;

        if (!data) {
          throw new Error("User data not found in response");
        }

        setUserData({
          userName: data.userName || "Guest",
          email: data.email || "Not provided",
          phoneNumber: data.phoneNumber || "N/A",
          address: data.address || "No address available",
          avatar: data.avatar || "/avatar.png",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (envConfig.NEXT_PUBLIC_API_ENDPOINT) {
      fetchUserData();
    }
  }, []); // Empty dependency array to run only once on mount

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
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
                Personal Information
              </p>
              <p className={styles.tab}>Your Order</p>
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
                <h2 className={styles.title}>Personal Information</h2>
                <div className={styles.form}>
                  <div className={styles.fullWidth}>
                    <label className={styles.label}>Full Name</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={userData.userName}
                      readOnly
                    />
                  </div>
                  <div className={styles.fullWidth}>
                    <label className={styles.label}>Phone Number</label>
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
                    <label className={styles.label}>Home Address</label>
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
                      LOG OUT
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
