"use client";

import React, { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";
import { storeCategories } from "@/data/categories";

export const ProductFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [category, setCategory] = useState(() => searchParams.get("category") || "all");
  const [sort, setSort] = useState(() => searchParams.get("sort") || "newest");

  const updateFilters = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      // We include current local search in params when updating other things
      // unless search is explicitly being updated
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

      // Reset page when filters change
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
    router.push("/products", { scroll: false });
  };

  const hasActiveFilters = search || category !== "all" || sort !== "newest";

  return (
    <div className="bg-white border-2 border-[#B37068]/5 rounded-2xl p-6 shadow-sm mb-10">
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Search Bar Section */}
        <div className="w-full lg:flex-1 relative">
          <label
            htmlFor="product-search"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 ml-1"
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
                className="w-full text-black border border-gray-200 rounded-l-xl px-5 py-3 pl-12 text-sm focus:ring-2 focus:ring-[#B37068]/10 focus:border-[#B37068] outline-none transition-all placeholder:text-black"
              />
              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX size={14} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-[#B37068] hover:bg-[#9c6059] text-white px-6 py-3 rounded-r-xl text-sm font-medium transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Filters Section */}
        <div className="w-full lg:w-auto flex flex-wrap items-end gap-4">
          <div className="flex-1 lg:flex-none min-w-[160px]">
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

          <div className="flex-1 lg:flex-none min-w-[160px]">
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
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#B37068] px-2 py-3 transition-colors"
            >
              <FiX size={16} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
