"use client";

import React from "react";
import { Bell, Search, Plus } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="text-xl font-semibold">Dashboard</div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <div className="flex -space-x-2">
            <Image 
              src="/avatar1.png" 
              alt="User Avatar" 
              width={32} 
              height={32} 
              className="rounded-full border-2 border-white"
            />
            <Image 
              src="/avatar2.png" 
              alt="User Avatar" 
              width={32} 
              height={32} 
              className="rounded-full border-2 border-white"
            />
          </div>
          <span className="ml-1 text-gray-500 text-sm">+2</span>
        </div>
        
        <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200">
          <Plus size={16} />
        </button>
        
        <div className="relative">
          <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 relative">
            <Bell size={16} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
        </div>
        
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search anything"
            className="pl-10 pr-4 py-1.5 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute right-3 text-xs text-gray-400">⌘K</div>
        </div>
        
        <div className="flex items-center gap-2">
          <Image
            src="/user-avatar.png"
            alt="User"
            width={32}
            height={32}
            className="rounded-full"
          />
          <button className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};