import Footer from "@/components/footer/footer";
import About from "@/components/landing/about";
import BestSeller from "@/components/landing/best-seller";
import Feedback from "@/components/landing/feedback";
import Intro from "@/components/landing/intro";
import Mission from "@/components/landing/mission";
import Title from "@/components/landing/title";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#234014] relative">
      {/* Header */}
      <Title />
      <div className="relative -mt-20 z-10">
        <Intro />
      </div>
      <div className="relative -mt-44 z-20">
        <BestSeller />
      </div>
      <div className="relative -mt-44 z-20">
        <About />
      </div>
      <div className="relative -mt-1 z-20">
        <Mission />
      </div>
      {/* Content */}
      <div className="relative -mt-40 z-20">
        <Feedback />
      </div>
      <div className="relative -mt-96 z-20">
        <Footer />
      </div>
    </div>
  );
}
