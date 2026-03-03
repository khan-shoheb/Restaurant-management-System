import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Building, CreditCard, Users, BarChart2, Settings, LifeBuoy } from "lucide-react";

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

export default function SuperAdminLayout({ children }) {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const handleLogout = () => {
    localStorage.removeItem("isSuperAdmin");
    localStorage.removeItem("userRole");
    window.location.href = "/admin-login";
  };
  return (
    <div className="min-h-screen flex bg-[#f7f8fa]">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col gap-4 border-r">
        <h2 className="text-2xl font-extrabold mb-8 text-red-600">Super Admin</h2>
        <nav className="flex flex-col gap-2">
          {sidebarNav.map(item => (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition ${currentPath === item.route ? "bg-red-100 text-red-600" : "hover:bg-gray-100 text-gray-700 font-medium"}`}
              onClick={() => navigate(item.route)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
        >
          Logout
        </button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
