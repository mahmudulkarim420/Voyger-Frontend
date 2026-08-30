import React from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardNavbar } from "@/components/layout/DashboardNavbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans antialiased text-[#3A322B]">
      <DashboardNavbar />
      <div className="flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8 min-w-0 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
