"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuthCheck, useSignOut } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { Search, Bell, ChevronDown, User as UserIcon, LogOut, Shield, Menu } from "lucide-react";

interface AdminNavbarProps {
  onToggleMobileSidebar?: () => void;
}

const navTabs = [
  { name: "Dashboard", href: "/admin" },
  { name: "Products", href: "/admin/products" },
  { name: "Categories", href: "/admin/categories" },
  { name: "Orders", href: "/admin/orders" },
  { name: "Customers", href: "/admin/customers" },
  { name: "Inventory", href: "/admin/inventory" },
  { name: "Reviews", href: "/admin/reviews" },
  { name: "Coupons", href: "/admin/coupons" },
  { name: "Shipping", href: "/admin/shipping" },
];

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ onToggleMobileSidebar }) => {
  const { user } = useAuthCheck();
  const { signOutNow } = useSignOut("/");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const userName = user?.name || "Store Admin";

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-6 md:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      {/* Left: Mobile Menu Toggle & Brand Logo */}
      <div className="flex items-center gap-4">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            <Menu size={22} />
          </button>
        )}

        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#B37068] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            V
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-[0.15em] text-[#3A322B] leading-none">
              VOYΛGE
            </span>
            <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mt-0.5 flex items-center gap-1">
              <Shield size={10} className="text-[#B37068]" /> Admin Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Center: Quixotic Nav Section Pills */}
      <div className="hidden lg:flex items-center bg-gray-100/80 p-1.5 rounded-full border border-gray-200/60 shadow-inner">
        {navTabs.map((tab) => {
          const isActive =
            tab.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
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

      {/* Right Actions: Search, Notification & Profile Avatar Dropdown */}
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
                {userName[0]?.toUpperCase() || "A"}
              </div>
            )}
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2.5 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-900 truncate">{userName}</p>
                <p className="text-[11px] text-gray-500 truncate">{user?.email || "admin@voyage.com"}</p>
                <span className="inline-flex items-center gap-1 mt-1 text-[9px] font-extrabold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200">
                  ADMIN
                </span>
              </div>
              <Link
                href="/profile"
                className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <UserIcon size={15} />
                <span>My Account</span>
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
