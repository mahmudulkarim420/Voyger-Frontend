import { getProductsByCategory } from "@/data/products";
import { ProductCard } from "@/features/products/ProductCard";
import type { ProductCategorySlug } from "@/types";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  const products = getProductsByCategory(category as ProductCategorySlug);
  const categoryTitle = category.replace("-", " ").toUpperCase();

  return (
    <div className="w-full bg-[#FCFAF6] min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <h1 className="text-3xl text-center mb-12 text-[#6A5A4A] tracking-widest font-serif font-light">
          {categoryTitle}
        </h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product, idx) => (
              <ProductCard key={product.id} product={product} priority={idx < 4} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-[#6A5A4A] italic font-light text-lg mb-8">
              No products found in the &quot;{categoryTitle}&quot; collection.
            </p>
            <Link
              href="/"
              className="bg-[#A05C55] hover:bg-[#8e524b] text-white px-10 py-3 rounded-[1px] font-bold tracking-[2px] text-xs transition-all uppercase shadow-sm inline-block"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
