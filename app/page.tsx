import { Navbar } from "./components/landingPage/Navbar";
import { HeroSection } from "./components/landingPage/HeroSection";
import { BestProduct } from "./components/landingPage/BestProduct";

export default function Home() {
  return (
    <main className="min-h-screen overflow-visible">
      <Navbar />
      <HeroSection />
      <BestProduct />
    </main>
  );
}