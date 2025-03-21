"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { fetchProducts } from "@/app/services/api";
import type { Product, ProductsResponse } from "@/app/services/api"; // Impor dari api.ts, bukan types/product.ts
import { ApexOptions } from 'apexcharts';

// Import ApexCharts secara dinamis karena ini komponen client-side
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Interface untuk data kategori
interface CategoryData {
  labels: string[];
  values: number[];
  percentages: number[];
  colors: string[];
}

// Interface untuk ApexCharts
interface ApexChartProps {
  globals: {
    seriesTotals: number[];
  };
}

const TopCategories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryData>({
    labels: [],
    values: [],
    percentages: [],
    colors: []
  });

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        setLoading(true);
        const productsData: ProductsResponse = await fetchProducts();
        
        // Proses data untuk mendapatkan kategori teratas
        const categoriesData = processCategoriesData(productsData.products);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesData();
  }, []);

  // Fungsi untuk memproses data kategori
  const processCategoriesData = (products: Product[]): CategoryData => {
    // Menghitung total per kategori
    const categoryMap = new Map<string, number>();
    
    products.forEach(product => {
      const category = product.category;
      const price = product.price;
      
      if (categoryMap.has(category)) {
        categoryMap.set(category, categoryMap.get(category)! + price);
      } else {
        categoryMap.set(category, price);
      }
    });
    
    // Urutkan kategori berdasarkan total dan ambil 4 teratas
    const sortedCategories = [...categoryMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
    
    // Hitung total dari 4 kategori teratas
    const totalValue = sortedCategories.reduce((sum, [, value]) => sum + value, 0);
    
    // Siapkan data untuk chart
    const labels = sortedCategories.map(([category]) => category);
    const values = sortedCategories.map(([, value]) => value);
    const percentages = values.map(value => Math.round((value / totalValue) * 100));
    
    // Warna untuk setiap kategori
    const colors = ['#4F46E5', '#EC4899', '#F59E0B', '#10B981'];
    
    return { labels, values, percentages, colors };
  };

  // Konfigurasi chart
  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: categories.labels,
    colors: categories.colors,
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              color: undefined,
              offsetY: 16,
              formatter: function (val: string) {
                // Konversi string ke number dulu
                return "$" + parseFloat(val).toLocaleString();
              }
            },
            total: {
              show: true,
              label: 'Total Sales',
              color: '#373d3f',
              formatter: function (w: ApexChartProps) {
                return "$" + w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0).toLocaleString();
              }
            }
          }
        }
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      formatter: function(seriesName: string, opts: { seriesIndex: number }) {
        return seriesName + ":  " + categories.percentages[opts.seriesIndex] + "%";
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const series = categories.values;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Top Categories
        </h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-800">
          See All
        </button>
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
            type="donut" 
            height="100%" 
          />
        )}
      </div>

      <div className="mt-6 space-y-3">
        {categories.labels.map((category, index) => (
          <div key={category} className="flex justify-between items-center">
            <div className="flex items-center">
              <span 
                className="inline-block w-3 h-3 mr-2 rounded-full" 
                style={{ backgroundColor: categories.colors[index] }}
              ></span>
              <span className="text-sm text-gray-700 capitalize">{category}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">${categories.values[index].toLocaleString()}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                {categories.percentages[index]}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;