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
import Modal from "@/components/generic/Modal";
import Image from "next/image";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [emojiSrc, setEmojiSrc] = useState("/smiley_face.png");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setShowPopup(true);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Modal isOpen={showPopup} onClose={() => setShowPopup(false)}>
        <div className={styles.popupContent}>
          <div className="emoji-container">
            <Image src={emojiSrc} alt="emoji" width={60} height={60} />
          </div>
          <button
            onMouseEnter={() => setEmojiSrc("/smiley_face.png")}
            onMouseLeave={() => setEmojiSrc("/smiley_face.png")}
            onClick={() => router.push("/login")}
          >
            Login
          </button>
          <button
            onMouseEnter={() => setEmojiSrc("/smiley_face.png")}
            onMouseLeave={() => setEmojiSrc("/smiley_face.png")}
            onClick={() => router.push("/register")}
          >
            Register
          </button>
          <button
            onMouseEnter={() => setEmojiSrc("/angry_face.png")}
            onMouseLeave={() => setEmojiSrc("/smiley_face.png")}
            onClick={() => setShowPopup(false)}
          >
            Close
          </button>
        </div>
      </Modal>

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
