"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsCart2 } from "react-icons/bs";
import { FiUser, FiSearch, FiChevronDown } from "react-icons/fi";
import { storeCategories } from "@/data/categories";
import { desktopNavigationGroups } from "@/data/navigation";
import { useCart } from "@/context/CartContext";

const categoriesById = new Map(storeCategories.map((category) => [category.id, category]));

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const router = useRouter();
  const { cartCount, setIsCartOpen } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="hidden md:block border-b border-gray-200/50 bg-[#FCFAF6] sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Section: Logo & Shop Link */}
        <div className="flex items-center gap-10 h-full">
          <Link href="/" className="flex items-center gap-3">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer V */}
              <path
                d="M4 10 L16 30 L28 10"
                stroke="black"
                strokeWidth="1.5"
                strokeLinejoin="miter"
              />
              {/* Center vertical */}
              <path d="M16 2 L16 30" stroke="black" strokeWidth="1.5" />
              {/* Left vertical */}
              <path d="M10 6 L10 20" stroke="black" strokeWidth="1.5" />
              {/* Right vertical */}
              <path d="M22 6 L22 20" stroke="black" strokeWidth="1.5" />
              {/* Top horizontal connections */}
              <path d="M4 10 L10 10" stroke="black" strokeWidth="1.5" />
              <path d="M22 10 L28 10" stroke="black" strokeWidth="1.5" />
            </svg>
            <span className="text-[22px] text-black font-medium tracking-[0.2em] mt-1">VOYΛGE</span>
          </Link>

          <div className="group h-full flex items-center relative">
            <button
              type="button"
              className="hidden md:flex items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity mt-1"
              aria-label="Open shop categories"
            >
              <span className="text-[14px] tracking-widest font-medium text-gray-900">SHOP</span>
              <FiChevronDown
                className="group-hover:rotate-180 transition-transform duration-300 text-black"
                size={14}
              />
            </button>

            {/* Dropdown Menu */}
            <div className="fixed left-0 right-0 top-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 group-hover:translate-y-0 translate-y-2 z-50">
              <div className="bg-[#FCFAF6] w-full shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] border-b border-gray-200/60 p-10 flex justify-center gap-16">
                {desktopNavigationGroups.map((group) => {
                  const category = group.categoryId ? categoriesById.get(group.categoryId) : null;

                  return (
                    <div key={group.name} className="flex flex-col gap-4">
                      <Link
                        href={group.href}
                        className="font-semibold tracking-widest text-[15px] mb-2 text-gray-900 hover:text-[#B37068] transition-colors"
                        aria-label={`Browse ${category?.name ?? group.name}`}
                      >
                        {group.name}
                      </Link>
                      {group.children?.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-gray-600 hover:text-black transition-colors text-[15px]"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
          <input
            type="text"
            placeholder="Search Product"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 text-black rounded-l-md px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#B37068] focus:ring-1 focus:ring-[#B37068] text-sm placeholder:text-gray-400 transition-all duration-200"
          />
          <button
            type="submit"
            className="bg-[#B37068] hover:bg-[#9c6059] active:bg-[#8b5249] transition-colors px-6 rounded-r-md flex items-center justify-center border border-[#B37068] cursor-pointer"
            aria-label="Search products"
          >
            <FiSearch size={18} color="white" strokeWidth={2} />
          </button>
        </form>

        {/* Right Section: Icons */}
        <div className="flex items-center gap-6">
          <div className="relative group">
            <button
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className="hover:opacity-70 transition-opacity p-2"
              aria-label="Open account menu"
            >
              <FiUser size={24} className="text-black" strokeWidth={1.5} />
            </button>

            {/* Account Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-2">
              <Link
                href="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Create Account
              </Link>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Profile
              </Link>
              <Link
                href="/orders"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Orders
              </Link>
              <hr className="my-2" />
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative hover:opacity-70 transition-opacity p-2"
            aria-label="Open cart"
          >
            <BsCart2 className="text-black" size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#B37068] text-white text-[10px] font-medium w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
