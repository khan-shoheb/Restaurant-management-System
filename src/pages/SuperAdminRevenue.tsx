import React from "react";
import SuperAdminLayout from "../components/SuperAdminLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart2 } from "lucide-react";

const revenueData = [
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

export default function SuperAdminRevenue() {
  // Stat card values (example)
  const totalRevenue = 316000;
  const thisMonth = 58000;
  const expenses = 33000;
  const profitMargin = 43;
  const totalRevenueFormatted = totalRevenue.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const highestMonthFormatted = (32000).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const lowestMonthFormatted = (12000).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  return (
    <SuperAdminLayout>
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Revenue</h1>
        <p className="text-gray-500 mb-8">Financial overview and analytics</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border">
            <span className="bg-green-100 p-4 rounded-xl mb-2">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path stroke="#22c55e" strokeWidth="2" d="M12 3v18m0 0c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/></svg>
            </span>
            <div className="text-md font-semibold text-gray-700">Total Revenue</div>
            <div className="text-3xl font-extrabold text-gray-900 mt-2">${totalRevenue.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border">
            <span className="bg-blue-100 p-4 rounded-xl mb-2">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path stroke="#2563eb" strokeWidth="2" d="M4 17l6-6 4 4 6-6"/></svg>
            </span>
            <div className="text-md font-semibold text-gray-700">This Month</div>
            <div className="text-3xl font-extrabold text-gray-900 mt-2">${thisMonth.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border">
            <span className="bg-yellow-100 p-4 rounded-xl mb-2">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path stroke="#f59e42" strokeWidth="2" d="M20 7c-2.5 7-9.5 7-12 0"/></svg>
            </span>
            <div className="text-md font-semibold text-gray-700">Expenses</div>
            <div className="text-3xl font-extrabold text-gray-900 mt-2">${expenses.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border">
            <span className="bg-purple-100 p-4 rounded-xl mb-2">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path stroke="#a78bfa" strokeWidth="2" d="M7 17c0-2.5 2-4.5 4.5-4.5S16 14.5 16 17"/><text x="6" y="22" fontSize="10" fill="#a78bfa">%</text></svg>
            </span>
            <div className="text-md font-semibold text-gray-700">Profit Margin</div>
            <div className="text-3xl font-extrabold text-gray-900 mt-2">{profitMargin}%</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-8 border mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-yellow-500">📊</span> Monthly Revenue Chart
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#f409c9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 border">
          <h2 className="text-lg font-bold mb-4 text-yellow-700">Summary</h2>
          <ul className="text-gray-700 text-md">
            <li>Total Revenue: <span className="font-bold text-yellow-700">{totalRevenueFormatted}</span></li>
            <li>Highest Month: <span className="font-bold text-yellow-700">May ({highestMonthFormatted})</span></li>
            <li>Lowest Month: <span className="font-bold text-yellow-700">Jan ({lowestMonthFormatted})</span></li>
          </ul>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
