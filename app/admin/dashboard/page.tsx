"use client";

import Header from "@/app/components/admin/dashboard/Header";
import CardTotal from "@/app/components/admin/dashboard/CardTotal";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white p-4">
      <Header />
      <CardTotal />
    </div>
  );
}