"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  BarChart2,
  Percent,
  Settings,
  LogOut,
} from "lucide-react";
import { useSignOut } from "@/hooks/useAuth";

const dockItems = [
  { icon: LayoutGrid, label: "Overview", href: "/dashboard" },
  { icon: Package, label: "Products", href: "/dashboard/products" },
  { icon: FolderTree, label: "Categories", href: "/dashboard/categories" },
  { icon: ShoppingBag, label: "Orders", href: "/dashboard/orders" },
  { icon: Users, label: "Customers", href: "/dashboard/customers" },
  { icon: BarChart2, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Percent, label: "Discounts", href: "/dashboard/discounts" },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const { signOutNow } = useSignOut("/");

  return (
    <aside className="w-20 flex flex-col items-center py-6 px-3 sticky top-20 h-[calc(100vh-80px)] z-20 select-none">
      {/* Quixotic Floating Icon Dock Card */}
      <div className="w-14 bg-white border border-gray-200/80 rounded-3xl p-2.5 shadow-md flex flex-col items-center justify-between flex-1 space-y-4">
        {/* Top & Navigation Icons */}
        <div className="flex flex-col items-center space-y-3 w-full">
          {dockItems.map((item, index) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                title={item.label}
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
            href="/dashboard/settings"
            title="Settings"
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
    </aside>
  );
};

