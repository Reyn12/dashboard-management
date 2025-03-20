"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Hapus token dan user data
    Cookies.remove('auth_token');
    localStorage.removeItem('user_data');
    sessionStorage.removeItem('user_data');
    router.push('/admin/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: ShoppingBag, label: 'Products', path: '/admin/dashboard/products' },
    { icon: Users, label: 'Customers', path: '/admin/dashboard/customers' },
    { icon: Settings, label: 'Settings', path: '/admin/dashboard/settings' },
  ];

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} h-screen bg-white border-r border-gray-200 transition-all duration-300 relative`}>
      {/* Toggle Button (Absolute positioned outside sidebar) */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 shadow-md z-10"
      >
        {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
      </button>

      {/* Logo */}
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'px-6'} h-16 border-b border-gray-200`}>
        {collapsed ? (
          <span className="text-2xl font-bold text-blue-600">MC</span>
        ) : (
          <span className="text-xl font-bold text-gray-800">Market Cyber</span>
        )}
      </div>

      {/* Menu */}
      <nav className="mt-6">
        <ul>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            
            return (
              <li key={index}>
                <Link href={item.path}>
                  <div 
                    className={`flex ${collapsed ? 'justify-center' : 'px-6'} py-3 items-center ${isActive 
                      ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
                      : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <Icon className={`${isActive ? 'text-blue-600' : ''}`} size={20} />
                    {!collapsed && (
                      <span className="ml-3">{item.label}</span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout button at bottom */}
      <div className="absolute bottom-0 w-full border-t border-gray-200">
        <button 
          onClick={handleLogout}
          className={`flex ${collapsed ? 'justify-center' : 'px-6'} py-3 items-center w-full text-gray-500 hover:bg-gray-50`}
        >
          <LogOut size={20} />
          {!collapsed && (
            <span className="ml-3">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
}