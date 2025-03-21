"use client";

import React, { useEffect, useState } from "react";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";
import { fetchProducts, fetchUsers, fetchCarts, calculateTotalRevenue } from "@/app/services/api";
import { motion } from "framer-motion";

const CardTotal = () => {
  const [productsTotal, setProductsTotal] = useState<number>(0);
  const [usersTotal, setUsersTotal] = useState<number>(0);
  const [cartsTotal, setCartsTotal] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch data secara parallel
        const [productsData, usersData, cartsData, totalRevenue] = await Promise.all([
          fetchProducts(),
          fetchUsers(),
          fetchCarts(),
          calculateTotalRevenue()
        ]);
        
        setProductsTotal(productsData.total);
        setUsersTotal(usersData.total);
        setCartsTotal(cartsData.total);
        setRevenue(totalRevenue);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Variasi untuk staggered animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Card Total Products */}
      <motion.div 
        className="rounded-lg p-6 shadow-sm bg-gradient-to-br from-indigo-600 to-indigo-900 text-white cursor-pointer"
        variants={item}
        whileHover={{ 
          scale: 1.03, 
          boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)",
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-indigo-200 mb-1">Total Products</h3>
            <motion.p 
              className="text-2xl font-bold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {loading ? "Loading..." : productsTotal.toLocaleString()}
            </motion.p>
          </div>
          <motion.div 
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm"
            whileHover={{ rotate: 15 }}
            animate={{ rotate: [0, 5, 0] }}
            transition={{ repeat: 0, duration: 0.5, delay: 0.3 }}
          >
            <Package className="h-5 w-5 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Card Total Users */}
      <motion.div 
        className="rounded-lg p-6 shadow-sm bg-gradient-to-br from-blue-600 to-blue-900 text-white cursor-pointer"
        variants={item}
        whileHover={{ 
          scale: 1.03, 
          boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)",
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-blue-200 mb-1">Total Users</h3>
            <motion.p 
              className="text-2xl font-bold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {loading ? "Loading..." : usersTotal.toLocaleString()}
            </motion.p>
          </div>
          <motion.div 
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm"
            whileHover={{ rotate: 15 }}
            animate={{ rotate: [0, 5, 0] }}
            transition={{ repeat: 0, duration: 0.5, delay: 0.4 }}
          >
            <Users className="h-5 w-5 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Card Total Carts */}
      <motion.div 
        className="rounded-lg p-6 shadow-sm bg-gradient-to-br from-green-600 to-green-900 text-white cursor-pointer"
        variants={item}
        whileHover={{ 
          scale: 1.03, 
          boxShadow: "0 10px 25px -5px rgba(22, 163, 74, 0.4)",
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-green-200 mb-1">Total Carts</h3>
            <motion.p 
              className="text-2xl font-bold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {loading ? "Loading..." : cartsTotal.toLocaleString()}
            </motion.p>
          </div>
          <motion.div 
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm"
            whileHover={{ rotate: 15 }}
            animate={{ rotate: [0, 5, 0] }}
            transition={{ repeat: 0, duration: 0.5, delay: 0.5 }}
          >
            <ShoppingCart className="h-5 w-5 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Card Total Revenue */}
      <motion.div 
        className="rounded-lg p-6 shadow-sm bg-gradient-to-br from-red-600 to-red-900 text-white cursor-pointer"
        variants={item}
        whileHover={{ 
          scale: 1.03, 
          boxShadow: "0 10px 25px -5px rgba(220, 38, 38, 0.4)",
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-red-200 mb-1">Total Revenue</h3>
            <motion.p 
              className="text-2xl font-bold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {loading ? "Loading..." : `$${revenue.toLocaleString()}`}
            </motion.p>
          </div>
          <motion.div 
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm"
            whileHover={{ rotate: 15 }}
            animate={{ rotate: [0, 5, 0] }}
            transition={{ repeat: 0, duration: 0.5, delay: 0.6 }}
          >
            <DollarSign className="h-5 w-5 text-white" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CardTotal;