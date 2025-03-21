"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/app/components/admin/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  // Deteksi ukuran layar
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Cek ukuran layar saat pertama kali load
    checkScreenSize();

    // Tambahkan event listener untuk resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - dengan prop isMobile */}
      <Sidebar isMobile={isMobile} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main content dengan scroll */}
        <main className="flex-1 p-4 md:p-0 bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}