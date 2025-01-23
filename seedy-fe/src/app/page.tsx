import Footer from "@/components/footer/footer";
import About from "@/components/landing/about/about";
import BestSeller from "@/components/landing/best-seller/best-seller";
import Feedback from "@/components/landing/feedback/feedback";
import Intro from "@/components/landing/intro/intro";
import Mission from "@/components/landing/mission/mission";
import Title from "@/components/landing/title/title";
import styles from "./home.module.css";
import Header from "@/components/header/header";
import { Divide } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-green-900">
      <div className="z-10">
        <Title />
      </div>
      <div className="-mt-20 z-10">
        <Intro />
      </div>
      <div className="-mt-32 z-20">
        <BestSeller />
      </div>
      <div className="-mt-44 z-10">
        <About />
      </div>
      <div>
        <Mission />
      </div>
    </div>
  );
}
