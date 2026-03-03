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
    <div className="min-h-screen flex flex-col sm:flex-row bg-[#f7f8fa]">
      {/* Sidebar */}
      <aside className="w-full sm:w-64 bg-white shadow-lg p-4 sm:p-6 flex flex-row sm:flex-col gap-2 sm:gap-4 border-b sm:border-b-0 sm:border-r relative">
        <div className="flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start w-full">
          <h2 className="text-xl sm:text-2xl font-extrabold mb-0 sm:mb-8 text-red-600">Super Admin</h2>
        </div>
        <nav className="flex flex-row sm:flex-col gap-2 w-full">
          {sidebarNav.map(item => (
            <button
              key={item.label}
              className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 rounded-lg font-bold transition w-full ${currentPath === item.route ? "bg-red-100 text-red-600" : "hover:bg-gray-100 text-gray-700 font-medium"}`}
              onClick={() => navigate(item.route)}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden text-xs">{item.label[0]}</span>
            </button>
          ))}
        </nav>
        {/* Logout button: bottom for desktop, right for mobile */}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-2 rounded font-semibold hover:bg-red-700 transition sm:absolute sm:bottom-6 sm:left-6 sm:right-6 sm:w-auto w-full mt-0 sm:mt-0"
          style={{ marginTop: 'auto' }}
        >
          Logout
        </button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-2 sm:p-6 md:p-10">{children}</main>
    </div>
  );
}
