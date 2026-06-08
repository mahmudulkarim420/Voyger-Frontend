export type ProductCategorySlug =
  | "new-arrivals"
  | "shirt"
  | "casual-shirt"
  | "checked-shirt"
  | "solid-shirt"
  | "cuban-shirt"
  | "denim-shirt"
  | "panjabi"
  | "luxury-panjabi"
  | "cotton-panjabi"
  | "kabli"
  | "pant"
  | "formal-pant"
  | "denim-pant"
  | "pajama"
  | "bootcut-pant"
  | "jacket"
  | "denim-jacket"
  | "t-shirt"
  | "casual-all"
  | "sweater";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  images: string[];
  category: ProductCategorySlug;
  stock: number;
  sizes?: string[];
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: "USER" | "ADMIN";
}
