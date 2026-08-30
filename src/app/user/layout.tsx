"use client";

import React, { useState } from "react";
import { useAuthCheck } from "@/hooks/useAuth";
import { UserNavbar } from "@/components/user/UserNavbar";
import { UserSidebar } from "@/components/user/UserSidebar";
import { Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { isPending, isAuthenticated } = useAuthCheck();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // 1. Loading State
  if (isPending) {
    return (
      <div className="min-h-screen bg-[#FCFAF6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#B37068] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-gray-500">Loading Customer Account...</p>
        </div>
      </div>
    );
  }

  // 2. Authentication Protection
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FCFAF6] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-gray-200/80 shadow-lg text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Lock size={32} />
          </div>

          <h2 className="text-xl font-extrabold text-[#3A322B]">Customer Sign In Required</h2>

          <p className="text-xs text-gray-500 leading-relaxed">
            Please log in to your <span className="font-bold text-[#B37068]">VOYΛGE</span> account to view your orders, wishlist, shipping addresses, and personal profile.
          </p>

          <div className="pt-3 flex flex-col gap-2.5">
            <Link
              href="/login"
              className="w-full bg-[#B37068] hover:bg-[#9c6059] text-white py-3 rounded-2xl text-xs font-bold transition-all shadow-xs block text-center"
            >
              Sign In to Your Account
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

  // 3. Authorized Customer Layout
  return (
    <div className="min-h-screen bg-[#FCFAF6] font-sans antialiased text-[#3A322B]">
      <UserNavbar onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
      <div className="flex w-full">
        <UserSidebar
          isMobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />
        <main className="flex-1 p-6 md:p-8 min-w-0 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
