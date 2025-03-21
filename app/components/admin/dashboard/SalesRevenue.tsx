"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { fetchCarts } from "@/app/services/api";
import type { Cart } from "@/app/services/api";


// Import ApexCharts secara dinamis karena ini komponen client-side
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesRevenue = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("monthly");
  const [chartData, setChartData] = useState({
    oneTimeRevenue: [] as number[],
    recurringRevenue: [] as number[]
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        const cartsData = await fetchCarts();
        
        // Simulasi data penjualan bulanan dari data carts
        const monthlyData = generateMonthlySalesData(cartsData.carts);
        setChartData(monthlyData);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  // Fungsi untuk menghasilkan data penjualan bulanan dari data carts
  const generateMonthlySalesData = (carts: Cart[]) => {
    // Inisialisasi array untuk 12 bulan
    const oneTimeRevenue = Array(12).fill(0);
    const recurringRevenue = Array(12).fill(0);

    // Untuk setiap cart, kita tambahkan nilai total ke bulan yang sesuai
    carts.forEach(cart => {
      // Ambil bulan dari ID cart (simulasi saja)
      const month = cart.id % 12; // 0-11 untuk Jan-Dec
      
      // Simulasi: 70% dari total adalah recurring, 30% one-time
      const total = cart.total;
      const recurring = total * 0.7;
      const oneTime = total * 0.3;
      
      oneTimeRevenue[month] += oneTime;
      recurringRevenue[month] += recurring;
    });

    return { oneTimeRevenue, recurringRevenue };
  };

  // Konfigurasi chart
  const chartOptions = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      title: {
        text: '$ (Revenue)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return "$ " + val.toLocaleString()
        }
      },
      shared: true,
      intersect: false
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
    colors: ['#4F46E5', '#818CF8']
  };

  const series = [
    {
      name: 'Recurring Revenue',
      data: chartData.recurringRevenue
    },
    {
      name: 'One-Time Revenue',
      data: chartData.oneTimeRevenue
    }
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Di sini kita bisa mengimplementasikan logika untuk mengubah data berdasarkan tab
    // Misalnya, untuk quarterly atau yearly
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          Sales Revenue
        </h2>
        <div className="flex space-x-2 text-sm">
          <button 
            className={`px-3 py-1 rounded-md ${activeTab === 'monthly' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={() => handleTabChange('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`px-3 py-1 rounded-md ${activeTab === 'quarterly' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={() => handleTabChange('quarterly')}
          >
            Quarterly
          </button>
          <button 
            className={`px-3 py-1 rounded-md ${activeTab === 'yearly' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={() => handleTabChange('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="w-full h-80">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <ReactApexChart 
            options={chartOptions} 
            series={series} 
            type="bar" 
            height="100%" 
          />
        )}
      </div>

      <div className="mt-4 flex items-center text-sm">
        <span className="inline-block w-3 h-3 mr-1 bg-indigo-600 rounded-full"></span>
        <span className="text-gray-600 mr-4">One-Time Revenue</span>
        <span className="inline-block w-3 h-3 mr-1 bg-indigo-400 rounded-full"></span>
        <span className="text-gray-600">Recurring Revenue</span>
      </div>
    </div>
  );
};

export default SalesRevenue;