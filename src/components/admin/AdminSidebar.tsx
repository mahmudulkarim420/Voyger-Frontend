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
  Boxes,
  Star,
  Percent,
  CreditCard,
  Truck,
  User as UserIcon,
  LogOut,
  X,
} from "lucide-react";
import { useSignOut } from "@/hooks/useAuth";

const dockItems = [
  { icon: LayoutGrid, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: FolderTree, label: "Categories", href: "/admin/categories" },
  { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: Boxes, label: "Inventory", href: "/admin/inventory" },
  { icon: Star, label: "Reviews", href: "/admin/reviews" },
  { icon: Percent, label: "Coupons", href: "/admin/coupons" },
  { icon: CreditCard, label: "Payments", href: "/admin/payments" },
  { icon: Truck, label: "Shipping", href: "/admin/shipping" },
];

interface AdminSidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
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
            item.href === "/admin"
              ? pathname === "/admin"
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

      {/* Bottom Actions (Account & Logout) */}
      <div className="flex flex-col items-center space-y-2 pt-4 border-t border-gray-100 w-full">
        <Link
          href="/profile"
          title="Account Profile"
          onClick={onCloseMobile}
          className="w-10 h-10 rounded-2xl text-gray-400 hover:text-gray-800 hover:bg-gray-100/80 flex items-center justify-center transition-colors cursor-pointer"
        >
          <UserIcon size={20} strokeWidth={1.8} />
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
