import { Navbar } from "./components/landingPage/Navbar";
import { HeroSection } from "./components/landingPage/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Komponen landing page akan dipanggil di sini nanti */}
      <Navbar />
      <HeroSection />
    </main>
  );
}