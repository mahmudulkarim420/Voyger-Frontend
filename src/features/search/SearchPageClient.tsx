"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { products as fallbackProducts } from "@/data/products";
import { ProductCard } from "@/features/products/ProductCard";
import { HoverButton } from "@/components/ui/HoverButton";
import { fetchApi } from "@/lib/api";

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setFilteredProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchApi(`search?q=${encodeURIComponent(query)}`).then((res) => {
      if (res.success && Array.isArray(res.data)) {
        setFilteredProducts(res.data);
      } else {
        const staticFiltered = fallbackProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()),
        );
        setFilteredProducts(staticFiltered);
      }
      setLoading(false);
    });
  }, [query]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search");
    if (typeof searchQuery === "string" && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FCFAF6]">
      <div className="border-b border-[#D5C1B6]/20 bg-[#FCFAF6] py-16">
        <div className="container-standard">
          <div className="flex flex-col gap-8 max-w-4xl">
            <h1 className="heading-hero">Search Results</h1>
            <form
              onSubmit={handleSearch}
              className="flex w-full max-w-2xl shadow-sm rounded-[1px] overflow-hidden"
            >
              <input
                type="text"
                name="search"
                placeholder="Search products, collections..."
                defaultValue={query}
                className="flex-1 border border-[#D5C1B6]/30 text-[#3A322B] px-6 py-4 bg-white focus:outline-none focus:border-[#A05C55] text-sm placeholder:text-gray-300 transition-all duration-300"
              />
              <HoverButton
                type="submit"
                variant="primary"
                size="md"
                className="rounded-none border-none p-0 px-6 w-auto cursor-pointer"
                aria-label="Submit search"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:scale-110 transition-transform"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </HoverButton>
            </form>
          </div>
        </div>
      </div>

      <div className="container-standard section-padding">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-100 animate-pulse rounded" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div>
            <p className="text-[#6A5A4A] mb-12 italic font-light">
              Found {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""} for
              &quot;
              <span className="font-semibold text-[#3A322B] not-italic">{query}</span>&quot;
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} priority={idx < 4} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-8 opacity-20">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6A5A4A"
                strokeWidth="1"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h2 className="text-2xl font-serif font-light text-[#3A322B] mb-4">No results found</h2>
            <p className="text-[#6A5A4A] mb-10 max-w-md italic font-light">
              {query
                ? `We couldn't find any items matching "${query}". Try refining your search or browsing our collections.`
                : "Please enter a search term to explore our collections."}
            </p>
            <Link
              href="/"
              className="bg-[#A05C55] hover:bg-[#8e524b] text-white px-10 py-3 rounded-[1px] font-bold tracking-[2px] text-xs transition-all uppercase shadow-sm"
            >
              Return Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
