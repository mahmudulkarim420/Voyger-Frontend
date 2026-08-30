"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuthCheck, useSignOut } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { Search, Bell, ChevronDown, User as UserIcon, LogOut } from "lucide-react";

const navTabs = [
  { name: "Overview", href: "/dashboard" },
  { name: "Products", href: "/dashboard/products" },
  { name: "Categories", href: "/dashboard/categories" },
  { name: "Orders", href: "/dashboard/orders" },
  { name: "Customers", href: "/dashboard/customers" },
  { name: "Analytics", href: "/dashboard/analytics" },
  { name: "Discounts", href: "/dashboard/discounts" },
  { name: "Settings", href: "/dashboard/settings" },
];

export const DashboardNavbar = () => {
  const { user } = useAuthCheck();
  const { signOutNow } = useSignOut("/");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const userName = user?.name || "Sujon";

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      {/* Left: Brand Logo */}
      <Link href="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-[#B37068] text-white flex items-center justify-center font-bold text-lg shadow-sm">
          V
        </div>
        <span className="text-xl font-bold tracking-[0.15em] text-[#3A322B] hidden sm:inline">
          VOYΛGE
        </span>
      </Link>

      {/* Center: Quixotic Nav Section Pills with Real Links */}
      <div className="hidden lg:flex items-center bg-gray-100/80 p-1.5 rounded-full border border-gray-200/60 shadow-inner">
        {navTabs.map((tab) => {
          const isActive =
            tab.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-white text-[#3A322B] shadow-sm font-bold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>

      {/* Right: Search, Notifications & User Avatar */}
      <div className="flex items-center gap-3">
        <button
          className="p-2.5 rounded-full bg-gray-100/80 text-gray-600 hover:bg-gray-200/70 hover:text-black transition-colors cursor-pointer"
          aria-label="Search"
        >
          <Search size={18} />
        </button>

        <button
          className="relative p-2.5 rounded-full bg-gray-100/80 text-gray-600 hover:bg-gray-200/70 hover:text-black transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#B37068] rounded-full border-2 border-white" />
        </button>

        {/* User Profile Avatar Dropdown */}
        <div className="relative ml-1">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 cursor-pointer p-0.5 rounded-full hover:ring-2 hover:ring-[#B37068]/30 transition-all"
          >
            {user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={userName}
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#3A322B] text-white font-bold text-sm flex items-center justify-center shadow-sm">
                {userName[0]?.toUpperCase() || "S"}
              </div>
            )}
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2.5 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-900 truncate">{userName}</p>
                <p className="text-[11px] text-gray-500 truncate">{user?.email || "admin@voyage.com"}</p>
              </div>
              <Link
                href="/profile"
                className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <UserIcon size={15} />
                <span>My Profile</span>
              </Link>
              <button
                onClick={signOutNow}
                className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors font-medium border-t border-gray-100 mt-1 cursor-pointer"
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};


