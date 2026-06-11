import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductSectionGridProps {
  title: string;
  description: string;
  products: Product[];
}

export const ProductSectionGrid = ({ title, description, products }: ProductSectionGridProps) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#FCFAF6] px-4 py-12 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-8 flex flex-col gap-3 text-center md:mx-auto md:max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A05C55]">
            Voyage Edit
          </p>
          <h2 className="text-2xl font-light tracking-[0.08em] text-[#3A322B] md:text-3xl">
            {title}
          </h2>
          <p className="text-sm leading-6 text-gray-600">{description}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 2} />
          ))}
        </div>
      </div>
    </section>
  );
};

