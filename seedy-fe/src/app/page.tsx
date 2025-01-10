import Footer from "@/components/footer/footer";
import { Header } from "@/components/header/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#234014]">
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="flex justify-center items-center text-white text-2xl h-[calc(100vh-87px)]">
        Welcome to the Homepage!
      </div>
      <Footer />
    </div>
  );
}
