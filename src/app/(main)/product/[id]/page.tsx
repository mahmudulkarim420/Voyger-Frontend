import ProductDetails from "@/features/products/ProductDetails";
import { getProductById, getProductsByCategory, products } from "@/data/products";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  const similarProducts = products
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
