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
    oneTimeRevenue: Array(12).fill(0),
    recurringRevenue: Array(12).fill(0),
    quarterlyOneTime: Array(4).fill(0),
    quarterlyRecurring: Array(4).fill(0),
    yearlyOneTime: 0,
    yearlyRecurring: 0
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        const cartsData = await fetchCarts();
        
        // Generate data untuk semua jenis tampilan
        const data = generateAllSalesData(cartsData.carts);
        setChartData(data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  // Fungsi untuk menghasilkan semua data penjualan
  const generateAllSalesData = (carts: Cart[]) => {
    // Inisialisasi array untuk 12 bulan
    const oneTimeRevenue = Array(12).fill(0);
    const recurringRevenue = Array(12).fill(0);
    
    // Untuk quarterly (4 kuartal)
    const quarterlyOneTime = Array(4).fill(0);
    const quarterlyRecurring = Array(4).fill(0);
    
    // Untuk yearly (total tahunan)
    let yearlyOneTime = 0;
    let yearlyRecurring = 0;

    // Untuk setiap cart, kita tambahkan nilai total ke bulan yang sesuai
    carts.forEach(cart => {
      // Ambil bulan dari ID cart (simulasi saja)
      const month = cart.id % 12; // 0-11 untuk Jan-Dec
      const quarter = Math.floor(month / 3); // 0-3 untuk Q1-Q4
      
      // Simulasi: 70% dari total adalah recurring, 30% one-time
      // Normalisasi nilai agar tidak terlalu besar (bagi dengan 1000000)
      const total = cart.total / 100;
      const recurring = total * 0.7;
      const oneTime = total * 0.3;
      
      // Update data bulanan
      oneTimeRevenue[month] += oneTime;
      recurringRevenue[month] += recurring;
      
      // Update data kuartalan
      quarterlyOneTime[quarter] += oneTime;
      quarterlyRecurring[quarter] += recurring;
      
      // Update data tahunan
      yearlyOneTime += oneTime;
      yearlyRecurring += recurring;
    });

    return { 
      oneTimeRevenue, 
      recurringRevenue,
      quarterlyOneTime,
      quarterlyRecurring,
      yearlyOneTime,
      yearlyRecurring
    };
  };

  // Konfigurasi chart berdasarkan tab yang aktif
  const getChartOptions = () => {
    const baseOptions = {
      chart: {
        type: 'bar' as const,
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
      yaxis: {
        title: {
          text: '$ (Revenue)'
        },
        labels: {
          formatter: function(val: number) {
            return '$' + val.toFixed(0);
          }
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
        position: 'top' as const,
        horizontalAlign: 'left' as const
      },
      colors: ['#4F46E5', '#818CF8'],
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }]
    };

    // Sesuaikan kategori berdasarkan tab yang aktif
    if (activeTab === 'monthly') {
      return {
        ...baseOptions,
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }
      };
    } else if (activeTab === 'quarterly') {
      return {
        ...baseOptions,
        xaxis: {
          categories: ['Q1', 'Q2', 'Q3', 'Q4'],
        }
      };
    } else { // yearly
      return {
        ...baseOptions,
        xaxis: {
          categories: ['Annual Revenue'],
        }
      };
    }
  };

  // Data series berdasarkan tab yang aktif
  const getSeries = () => {
    if (activeTab === 'monthly') {
      return [
        {
          name: 'Recurring Revenue',
          data: chartData.recurringRevenue
        },
        {
          name: 'One-Time Revenue',
          data: chartData.oneTimeRevenue
        }
      ];
    } else if (activeTab === 'quarterly') {
      return [
        {
          name: 'Recurring Revenue',
          data: chartData.quarterlyRecurring
        },
        {
          name: 'One-Time Revenue',
          data: chartData.quarterlyOneTime
        }
      ];
    } else { // yearly
      return [
        {
          name: 'Recurring Revenue',
          data: [chartData.yearlyRecurring]
        },
        {
          name: 'One-Time Revenue',
          data: [chartData.yearlyOneTime]
        }
      ];
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-3 sm:mb-0">
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

      <div className="mt-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="h-80 w-full">
            {typeof window !== 'undefined' && (
              <ReactApexChart 
                options={getChartOptions()}
                series={getSeries()}
                type="bar"
                height="100%"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesRevenue;