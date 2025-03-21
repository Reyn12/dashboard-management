"use client";

import React from "react";
import { Bell, Search, Plus, ChevronDown, User, Users } from "lucide-react";

interface HeaderProps {
  title?: string;
}

const Header = ({ title = "Dashboard" }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <div className="text-xl font-semibold">{title}</div>
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
        
        <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200">
          <Bell size={16} />
        </button>
        
        <div className="flex items-center ml-4">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
            <User size={16} />
          </div>
          <div className="ml-2">
            <div className="text-sm font-medium">Admin User</div>
            <div className="text-xs text-gray-500">admin@example.com</div>
          </div>
          <ChevronDown size={16} className="ml-2 text-gray-400" />
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="flex lg:hidden items-center gap-2">
        <button className="p-1.5 rounded-full bg-gray-100">
          <Search size={16} />
        </button>
        <button className="p-1.5 rounded-full bg-gray-100">
          <Bell size={16} />
        </button>
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
          <User size={16} />
        </div>
      </div>
    </header>
  );
};

export default Header;