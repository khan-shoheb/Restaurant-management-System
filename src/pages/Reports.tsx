import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/StatCard";
import { IndianRupee, TrendingUp, ShoppingCart, Users } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart,
} from "recharts";
import { useState } from "react";
import jsPDF from "jspdf";

const monthlyRevenue = [
  { month: "Jan", revenue: 285000 }, { month: "Feb", revenue: 310000 },
  { month: "Mar", revenue: 295000 }, { month: "Apr", revenue: 340000 },
  { month: "May", revenue: 380000 }, { month: "Jun", revenue: 420000 },
];

const categoryData = [
  { name: "Main Course", value: 42 }, { name: "Starters", value: 22 },
  { name: "Beverages", value: 18 }, { name: "Desserts", value: 12 },
  { name: "Breads", value: 6 },
];

const COLORS = [
  "hsl(25, 95%, 53%)", "hsl(16, 80%, 50%)", "hsl(38, 92%, 50%)",
  "hsl(142, 70%, 45%)", "hsl(210, 80%, 55%)",
];

const dailyOrders = [
  { day: "Mon", orders: 85 }, { day: "Tue", orders: 92 },
  { day: "Wed", orders: 78 }, { day: "Thu", orders: 110 },
  { day: "Fri", orders: 145 }, { day: "Sat", orders: 168 },
  { day: "Sun", orders: 155 },
];

// Add expense and profit data
const expenseData = [
  { month: "Jan", expense: 180000, staff: 70000, rent: 40000, inventory: 70000 },
  { month: "Feb", expense: 190000, staff: 75000, rent: 40000, inventory: 75000 },
  { month: "Mar", expense: 175000, staff: 70000, rent: 40000, inventory: 65000 },
  { month: "Apr", expense: 200000, staff: 80000, rent: 40000, inventory: 80000 },
  { month: "May", expense: 210000, staff: 85000, rent: 40000, inventory: 85000 },
  { month: "Jun", expense: 220000, staff: 90000, rent: 40000, inventory: 90000 },
];
const profitData = monthlyRevenue.map((r, i) => ({
  month: r.month,
  revenue: r.revenue,
  expense: expenseData[i].expense,
  profit: r.revenue - expenseData[i].expense,
  staff: expenseData[i].staff,
  rent: expenseData[i].rent,
  inventory: expenseData[i].inventory,
}));

const Reports = () => {
  const [dateFilter, setDateFilter] = useState("30d");
  // Example: filter logic for chart data
  const filteredRevenue = monthlyRevenue; // Add filter logic as needed

  const handleDownload = (type: "pdf" | "csv") => {
    if (type === "csv") {
      // CSV export
      const csvRows = ["Month,Revenue"];
      filteredRevenue.forEach(row => {
        csvRows.push(`${row.month},${row.revenue}`);
      });
      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "revenue.csv";
      a.click();
      URL.revokeObjectURL(url);
    } else if (type === "pdf") {
      // PDF export
      const doc = new jsPDF();
      doc.text("Revenue Trend", 10, 10);
      filteredRevenue.forEach((row, i) => {
        doc.text(`${row.month}: ₹${row.revenue}`, 10, 20 + i * 10);
      });
      doc.save("revenue.pdf");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <select
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="1y">Last 1 year</option>
            </select>
            <button
              className="px-3 py-1 rounded bg-orange-100 text-orange-700 font-semibold text-sm border shadow"
              onClick={() => handleDownload("pdf")}
            >Download PDF</button>
            <button
              className="px-3 py-1 rounded bg-orange-100 text-orange-700 font-semibold text-sm border shadow"
              onClick={() => handleDownload("csv")}
            >Download CSV</button>
          </div>
          <p className="text-muted-foreground">Detailed insights into your restaurant performance</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <StatCard title="Monthly Revenue" value="₹4,20,000" change="+10.5% vs last month" changeType="positive" icon={<IndianRupee className="h-5 w-5" />} />
          <StatCard title="Growth Rate" value="12.8%" change="+2.3% improvement" changeType="positive" icon={<TrendingUp className="h-5 w-5" />} />
          <StatCard title="Monthly Orders" value="833" change="+65 orders" changeType="positive" icon={<ShoppingCart className="h-5 w-5" />} />
          <StatCard title="New Customers" value="48" change="+12 this month" changeType="positive" icon={<Users className="h-5 w-5" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <Card className="shadow-card animate-fade-in">
            <CardHeader><CardTitle className="text-base">Revenue Trend (6 Months)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={filteredRevenue} onClick={e => alert(`Month: ${e && e.activeLabel}`)}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#revenueGrad)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card animate-fade-in">
            <CardHeader><CardTitle className="text-base">Sales by Category</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value">
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                {categoryData.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-1.5 text-xs">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />
                    <span className="text-muted-foreground">{item.name} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card animate-slide-up w-full mb-4">
          <CardHeader><CardTitle className="text-base">Daily Orders This Week</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyOrders}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Selling Items Attraction Card */}
        <Card className="bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-100 shadow-2xl border-2 border-orange-500 animate-bounce w-full mb-4">
          <CardHeader>
            <CardTitle className="text-xl font-extrabold text-orange-700 flex items-center gap-2">
              <span>🌟</span> Top 5 Selling Items <span>🔥</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-base font-semibold text-orange-800">
              <li className="flex items-center gap-2"><span className="text-lg">🍗</span> Butter Chicken – <span className="text-orange-900">120 orders</span></li>
              <li className="flex items-center gap-2"><span className="text-lg">🧀</span> Paneer Tikka – <span className="text-orange-900">95 orders</span></li>
              <li className="flex items-center gap-2"><span className="text-lg">🥤</span> Cold Coffee – <span className="text-orange-900">80 orders</span></li>
              <li className="flex items-center gap-2"><span className="text-lg">🍚</span> Veg Biryani – <span className="text-orange-900">75 orders</span></li>
              <li className="flex items-center gap-2"><span className="text-lg">🥞</span> Masala Dosa – <span className="text-orange-900">70 orders</span></li>
            </ul>
          </CardContent>
        </Card>

        {/* Staff Performance Section */}
        <Card className="bg-gradient-to-r from-green-200 via-white to-green-100 shadow-2xl border-2 border-green-500 animate-bounce w-full mb-4">
          <CardHeader>
            <CardTitle className="text-xl font-extrabold text-green-800 flex items-center gap-2">
              <span>👨‍🍳</span> Staff Performance <span>🏆</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-base font-semibold text-green-900">
              <li className="flex items-center gap-2"><span className="text-lg">🥇</span> Ramesh Kumar – <span className="text-green-700">48 orders served</span> <span className="bg-green-300 text-green-900 px-2 py-0.5 rounded-full text-xs ml-2">Top Waiter</span></li>
              <li className="flex items-center gap-2"><span className="text-lg">🥈</span> Sunita Verma – <span className="text-green-700">44 orders served</span></li>
              <li className="flex items-center gap-2"><span className="text-lg">🥉</span> Amit Singh – <span className="text-green-700">41 orders served</span></li>
              <li className="flex items-center gap-2"><span className="text-lg">⭐</span> Priya Patel – <span className="text-green-700">39 orders served</span></li>
              <li className="flex items-center gap-2"><span className="text-lg">⭐</span> Vikram Joshi – <span className="text-green-700">36 orders served</span></li>
            </ul>
            <div className="mt-4 text-sm text-green-900 font-bold flex items-center gap-2">
              <span>Attendance:</span>
              <span className="bg-green-300 text-green-900 px-2 py-0.5 rounded-full">98% overall</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
