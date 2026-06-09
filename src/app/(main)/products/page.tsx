import React from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/modules/products/ProductCard";

export const metadata = {
  title: "All Products | VOYAGE",
  description: "Explore our premium collection of apparel.",
};

export default function ProductsPage() {
  return (
    <div className="w-full min-h-screen bg-[#FCFAF6]">
      <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-black mb-2">All Products</h1>
          <p className="text-gray-500 max-w-md">
            Browse our curated selection of high-quality shirts, panjabis, and denim.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Placeholder for filters */}
          <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-black/5 outline-none">
            <option>Newest Arrivals</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index < 4} />
        ))}
      </div>
    </div>
  );
}
