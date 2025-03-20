"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Pakai dummyjson.com untuk auth
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username: email, // dummyjson pakai username, bukan email
        password: password,
      });

      // Simpan token di cookies
      const token = response.data.token;
      const userData = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        image: response.data.image,
      };

      // Simpan token dan user data
      if (rememberMe) {
        // Token expired dalam 30 hari jika remember me
        Cookies.set('auth_token', token, { expires: 30 });
        localStorage.setItem('user_data', JSON.stringify(userData));
      } else {
        // Token expired ketika browser ditutup jika tidak remember me
        Cookies.set('auth_token', token);
        sessionStorage.setItem('user_data', JSON.stringify(userData));
      }

      // Redirect ke dashboard
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Animasi variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
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
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 to-blue-950">
      {/* Left side - Brand */}
      <motion.div 
        className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 text-white"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-md w-full">
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-2">Cyber Market</h1>
            <p className="text-blue-300">Admin Dashboard</p>
          </motion.div>
          
          <motion.div 
            className="bg-blue-900/30 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-blue-800/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.h2 
              className="text-2xl font-semibold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Login to Dashboard
            </motion.h2>
            
            {error && (
              <motion.div 
                className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}
            
            <motion.form 
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="mb-4" variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-1">
                  Username/Email
                </label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-blue-950/50 border border-blue-700 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username or email"
                  required
                />
              </motion.div>
              
              <motion.div className="mb-6" variants={itemVariants}>
                <label htmlFor="password" className="block text-sm font-medium text-blue-200 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-blue-950/50 border border-blue-700 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-between mb-6"
                variants={itemVariants}
              >
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-blue-700 rounded bg-blue-950"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-200">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link href="#" className="text-blue-300 hover:text-blue-200">
                    Forgot password?
                  </Link>
                </div>
              </motion.div>
              
              <motion.button
                type="submit"
                className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                variants={itemVariants}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'Sign In'}
              </motion.button>
            </motion.form>
            
            {/* Dummy account info */}
            <motion.div 
              className="mt-6 p-3 bg-blue-800/20 border border-blue-700/30 rounded-lg text-blue-200 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <p className="font-medium mb-1">Demo Account:</p>
              <p>Username: <span className="text-blue-300">emilys</span></p>
              <p>Password: <span className="text-blue-300">emilyspass</span></p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-8 text-center text-blue-300 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            &copy; {new Date().getFullYear()} Market Cyber. All rights reserved.
          </motion.div>
        </div>
      </motion.div>
      
      {/* Right side - Illustration */}
      <motion.div 
        className="hidden md:flex md:w-1/2 bg-blue-900/20 items-center justify-center p-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div 
          className="max-w-lg w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="relative w-full h-96">
            <div className="absolute inset-0 flex items-center justify-center ">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-white mb-4">Welcome to Market Cyber</h2>
                <p className="text-blue-200 max-w-md mx-auto">
                  Manage your products, track sales, and grow your business with our powerful dashboard.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}