import Footer from "@/components/footer/footer";
import About from "@/components/landing/about/about";
import BestSeller from "@/components/landing/best-seller/best-seller";
import Feedback from "@/components/landing/feedback/feedback";
import Intro from "@/components/landing/intro/intro";
import Mission from "@/components/landing/mission/mission";
import Title from "@/components/landing/title/title";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles["home-container"]}>
      {/* Header */}
      <Title />
    </div>
  );
}
