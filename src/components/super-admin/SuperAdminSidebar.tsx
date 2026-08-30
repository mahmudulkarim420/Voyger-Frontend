"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  BarChart2,
  Wallet,
  FileText,
  CreditCard,
  Mail,
  Percent,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { useSignOut } from "@/hooks/useAuth";

const dockItems = [
  { icon: LayoutGrid, label: "Dashboard", href: "/super-admin" },
  { icon: BarChart2, label: "Analytics", href: "/super-admin/analytics" },
  { icon: Wallet, label: "Payments", href: "/super-admin/payments" },
  { icon: FileText, label: "Orders", href: "/super-admin/orders" },
  { icon: CreditCard, label: "Products", href: "/super-admin/products" },
  { icon: Mail, label: "Reviews", href: "/super-admin/reviews" },
  { icon: Percent, label: "Coupons", href: "/super-admin/coupons" },
];

interface SuperAdminSidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const pathname = usePathname();
  const { signOutNow } = useSignOut("/");

  const sidebarContent = (
    <div className="w-14 bg-white border border-gray-200/80 rounded-3xl p-2.5 shadow-md flex flex-col items-center justify-between flex-1 space-y-4">
      {/* Top & Navigation Icons */}
      <div className="flex flex-col items-center space-y-3 w-full">
        {dockItems.map((item) => {
          const isActive =
            item.href === "/super-admin"
              ? pathname === "/super-admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              title={item.label}
              onClick={onCloseMobile}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                isActive
                  ? "bg-[#B37068] text-white shadow-md scale-105 font-bold"
                  : "text-gray-400 hover:text-gray-800 hover:bg-gray-100/80"
              }`}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            </Link>
          );
        })}
      </div>

      {/* Bottom Actions (Settings & Logout) */}
      <div className="flex flex-col items-center space-y-2 pt-4 border-t border-gray-100 w-full">
        <Link
          href="/super-admin/admins"
          title="Admin Settings"
          onClick={onCloseMobile}
          className="w-10 h-10 rounded-2xl text-gray-400 hover:text-gray-800 hover:bg-gray-100/80 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Settings size={20} strokeWidth={1.8} />
        </Link>

        <button
          onClick={signOutNow}
          title="Logout"
          className="w-10 h-10 rounded-2xl text-gray-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
        >
          <LogOut size={20} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Floating Sidebar Sticky Container */}
      <aside className="hidden md:flex w-20 flex-col items-center py-6 px-3 sticky top-20 h-[calc(100vh-80px)] z-20 select-none">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 w-20 h-full p-3 flex flex-col justify-center animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

