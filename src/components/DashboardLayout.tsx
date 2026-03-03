import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { NotificationBell, ThemeToggle, AISuggestionPanel } from "@/components/StatCard";
import { UserCog } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col relative">
          <header className="h-14 flex items-center justify-between border-b px-4 bg-card relative">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <NotificationBell />
              <ThemeToggle />
              <AISuggestionPanel />
              <div className="flex items-center gap-2">
                <Link to="/my-profile" className="flex items-center gap-2 hover:underline">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <UserCog className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-blue-700 text-sm">Admin</span>
                </Link>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
