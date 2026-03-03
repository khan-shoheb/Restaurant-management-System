import React from "react";
import SuperAdminLayout from "../components/SuperAdminLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { BarChart2 } from "lucide-react";

const salesData = [
  { month: "Jan", sales: 1200, orders: 320 },
  { month: "Feb", sales: 1800, orders: 400 },
  { month: "Mar", sales: 2400, orders: 500 },
  { month: "Apr", sales: 2000, orders: 450 },
  { month: "May", sales: 3200, orders: 600 },
  { month: "Jun", sales: 2800, orders: 550 },
  { month: "Jul", sales: 3000, orders: 580 },
  { month: "Aug", sales: 2600, orders: 520 },
  { month: "Sep", sales: 2200, orders: 480 },
  { month: "Oct", sales: 2700, orders: 510 },
  { month: "Nov", sales: 2500, orders: 490 },
  { month: "Dec", sales: 3100, orders: 610 },
];

export default function SuperAdminAnalytics() {
  return (
    <SuperAdminLayout>
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-500 mb-8">Sales, orders, and performance overview</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border">
            <span className="bg-blue-100 p-4 rounded-xl mb-2">
              <BarChart2 className="h-8 w-8 text-blue-600" />
            </span>
            <div className="text-md font-semibold text-gray-700">Total Sales</div>
            <div className="text-3xl font-extrabold text-blue-700 mt-2">$32K</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border">
            <span className="bg-green-100 p-4 rounded-xl mb-2">
              <BarChart2 className="h-8 w-8 text-green-600" />
            </span>
            <div className="text-md font-semibold text-gray-700">Total Orders</div>
            <div className="text-3xl font-extrabold text-green-700 mt-2">6,100</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border">
            <span className="bg-yellow-100 p-4 rounded-xl mb-2">
              <BarChart2 className="h-8 w-8 text-yellow-600" />
            </span>
            <div className="text-md font-semibold text-gray-700">Avg. Order Value</div>
            <div className="text-3xl font-extrabold text-yellow-700 mt-2">$52</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border">
            <span className="bg-purple-100 p-4 rounded-xl mb-2">
              <BarChart2 className="h-8 w-8 text-purple-600" />
            </span>
            <div className="text-md font-semibold text-gray-700">Top Month</div>
            <div className="text-3xl font-extrabold text-purple-700 mt-2">May</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-8 border mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-blue-500">📈</span> Sales & Orders Trend
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="orders" stroke="#22c55e" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
