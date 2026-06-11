import ProductsPage, { type ProductsPageProps } from "@/features/products/ProductsPage";

export const metadata = {
  title: "All Products | VOYAGE",
  description: "Explore our premium collection of apparel.",
};

export default function Page(props: ProductsPageProps) {
  return <ProductsPage {...props} />;
}
