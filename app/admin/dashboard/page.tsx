"use client";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-700">Total Sales</h2>
          <p className="text-3xl font-bold mt-2">$12,345</p>
          <p className="text-green-500 text-sm mt-2">↑ 12% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-700">Total Orders</h2>
          <p className="text-3xl font-bold mt-2">256</p>
          <p className="text-green-500 text-sm mt-2">↑ 8% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-700">New Customers</h2>
          <p className="text-3xl font-bold mt-2">64</p>
          <p className="text-red-500 text-sm mt-2">↓ 3% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-700">Conversion Rate</h2>
          <p className="text-3xl font-bold mt-2">3.2%</p>
          <p className="text-green-500 text-sm mt-2">↑ 1.5% from last month</p>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Recent Orders</h2>
        <p className="text-gray-500">No recent orders found.</p>
      </div>
    </div>
  );
}