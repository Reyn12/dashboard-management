import { Navbar } from "./components/landingPage/Navbar";
import { HeroSection } from "./components/landingPage/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen overflow-visible">
      <Navbar />
      <HeroSection />
    </main>
  );
}