"use client";

import Sidebar from "@/app/components/admin/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}