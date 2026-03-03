import SuperAdminRestaurants from "./pages/SuperAdminRestaurants";
import SuperAdminSubscriptions from "./pages/SuperAdminSubscriptions";
import SuperAdminRevenue from "./pages/SuperAdminRevenue";
import SuperAdminUsers from "./pages/SuperAdminUsers";
import SuperAdminAnalytics from "./pages/SuperAdminAnalytics";
import SuperAdminSettings from "./pages/SuperAdminSettings";
import SuperAdminSupport from "./pages/SuperAdminSupport";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import Index from "./pages/Index";
import Billing from "./pages/Billing";
import Payroll from "./pages/Payroll";
import Tasks from "./pages/Tasks";
import MenuManagement from "./pages/MenuManagement";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import CRM from "./pages/CRM";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import RecipeManagement from "./pages/RecipeManagement";
import AdminUsers from "./pages/AdminUsers";
import MyProfile from "./pages/MyProfile";

const queryClient = new QueryClient();

const getRole = () => localStorage.getItem("userRole");

const WelcomePage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded shadow text-center">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">Welcome!</h2>
      <p className="text-gray-700">You are logged in as <span className="font-semibold">{getRole()}</span>. No dashboard is assigned for this role.</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/" element={
            getRole() === "admin"
              ? <Index />
              : getRole() === "superadmin"
                ? <SuperAdminDashboard />
                : <AdminLogin />
          } />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/superadmin-login" element={<SuperAdminLogin />} />
          <Route path="/billing" element={
            getRole() === "admin" ? <Billing /> : <AdminLogin />
          } />
          <Route path="/payroll" element={
            getRole() === "admin" ? <Payroll /> : <AdminLogin />
          } />
          <Route path="/tasks" element={
            getRole() === "admin" ? <Tasks /> : <AdminLogin />
          } />
          <Route path="/menu" element={
            getRole() === "admin" ? <MenuManagement /> : <AdminLogin />
          } />
          <Route path="/orders" element={
            getRole() === "admin" ? <Orders /> : <AdminLogin />
          } />
          <Route path="/inventory" element={
            getRole() === "admin" ? <Inventory /> : <AdminLogin />
          } />
          <Route path="/crm" element={
            getRole() === "admin" ? <CRM /> : <AdminLogin />
          } />
          <Route path="/reports" element={
            getRole() === "admin" ? <Reports /> : <AdminLogin />
          } />
          <Route path="/recipe-management" element={
            getRole() === "admin" ? <RecipeManagement /> : <AdminLogin />
          } />
          <Route path="/admin-users" element={
            getRole() === "admin" ? <AdminUsers /> : <AdminLogin />
          } />
          <Route path="/my-profile" element={
            getRole() === "admin" ? <MyProfile /> : <AdminLogin />
          } />
          <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />
          <Route path="/superadmin-restaurants" element={<SuperAdminRestaurants />} />
          <Route path="/superadmin-subscriptions" element={<SuperAdminSubscriptions />} />
          <Route path="/superadmin-revenue" element={<SuperAdminRevenue />} />
          <Route path="/superadmin-users" element={<SuperAdminUsers />} />
          <Route path="/superadmin-analytics" element={<SuperAdminAnalytics />} />
          <Route path="/superadmin-settings" element={<SuperAdminSettings />} />
          <Route path="/superadmin-support" element={<SuperAdminSupport />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
