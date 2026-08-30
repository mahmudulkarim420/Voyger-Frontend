"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, LayoutGrid } from "lucide-react";
import { useAuthCheck } from "@/hooks/useAuth";
import { getDashboardRoute } from "@/lib/auth/route-policy";

export default function ForbiddenPage() {
  const { user, role, isAuthenticated } = useAuthCheck();
  const targetDashboard = getDashboardRoute(role);

  return (
    <div className="min-h-screen bg-[#FCFAF6] flex items-center justify-center p-4 font-sans antialiased text-[#3A322B]">
      <div className="bg-white rounded-3xl p-8 md:p-10 max-w-md w-full border border-gray-200/80 shadow-xl text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert size={40} strokeWidth={1.75} />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-[11px] font-bold tracking-widest uppercase">
            Error 403
          </span>
          <h1 className="text-2xl font-extrabold text-[#3A322B] tracking-tight">
            Access Restricted
          </h1>
          <p className="text-xs text-gray-500 leading-relaxed px-2">
            You do not have the required role permissions to view this area of the application.
          </p>
        </div>

        {isAuthenticated && user && (
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-xs text-gray-600 space-y-1">
            <p>
              Signed in as: <strong className="text-gray-900">{user.email}</strong>
            </p>
            <p>
              Assigned Role: <span className="font-bold text-[#B37068] uppercase">{role || "USER"}</span>
            </p>
          </div>
        )}

        <div className="pt-2 flex flex-col gap-3">
          {isAuthenticated ? (
            <Link
              href={targetDashboard}
              className="w-full bg-[#B37068] hover:bg-[#9c6059] text-white py-3.5 rounded-2xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <LayoutGrid size={16} />
              <span>Go to Your Authorized Dashboard</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="w-full bg-[#B37068] hover:bg-[#9c6059] text-white py-3.5 rounded-2xl text-xs font-bold transition-all shadow-sm block text-center"
            >
              Sign In to Your Account
            </Link>
          )}

          <Link
            href="/"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            <span>Return to Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
