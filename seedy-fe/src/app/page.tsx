"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer/footer";
import About from "@/components/landing/about/about";
import BestSeller from "@/components/landing/best-seller/best-seller";
import Intro from "@/components/landing/intro/intro";
import Mission from "@/components/landing/mission/mission";
import Title from "@/components/landing/title/title";
import Feedback from "./../components/landing/feedback/feedback";
import styles from "./home.module.css";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setShowPopup(true);
    }
  }, []);

  return (
    <div className={styles.container}>
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Please Login or Register</h2>
            <button onClick={() => router.push("/login")}>Login</button>
            <button onClick={() => router.push("/register")}>Register</button>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}

      <div className={styles.title}>
        <Title />
      </div>
      <div className={styles.intro}>
        <Intro />
      </div>
      <div className={styles.bestSeller}>
        <BestSeller />
      </div>
      <div className={styles.about}>
        <About />
      </div>
      <div>
        <Mission />
      </div>
      <div className={styles.feedback}>
        <Feedback />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
