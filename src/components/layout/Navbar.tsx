"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { BsCart2 } from "react-icons/bs";
import {
  FiUser,
  FiSearch,
  FiChevronDown,
  FiX,
  FiHome,
  FiLogIn,
  FiPackage,
  FiGrid,
} from "react-icons/fi";
import { storeCategories } from "@/data/categories";
import { desktopNavigationGroups } from "@/data/navigation";
import { isAccountRoute, quickAccessLinks } from "@/lib/navigation";
import { useCart } from "@/hooks/useCart";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/formatters";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

const categoriesById = new Map(storeCategories.map((category) => [category.id, category]));

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { cartCount, setIsCartOpen } = useCart();
  const isOnAccountPage = isAccountRoute(pathname);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = useMemo(() => {
    if (searchQuery.trim().length <= 1) return [];

    const query = searchQuery.toLowerCase();

    return products
      .filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query),
      )
      .slice(0, 5);
  }, [searchQuery]);

  const shouldShowSuggestions = showSuggestions && searchQuery.trim().length > 1;
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  const handleViewAllResults = () => {
    if (!searchQuery.trim()) return;

    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  return (
    <nav className="hidden md:block border-b border-gray-200/50 bg-[#FCFAF6] sticky top-0 z-50">
      <div className="container-standard h-20 flex items-center justify-between">
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
              <path
                d="M4 10 L16 30 L28 10"
                stroke="black"
                strokeWidth="1.5"
                strokeLinejoin="miter"
              />
              <path d="M16 2 L16 30" stroke="black" strokeWidth="1.5" />
              <path d="M10 6 L10 20" stroke="black" strokeWidth="1.5" />
              <path d="M22 6 L22 20" stroke="black" strokeWidth="1.5" />
              <path d="M4 10 L10 10" stroke="black" strokeWidth="1.5" />
              <path d="M22 10 L28 10" stroke="black" strokeWidth="1.5" />
            </svg>
            <span className="text-xl text-black font-medium tracking-[0.2em] mt-1">VOYΛGE</span>
          </Link>

          {/* --- SHOP dropdown (shown when NOT on account pages) --- */}
          {!isOnAccountPage && (
            <div className="group h-full flex items-center relative">
              <button
                type="button"
                className="hidden md:flex items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity mt-1"
                aria-label="Open shop categories"
              >
                <span className="text-sm tracking-widest font-medium text-gray-900">SHOP</span>
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
                          className="font-semibold tracking-widest text-sm mb-2 text-gray-900 hover:text-[#B37068] transition-colors"
                          aria-label={`Browse ${category?.name ?? group.name}`}
                        >
                          {group.name}
                        </Link>
                        {group.children?.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="relative text-gray-600 hover:text-black text-sm transition-colors duration-300 ease-in-out pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
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
          )}

          {/* --- Quick Access links (shown ONLY on account pages) --- */}
          {isOnAccountPage && (
            <div className="flex items-center gap-1 h-full">
              {[
                { name: "Home", href: "/", icon: FiHome },
                { name: "Profile", href: "/profile", icon: FiUser },
                { name: "Orders", href: "/orders", icon: FiPackage },
                { name: "Dashboard", href: "/dashboard", icon: FiGrid },
              ].map((item) => {
                const isActive =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
                      isActive
                        ? "bg-[#F4EBE4] text-[#B37068]"
                        : "text-gray-600 hover:bg-gray-100 hover:text-black"
                    }`}
                  >
                    <item.icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Middle Section: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative" ref={dropdownRef}>
          <form onSubmit={handleSearch} className="flex w-full">
            <div className="relative flex-1">
              <input
                type="text"
                autoComplete="off"
                placeholder="Search Product"
                value={searchQuery}
                onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.trim().length > 1);
                }}
                className="w-full border border-gray-300 text-black rounded-l-md px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#B37068] focus:ring-1 focus:ring-[#B37068] text-sm placeholder:text-gray-400 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setShowSuggestions(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX size={14} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-[#B37068] hover:bg-[#9c6059] active:bg-[#8b5249] transition-colors px-6 rounded-r-md flex items-center justify-center border border-[#B37068] cursor-pointer"
              aria-label="Search products"
            >
              <FiSearch size={18} color="white" strokeWidth={2} />
            </button>
          </form>

          {/* Suggestions Dropdown */}
          {shouldShowSuggestions && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-100 rounded-lg shadow-[0_10px_40px_-5px_rgba(0,0,0,0.1)] z-50 overflow-hidden">
              <div className="p-2 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] pl-2">
                  Top Suggestions
                </span>
              </div>

              <div className="max-h-[350px] overflow-y-auto">
                {suggestions.length > 0 ? (
                  <>
                    {suggestions.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                        onClick={() => {
                          setSearchQuery("");
                          setShowSuggestions(false);
                        }}
                      >
                        <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </h4>

                          <p className="text-[11px] text-gray-500 capitalize">
                            {product.category.replace("-", " ")}
                          </p>
                        </div>

                        <div className="text-sm font-semibold text-[#B37068]">
                          {formatPrice(product.price)}
                        </div>
                      </Link>
                    ))}

                    <button
                      type="button"
                      onClick={handleViewAllResults}
                      className="w-full p-3 text-center text-xs font-semibold text-gray-500 hover:text-black hover:bg-gray-100 cursor-pointer transition-colors bg-gray-50/50"
                    >
                      View all results for &quot;{searchQuery}&quot;
                    </button>
                  </>
                ) : (
                  <div className="py-8 px-4 text-center">
                    <div className="text-sm font-semibold text-gray-700">No products found</div>

                    <div className="text-xs text-gray-500 mt-1">
                      No results found for &quot;{searchQuery}&quot;
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

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
                aria-label="Go to login page"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                aria-label="Go to registration page"
              >
                Create Account
              </Link>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                aria-label="Go to profile page"
              >
                Profile
              </Link>
              <Link
                href="/orders"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                aria-label="Go to orders page"
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
              <span className="absolute -top-1.5 -right-2 bg-[#B37068] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
