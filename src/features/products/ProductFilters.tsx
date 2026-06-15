"use client";

import React, { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";
import { SlidersHorizontal } from "lucide-react"; // ফিল্টার আইকনের জন্য
import { storeCategories } from "@/data/categories";

export const ProductFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [category, setCategory] = useState(() => searchParams.get("category") || "all");
  const [sort, setSort] = useState(() => searchParams.get("sort") || "newest");
  
  // ড্রয়ার ওপেন/ক্লোজ করার স্টেট
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const updateFilters = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      if (!("search" in updates)) {
        if (search) params.set("search", search);
        else params.delete("search");
      }

      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== "all" && value !== "") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      params.delete("page");
      router.push(`/products?${params.toString()}`, { scroll: false });
    },
    [router, search, searchParams],
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search });
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("newest");
    setIsDrawerOpen(false); // ক্লিয়ার করার পর ড্রয়ার বন্ধ হবে
    router.push("/products", { scroll: false });
  };

  const hasActiveFilters = search || category !== "all" || sort !== "newest";

  return (
    <div className="mb-8">
      {/* ----------------- MAIN FILTER BAR (RESPONSIVE) ----------------- */}
      <div className="bg-white border border-[#B37068]/10 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm">
        <div className="flex gap-3 lg:gap-6 items-center">
          
          {/* Search Bar Container */}
          <div className="flex-1 relative">
            <label
              htmlFor="product-search"
              className="hidden lg:block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 ml-1"
            >
              Search Products
            </label>
            <form onSubmit={handleSearchSubmit} className="relative flex">
              <div className="relative flex-1">
                <input
                  id="product-search"
                  type="text"
                  autoComplete="off"
                  placeholder="What are you looking for?"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-black border border-gray-200 rounded-l-xl px-4 lg:px-5 py-2.5 lg:py-3 pl-10 lg:pl-12 text-sm focus:ring-2 focus:ring-[#B37068]/10 focus:border-[#B37068] outline-none transition-all placeholder:text-gray-400"
                />
                <FiSearch
                  className="absolute left-3.5 lg:left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={14} />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="bg-[#B37068] hover:bg-[#9c6059] text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-r-xl text-sm font-medium transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>

          {/* Mobile Filter Trigger Button (רק ב-Mobile দেখাবে) */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-[#F4EBE4] text-[#B37068] border border-[#B37068]/20 px-4 py-2.5 rounded-xl text-sm font-medium h-[42px] mt-0"
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-[#B37068] rounded-full" />
            )}
          </button>

          {/* Desktop Filters Section (רק ב-Desktop দেখাবে) */}
          <div className="hidden lg:flex items-end gap-4">
            <div className="min-w-[180px]">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 ml-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const val = e.target.value;
                  setCategory(val);
                  updateFilters({ category: val });
                }}
                className="w-full bg-white border border-gray-200 text-gray-600 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#B37068]/10 focus:border-[#B37068] outline-none cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_12_center] bg-no-repeat"
              >
                <option value="all">All Categories</option>
                {storeCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-[180px]">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 ml-1">
                Sort By
              </label>
              <select
                value={sort}
                onChange={(e) => {
                  const val = e.target.value;
                  setSort(val);
                  updateFilters({ sort: val });
                }}
                className="w-full bg-white border border-gray-200 text-gray-600 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#B37068]/10 focus:border-[#B37068] outline-none cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_12_center] bg-no-repeat"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#B37068] px-2 py-3 transition-colors h-[46px]"
              >
                <FiX size={16} />
                <span>Clear</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ----------------- MOBILE BOTTOM DRAWER ----------------- */}
      {/* Backdrop Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 lg:hidden ${
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer Body */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 shadow-2xl transition-transform duration-300 transform lg:hidden ${
          isDrawerOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "85vh" }}
      >
        {/* Drawer Header Indicator */}
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

        {/* Drawer Title & Close Button */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Filter & Sort</h3>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-black"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Filter Form Controls */}
        <div className="flex flex-col gap-5 overflow-y-auto pb-6">
          {/* Category Select */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => {
                const val = e.target.value;
                setCategory(val);
                updateFilters({ category: val });
              }}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:border-[#B37068] outline-none appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_12_center] bg-no-repeat"
            >
              <option value="all">All Categories</option>
              {storeCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Select */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Sort By
            </label>
            <select
              value={sort}
              onChange={(e) => {
                const val = e.target.value;
                setSort(val);
                updateFilters({ sort: val });
              }}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:border-[#B37068] outline-none appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_12_center] bg-no-repeat"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
            </select>
          </div>
        </div>

        {/* Drawer Action Buttons */}
        <div className="flex gap-4 mt-2 pt-4 border-t border-gray-100">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl text-sm transition-colors"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="flex-1 bg-[#B37068] hover:bg-[#9c6059] text-white font-medium py-3 rounded-xl text-sm transition-colors text-center"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};