import ProductDetails from "@/features/products/ProductDetails";
import { getProductById, getProductsByCategory, products as fallbackProducts } from "@/data/products";
import { notFound } from "next/navigation";
import { fetchApi } from "@/lib/api";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetchApi(`products/${id}`);

  if (res.success && res.data) {
    const product = res.data;
    const relatedProducts = res.data.related ?? [];
    const similarProducts = res.data.similar ?? [];

    return (
      <ProductDetails
        product={product}
        relatedProducts={relatedProducts}
        similarProducts={similarProducts}
      />
    );
  }

  // Fallback to static mock data if backend not reachable
  const product = getProductById(id);
  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  const similarProducts = fallbackProducts
    .filter((item) => item.id !== product.id && item.category !== product.category)
    .slice(0, 4);

  return (
    <ProductDetails
      product={product}
      relatedProducts={relatedProducts}
      similarProducts={similarProducts}
    />
  );
}
