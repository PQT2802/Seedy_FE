import Footer from "@/components/footer/footer";
import Intro from "@/components/landing/intro";
import Title from "@/components/landing/title";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#234014] relative">
      {/* Header */}
      <Title />
      <div className="relative -mt-20 z-10">
        <Intro />
      </div>
      {/* Content */}
      <div className="flex justify-center items-center text-white text-2xl h-[calc(100vh-87px)]">
        Welcome to the Homepage!
      </div>
      <Footer />
    </div>
  );
}
