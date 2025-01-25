import Footer from "@/components/footer/footer";
import About from "@/components/landing/about/about";
import BestSeller from "@/components/landing/best-seller/best-seller";
import Intro from "@/components/landing/intro/intro";
import Mission from "@/components/landing/mission/mission";
import Title from "@/components/landing/title/title";
import styles from "./home.module.css";
import Header from "@/components/header/header";
import Feedback from "./../components/landing/feedback/feedback";

export default function Home() {
  return (
    <div className={styles.container}>
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
