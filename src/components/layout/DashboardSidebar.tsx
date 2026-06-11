import React from "react";
import Link from "next/link";
import { LayoutDashboard, User, Settings, LogOut, Package, Star } from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Package, label: "Orders", href: "/dashboard/orders" },
  { icon: Star, label: "Wishlist", href: "/dashboard/wishlist" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export const DashboardSidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out">
      <div className="p-6 border-b border-gray-50">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-black">
          VOYAGE
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 hover:text-black transition-colors group"
          >
            <item.icon className="w-5 h-5 group-hover:text-black group-hover:scale-110 transition-transform" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-50">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};
