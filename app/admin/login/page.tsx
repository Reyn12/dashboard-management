"use client";

import { useState } from 'react';
// import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementasi login nanti di sini
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 to-blue-950">
      {/* Left side - Brand */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 text-white">
        <div className="max-w-md w-full">
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-2">Market Cyber</h1>
            <p className="text-blue-300">Admin Dashboard</p>
          </div>
          
          <div className="bg-blue-900/30 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-blue-800/50">
            <h2 className="text-2xl font-semibold mb-6">Login to Dashboard</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-blue-950/50 border border-blue-700 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="mb-6">
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
              </div>
              
              <div className="flex items-center justify-between mb-6">
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
              </div>
              
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 transform hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Sign In
              </button>
            </form>
          </div>
          
          <div className="mt-8 text-center text-blue-300 text-sm">
            &copy; {new Date().getFullYear()} Market Cyber. All rights reserved.
          </div>
        </div>
      </div>
      
      {/* Right side - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-blue-900/20 items-center justify-center p-8">
        <div className="max-w-lg">
          <div className="relative w-full h-96">
            {/* Kamu bisa ganti dengan gambar yang sesuai */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Welcome to Market Cyber</h2>
                <p className="text-blue-200 max-w-md mx-auto">
                  Manage your products, track sales, and grow your business with our powerful dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}