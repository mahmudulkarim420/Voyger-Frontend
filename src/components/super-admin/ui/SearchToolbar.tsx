"use client";

import React from "react";
import { Search, Filter, X } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface SearchToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: Option[];
  children?: React.ReactNode;
}

export const SearchToolbar: React.FC<SearchToolbarProps> = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  filterValue,
  onFilterChange,
  filterOptions,
  children,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-200/70 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative flex-1 w-full">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-8 text-xs outline-none focus:border-[#B37068] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        {filterOptions && onFilterChange && (
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-400" />
            <select
              value={filterValue}
              onChange={(e) => onFilterChange(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#B37068] cursor-pointer"
            >
              {filterOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};
