import Image from "next/image";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      {/* Background Wavy Image */}
      <div className={styles.background}></div>

      {/* Footer Content */}
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Section: Social Icons */}
          <div className={styles.socialIcons}>
            <Image src="/fb-icon.png" alt="Facebook" width={50} height={50} />
            <Image src="/ig-icon.png" alt="Instagram" width={50} height={50} />
            <Image src="/tt-icon.png" alt="TikTok" width={50} height={50} />
          </div>

          {/* Center Section: Branding */}
          <div className={styles.branding}>
            <h2 className={styles.logo}>SEEDY</h2>
            <p className={styles.tagline}>NATURE EMBRACES YOUR STORIES</p>
          </div>

          {/* Right Section: Copyright Text */}
          <div className={styles.copyright}>
            <p>seedy © all rights reserved</p>
          </div>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className={styles.floatingButtons}>
        {/* Scroll to Top Button */}
        <button className={styles.button}>
          <span className={styles.buttonText}>↑</span>
        </button>

        {/* Chat Button */}
        <button className={styles.button}>
          <span className={styles.buttonText}>💬</span>
        </button>
      </div>
    </div>
  );
}
