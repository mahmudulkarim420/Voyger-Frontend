"use client";

import React, { useState } from "react";
import { useAuthCheck } from "@/hooks/useAuth";
import { SuperAdminNavbar } from "@/components/super-admin/SuperAdminNavbar";
import { SuperAdminSidebar } from "@/components/super-admin/SuperAdminSidebar";
import { ShieldAlert, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const { user, role, isPending, isAuthenticated } = useAuthCheck();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // 1. Loading State
  if (isPending) {
    return (
      <div className="min-h-screen bg-[#FCFAF6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#B37068] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-gray-500">Verifying Super Admin Authorization...</p>
        </div>
      </div>
    );
  }

  // 2. Access Protection (Must be authenticated & Role must be SUPER_ADMIN, ADMIN, or authenticated user)
  const rawRole = (user as any)?.role || role || "";
  const normalizedRole = rawRole.toString().toUpperCase().replace(/[-_]/g, "");

  const isSuperAdminOrAdmin =
    !rawRole || // Allow authenticated session fallback
    normalizedRole === "SUPERADMIN" ||
    normalizedRole === "ADMIN" ||
    normalizedRole === "AUTHOR" ||
    normalizedRole === "USER";

  if (!isAuthenticated || !isSuperAdminOrAdmin) {
    return (
      <div className="min-h-screen bg-[#FCFAF6] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-gray-200/80 shadow-lg text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <Lock size={32} />
          </div>

          <h2 className="text-xl font-extrabold text-[#3A322B]">Super Admin Access Restricted</h2>

          <p className="text-xs text-gray-500 leading-relaxed">
            You must be logged in with a <span className="font-bold text-[#B37068]">SUPER_ADMIN</span> or <span className="font-bold text-[#3A322B]">ADMIN</span> privilege to view the platform administration area.
          </p>

          <div className="pt-3 flex flex-col gap-2.5">
            <Link
              href="/login"
              className="w-full bg-[#B37068] hover:bg-[#9c6059] text-white py-3 rounded-2xl text-xs font-bold transition-all shadow-xs block text-center"
            >
              Sign In as Super Admin
            </Link>

            <Link
              href="/"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={14} />
              <span>Back to Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authorized Super Admin Layout
  return (
    <div className="min-h-screen bg-[#FCFAF6] font-sans antialiased text-[#3A322B]">
      <SuperAdminNavbar onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
      <div className="flex w-full">
        <SuperAdminSidebar
          isMobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />
        <main className="flex-1 p-6 md:p-8 min-w-0 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
