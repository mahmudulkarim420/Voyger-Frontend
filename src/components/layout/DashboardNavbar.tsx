import React from "react";
import Image from "next/image";
import { Search, Bell } from "lucide-react";

export const DashboardNavbar = () => {
  return (
    <header className="h-16 border-b border-gray-100 bg-white px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search something..."
            className="w-full bg-gray-50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-black/5 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-500 hover:text-black transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-black leading-none">Alex Rivera</p>
            <p className="text-xs text-gray-500 mt-1">Premium Member</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100"
              alt="Avatar"
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
