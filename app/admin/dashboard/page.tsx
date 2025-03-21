"use client";

import Header from "@/app/components/admin/Header";
import CardTotal from "@/app/components/admin/dashboard/CardTotal";
import SalesRevenue from "@/app/components/admin/dashboard/SalesRevenue";
import TopCategories from "@/app/components/admin/dashboard/TopCategories";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white p-4">
      <Header title="Dashboard" />
      <CardTotal />
      
      {/* Grid untuk Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8">
        {/* Sales Revenue Chart - 2/3 lebar */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <SalesRevenue />
        </div>
        
        {/* Top Categories Chart - 1/3 lebar */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <TopCategories />
        </div>
      </div>
    </div>
  );
}