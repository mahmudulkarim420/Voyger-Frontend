import React, { Suspense } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/features/products/ProductCard";
import { ProductFilters } from "@/features/products/ProductFilters";
import { Pagination } from "@/features/products/Pagination";
import { storeCategories } from "@/data/categories";

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
  const category = typeof searchParams.category === "string" ? searchParams.category : "all";
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : "newest";
  const page = typeof searchParams.page === "string" ? searchParams.page : "1";
  
  const currentPage = parseInt(page);

  // Filtering and Sorting Logic
  let filteredProducts = [...products];

  // 1. Search Filter
  if (search) {
    const query = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  // 2. Category Filter (including subcategories)
  if (category && category !== "all") {
    const categoriesToInclude = [category];
    
    // Find all subcategories if this is a parent category
    const subCategories = storeCategories
      .filter((cat) => cat.parentId === category)
      .map((cat) => cat.id);
    
    categoriesToInclude.push(...subCategories);
    
    filteredProducts = filteredProducts.filter((p) => 
      categoriesToInclude.includes(p.category)
    );
  }

  // 3. Sorting
  switch (sort) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "newest":
    default:
      filteredProducts.sort(
        (a, b) =>
          new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime()
      );
  }

  // 4. Pagination Logic
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const safePage = Math.min(Math.max(1, currentPage), totalPages || 1);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

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
              {paginatedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 4 && safePage === 1}
                />
              ))}
            </div>

            <Suspense fallback={<div className="h-10 w-48 mx-auto bg-gray-50 animate-pulse rounded-full mt-16" />}>
              <Pagination currentPage={safePage} totalPages={totalPages} />
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
