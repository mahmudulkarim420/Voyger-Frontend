import ProductDetails from "@/features/products/ProductDetails";
import { notFound } from "next/navigation";
import { fetchApi } from "@/lib/api";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetchApi(`products/${id}`);

  if (res.success && res.data) {
    const product = res.data.product ?? res.data;
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

  notFound();
}
