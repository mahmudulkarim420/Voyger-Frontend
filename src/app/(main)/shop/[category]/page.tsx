import { storeCategories } from "@/config/categories";
import { ProductCard } from "@/features/products/ProductCard";
import Link from "next/link";
import { fetchApi } from "@/lib/api";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  let filteredProducts: any[] = [];

  const res = await fetchApi(`categories/${category}`);

  if (res.success && res.data && res.data.products) {
    filteredProducts = res.data.products;
  } else {
    const prodRes = await fetchApi(`products?category=${category}&limit=50`);
    if (prodRes.success && prodRes.data) {
      filteredProducts = Array.isArray(prodRes.data) ? prodRes.data : (prodRes.data.products ?? []);
    }
  }

  const getCategoryName = (): string => {
    const categoryData = storeCategories.find((cat) => cat.id === category);
    if (categoryData) {
      return categoryData.name;
    }
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
