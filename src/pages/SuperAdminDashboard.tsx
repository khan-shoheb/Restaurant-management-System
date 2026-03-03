import React from "react";
import SuperAdminLayout from "../components/SuperAdminLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// Sample monthly revenue data
const data = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 24000 },
  { month: "Apr", revenue: 20000 },
  { month: "May", revenue: 32000 },
  { month: "Jun", revenue: 28000 },
  { month: "Jul", revenue: 30000 },
  { month: "Aug", revenue: 26000 },
  { month: "Sep", revenue: 22000 },
  { month: "Oct", revenue: 27000 },
  { month: "Nov", revenue: 25000 },
  { month: "Dec", revenue: 31000 },
];

import { useNavigate } from "react-router-dom";
import { Home, Building, CreditCard, Users, BarChart2, Settings, LifeBuoy } from "lucide-react";


export default function SuperAdminDashboard() {
  const handleLogout = () => {
    localStorage.removeItem("isSuperAdmin");
    localStorage.removeItem("userRole");
    window.location.href = "/admin-login";
  };
  const navigate = useNavigate();
  const sidebarNav = [
    { label: "Dashboard", icon: <Home />, route: "/superadmin-dashboard" },
    { label: "Restaurants", icon: <Building />, route: "/superadmin-restaurants" },
    { label: "Subscriptions", icon: <CreditCard />, route: "/superadmin-subscriptions" },
    { label: "Revenue", icon: <BarChart2 />, route: "/superadmin-revenue" },
    { label: "Users", icon: <Users />, route: "/superadmin-users" },
    { label: "Analytics", icon: <BarChart2 />, route: "/superadmin-analytics" },
    { label: "System Settings", icon: <Settings />, route: "/superadmin-settings" },
    { label: "Support", icon: <LifeBuoy />, route: "/superadmin-support" },
  ];
  const currentPath = window.location.pathname;
  return (
    <SuperAdminLayout>
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Super Admin Dashboard</h1>
        <p className="text-gray-500 mb-8">Overview of your restaurant management system</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border">
            <span className="bg-blue-100 p-3 rounded-full mb-2"><Building className="h-8 w-8 text-blue-600" /></span>
            <div className="text-md font-semibold text-gray-700">Total Restaurants</div>
            <div className="text-3xl font-extrabold text-blue-700 mt-2">142</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border">
            <span className="bg-green-100 p-3 rounded-full mb-2"><CreditCard className="h-8 w-8 text-green-600" /></span>
            <div className="text-md font-semibold text-gray-700">Active Restaurants</div>
            <div className="text-3xl font-extrabold text-green-700 mt-2">128 <span className="text-xs text-gray-400">Inactive: 14</span></div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border">
            <span className="bg-yellow-100 p-3 rounded-full mb-2"><BarChart2 className="h-8 w-8 text-yellow-600" /></span>
            <div className="text-md font-semibold text-gray-700">Total Revenue</div>
            <div className="text-3xl font-extrabold text-yellow-700 mt-2">$2.4M</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border">
            <span className="bg-purple-100 p-3 rounded-full mb-2"><Users className="h-8 w-8 text-purple-600" /></span>
            <div className="text-md font-semibold text-gray-700">Total Users</div>
            <div className="text-3xl font-extrabold text-purple-700 mt-2">8,540</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-8 border mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-purple-500">📊</span> Monthly Revenue Chart
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#f1e909" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
