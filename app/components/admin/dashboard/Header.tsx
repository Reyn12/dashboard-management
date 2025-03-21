"use client";

import React from "react";
import { Bell, Search, Plus, ChevronDown, User, Users } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <div className="text-xl font-semibold">Dashboard</div>
      </div>
      
      {/* Desktop navigation */}
      <div className="hidden lg:flex items-center gap-4">
        <div className="flex items-center">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs border-2 border-white">
              <Users size={14} />
            </div>
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs border-2 border-white">
              <Users size={14} />
            </div>
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
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
            <User size={16} />
          </div>
          <button className="text-gray-500">
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="flex lg:hidden items-center gap-3">
        <div className="relative">
          <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 relative">
            <Bell size={16} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
        </div>
        
        <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200">
          <Search size={16} />
        </button>
        
        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
          <User size={16} />
        </div>
      </div>
    </header>
  );
};

export default Header;