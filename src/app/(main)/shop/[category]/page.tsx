import { products, featuredProducts } from "@/data/products";
import { storeCategories } from "@/data/categories";
import { ProductCard } from "@/features/products/ProductCard";
import type { ProductCategorySlug } from "@/types";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  let filteredProducts = [];

  // Special handling for new-arrivals category
  if (category === "new-arrivals") {
    // Show featured products for new-arrivals
    filteredProducts = featuredProducts;
  } else {
    // Get products for this category and all its subcategories
    const categoriesToInclude: ProductCategorySlug[] = [category as ProductCategorySlug];

    // Find all subcategories if this is a parent category
    const subCategories = storeCategories
      .filter((cat) => cat.parentId === category)
      .map((cat) => cat.id);

    categoriesToInclude.push(...subCategories);

    // Filter products by category and subcategories
    filteredProducts = products.filter((p) => categoriesToInclude.includes(p.category));
  }

  // Format category title
  const getCategoryName = (): string => {
    const categoryData = storeCategories.find((cat) => cat.id === category);
    if (categoryData) {
      return categoryData.name;
    }
    // Fallback: convert slug to title case
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const categoryTitle = getCategoryName();

  return (
    <div className="w-full bg-[#FCFAF6] min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <h1 className="text-3xl text-center mb-12 text-[#6A5A4A] tracking-widest font-serif font-light">
          {categoryTitle}
        </h1>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filteredProducts.map((product, idx) => (
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
