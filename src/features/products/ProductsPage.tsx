import React, { Suspense } from "react";
import { ProductCard } from "@/features/products/ProductCard";
import { ProductFilters } from "@/features/products/ProductFilters";
import { Pagination } from "@/features/products/Pagination";
import { fetchApi } from "@/lib/api";
import { products as fallbackProducts } from "@/data/products";

const ITEMS_PER_PAGE = 12;

export interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function ProductsPage(props: ProductsPageProps) {
  const searchParams = await props.searchParams;
  const search = typeof searchParams.search === "string" ? searchParams.search : "";
  const category = typeof searchParams.category === "string" ? searchParams.category : "";
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : "newest";
  const page = typeof searchParams.page === "string" ? searchParams.page : "1";
  const currentPage = parseInt(page);

  const queryParams = new URLSearchParams();
  if (search) queryParams.set("search", search);
  if (category && category !== "all") queryParams.set("category", category);
  if (sort) queryParams.set("sort", sort);
  queryParams.set("page", page);
  queryParams.set("limit", ITEMS_PER_PAGE.toString());

  const response = await fetchApi(`products?${queryParams.toString()}`);

  let paginatedProducts = [];
  let totalProducts = 0;
  let totalPages = 1;

  if (response.success && response.data) {
    paginatedProducts = response.data;
    totalProducts = response.meta?.total ?? response.data.length;
    totalPages = response.meta?.totalPages ?? Math.ceil(totalProducts / ITEMS_PER_PAGE);
  } else {
    // Fallback to static products if backend is not reachable
    let filtered = [...fallbackProducts];
    if (search) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category && category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }
    totalProducts = filtered.length;
    totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
    paginatedProducts = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  }

  return (
    <div className="w-full min-h-screen bg-[#FCFAF6] section-padding pt-10">
      <div className="container-standard">
        <header className="mb-10 text-center md:text-left">
          <h1 className="heading-hero mb-3">All Products</h1>
          <p className="text-gray-500 max-w-2xl">
            {totalProducts === 0
              ? "No products found matching your criteria."
              : `Showing ${paginatedProducts.length} of ${totalProducts} premium pieces crafted for your style.`}
          </p>
        </header>

        <Suspense fallback={<div className="h-20 bg-gray-50 animate-pulse rounded-lg mb-10" />}>
          <ProductFilters />
        </Suspense>

        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {paginatedProducts.map((product: any, index: number) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 4 && currentPage === 1}
                />
              ))}
            </div>

            <Suspense fallback={<div className="h-10 w-48 mx-auto bg-gray-50 animate-pulse rounded-full mt-16" />}>
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </Suspense>
          </>
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
