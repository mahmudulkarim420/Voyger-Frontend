"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { BsCart2, BsHouse, BsSearch, BsPerson, BsHeadset, BsX } from "react-icons/bs";
import { FiHome, FiLogIn, FiUser, FiPackage, FiGrid, FiChevronRight } from "react-icons/fi";
import { storeCategories } from "@/data/categories";
import { bottomNavigation, mobileNavigationGroups, trendingSearches } from "@/data/navigation";
import { isAccountRoute, quickAccessLinks } from "@/lib/navigation";
import { useCart } from "@/hooks/useCart";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/formatters";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

const categoriesById = new Map(storeCategories.map((category) => [category.id, category]));

export const MobileNavigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();
  const isOnAccountPage = isAccountRoute(pathname);

  const suggestions = useMemo(() => {
    if (searchQuery.trim().length <= 1) return [];

    const query = searchQuery.toLowerCase();

    return products
      .filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query),
      )
      .slice(0, 6);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#FCFAF6]/80 backdrop-blur-md border-b border-gray-200/20 h-16 flex items-center justify-between px-4 transition-all">
        {/* Hamburger Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 w-6 h-6 justify-center z-50"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-full bg-black transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`h-0.5 w-full bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-full bg-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>

        {/* Logo Center */}
        <Link href="/" className="flex items-center gap-1">
          <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 10 L16 30 L28 10"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinejoin="miter"
            />
            <path d="M16 2 L16 30" stroke="#000000" strokeWidth="1.5" />
            <path d="M10 6 L10 20" stroke="#000000" strokeWidth="1.5" />
            <path d="M22 6 L22 20" stroke="#000000" strokeWidth="1.5" />
            <path d="M4 10 L10 10" stroke="#000000" strokeWidth="1.5" />
            <path d="M22 10 L28 10" stroke="#000000" strokeWidth="1.5" />
          </svg>
          <span className="text-sm font-medium tracking-[0.15em] text-black">VOYAGE</span>
        </Link>

        {/* Cart Icon Right */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative text-black"
          aria-label="Open cart"
        >
          <BsCart2 size={20} color="#000000" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-[#B37068] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Sidebar Navigation - Always rendered with transition */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
          menuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Sidebar Panel */}
        <div
          className={`absolute left-0 top-0 w-[80%] max-w-sm h-full bg-[#FCFAF6] shadow-2xl transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) p-8 flex flex-col ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mt-16 flex-1 overflow-y-auto no-scrollbar">
            {/* --- Collections (shown when NOT on account pages) --- */}
            {!isOnAccountPage && (
              <>
                <h2 className="text-[11px] font-bold tracking-[0.3em] text-gray-400 mb-8 uppercase">
                  Collections
                </h2>

                <div className="flex flex-col">
                  {mobileNavigationGroups.map((category) => {
                    const categoryDetails = category.categoryId
                      ? categoriesById.get(category.categoryId)
                      : null;

                    return (
                      <div key={category.name} className="border-b border-gray-100/50 py-4">
                        <div
                          className="flex items-center justify-between cursor-pointer group"
                          onClick={() =>
                            category.children &&
                            setActiveCategory(
                              activeCategory === category.name ? null : category.name,
                            )
                          }
                        >
                          <Link
                            href={category.href}
                            className="text-[14px] font-bold tracking-[0.2em] text-gray-900 group-hover:text-[#B37068] transition-colors"
                            aria-label={`Browse ${categoryDetails?.name ?? category.name}`}
                            onClick={(e) => {
                              if (category.children) {
                                e.preventDefault();
                              } else {
                                setMenuOpen(false);
                              }
                            }}
                          >
                            {category.name}
                          </Link>
                          {category.children && (
                            <div
                              className={`p-1.5 rounded-full bg-gray-50 transition-all duration-300 ${activeCategory === category.name ? "rotate-180 bg-[#F4EBE4] text-[#B37068]" : "text-gray-400"}`}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Subcategories Accordion */}
                        {category.children && (
                          <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${
                              activeCategory === category.name
                                ? "max-h-[500px] mt-2 opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="flex flex-col gap-1 py-2">
                              {category.children.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  className="text-[14px] text-gray-600 hover:text-black py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-between group/sub"
                                  onClick={() => setMenuOpen(false)}
                                >
                                  <span>{sub.name}</span>
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all"
                                  >
                                    <path d="m9 18 6-6-6-6" />
                                  </svg>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* --- Quick Access (shown ONLY on account pages) --- */}
            {isOnAccountPage && (
              <div className="mt-2">
                <h2 className="text-[11px] font-bold tracking-[0.3em] text-gray-400 mb-5 uppercase">
                  My Account
                </h2>
                <div className="flex flex-col gap-1">
                  {[
                    { name: "Home", href: "/", icon: FiHome },
                    { name: "Sign In / Sign Up", href: "/login", icon: FiLogIn },
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
                        className={`flex items-center justify-between py-3 px-3 rounded-lg text-[14px] font-medium transition-all group/link ${
                          isActive
                            ? "bg-[#F4EBE4] text-[#B37068]"
                            : "text-gray-700 hover:bg-gray-50 hover:text-black"
                        }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon
                            size={18}
                            className={`transition-colors ${
                              isActive
                                ? "text-[#B37068]"
                                : "text-gray-400 group-hover/link:text-[#B37068]"
                            }`}
                          />
                          <span>{item.name}</span>
                        </div>
                        <FiChevronRight
                          size={14}
                          className={`transition-all ${
                            isActive
                              ? "text-[#B37068] opacity-100"
                              : "text-gray-300 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0"
                          }`}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Social Links / Footer inside Sidebar */}
          <div className="pt-8 border-t border-gray-100 flex gap-6 grayscale opacity-60">
            {/* Social Icons Placeholder */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-5 h-5 bg-black rounded-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FCFAF6] border-t border-gray-200/50 h-16 flex items-center justify-around px-2">
        {bottomNavigation.map((item) => {
          if (item.name === "Search") {
            return (
              <button
                key={item.name}
                onClick={() => setSearchOpen(true)}
                className="flex flex-col items-center gap-1 py-2 text-gray-700 hover:text-black transition-colors"
                aria-label="Open product search"
              >
                <BsSearch size={22} />
                <span className="text-[10px] font-medium">{item.name}</span>
              </button>
            );
          }

          const Icon =
            item.name === "Home"
              ? BsHouse
              : item.name === "Cart"
                ? BsCart2
                : item.name === "Account"
                  ? BsPerson
                  : BsHeadset;

          const content = (
            <>
              <div className="relative">
                <Icon size={22} />
                {item.name === "Cart" && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#B37068] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.name}</span>
            </>
          );

          if (item.href.startsWith("tel:")) {
            return (
              <a
                key={item.name}
                href={item.href}
                className="flex flex-col items-center gap-1 py-2 text-gray-700 hover:text-black transition-colors"
                aria-label="Call support"
              >
                {content}
              </a>
            );
          }

          return (
            <button
              key={item.name}
              onClick={() => {
                if (item.name === "Cart") {
                  setIsCartOpen(true);
                } else {
                  router.push(item.href);
                }
              }}
              className="flex flex-col items-center gap-1 py-2 relative text-gray-700 hover:text-black transition-colors"
              aria-label={item.name === "Cart" ? "Open cart" : `Go to ${item.name}`}
            >
              {content}
            </button>
          );
        })}
      </div>

      {/* Mobile Padding Bottom */}
      <div className="md:hidden h-16" />

      {/* Search Overlay - Always rendered for smooth transition */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-500 ease-in-out ${
          searchOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop Overlay */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            searchOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSearchOpen(false)}
        />

        {/* Search Panel - Sliding from top */}
        <div
          className={`absolute top-0 left-0 right-0 bg-[#FCFAF6] shadow-2xl z-50 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col max-h-[90vh] ${
            searchOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {/* Search Bar Container */}
          <div className="px-6 py-5 border-b border-gray-100">
            <form onSubmit={handleSearch} className="flex items-center gap-4">
              <div className="flex-1 flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl border border-transparent focus-within:border-[#B37068] transition-all">
                <BsSearch size={18} className="text-gray-500" />
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent w-full outline-none text-[15px] text-gray-900 placeholder:text-gray-400 font-medium"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:text-black transition-colors"
                aria-label="Close search"
              >
                <BsX size={26} />
              </button>
            </form>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
            {suggestions.length > 0 ? (
              <div className="px-6 py-6 animate-in fade-in slide-in-from-top-4 duration-300">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 px-1">
                  Products Found
                </p>
                <div className="space-y-4">
                  {suggestions.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm active:scale-[0.98] transition-all"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[14px] font-bold text-gray-900 truncate mb-0.5">
                          {product.name}
                        </h4>
                        <p className="text-[12px] text-gray-500 capitalize">
                          {product.category.replace("-", " ")}
                        </p>
                        <div className="mt-1 text-[13px] font-bold text-[#B37068]">
                          {formatPrice(product.price)}
                        </div>
                      </div>
                    </Link>
                  ))}
                  <button
                    onClick={handleSearch}
                    className="w-full py-4 bg-gray-900 text-white rounded-xl text-sm font-bold tracking-widest uppercase mt-4 active:scale-[0.98] transition-all"
                  >
                    View All Results
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-6 py-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 px-1">
                  Trending Now
                </p>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setSearchQuery(item);
                        router.push(`/search?q=${encodeURIComponent(item)}`);
                        setSearchOpen(false);
                      }}
                      className="px-4 py-2.5 bg-white border border-gray-100 text-gray-700 rounded-xl text-sm font-bold hover:border-[#B37068] hover:text-[#B37068] transition-all shadow-sm active:scale-95"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
