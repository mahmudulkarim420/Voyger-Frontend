import type { ProductCategorySlug } from "@/types";

export interface StoreCategory {
  id: ProductCategorySlug;
  name: string;
  href: string;
  image: string;
  parentId?: ProductCategorySlug;
  featured?: boolean;
}

export const storeCategories: StoreCategory[] = [
  {
    id: "new-arrivals",
    name: "New Arrivals",
    href: "/shop/new-arrivals",
    image: "/images/panjabi-web-cover-2-pc.jpg.jpeg",
    featured: true,
  },
  {
    id: "shirt",
    name: "Shirt",
    href: "/shop/shirt",
    image: "/images/solid-shirtssss.jpg.jpeg",
    featured: true,
  },
  {
    id: "casual-shirt",
    name: "Casual Shirt",
    href: "/shop/casual-shirt",
    image: "/images/vc-505.jpg.jpeg",
    parentId: "shirt",
    featured: true,
  },
  {
    id: "checked-shirt",
    name: "Checked Shirt",
    href: "/shop/checked-shirt",
    image: "/images/chek-pc-cata.jpg.jpeg",
    parentId: "shirt",
    featured: true,
  },
  {
    id: "solid-shirt",
    name: "Solid Shirt",
    href: "/shop/solid-shirt",
    image: "/images/solid-PC-3cover.jpg.jpeg",
    parentId: "shirt",
    featured: true,
  },
  {
    id: "cuban-shirt",
    name: "Cuban Shirt",
    href: "/shop/cuban-shirt",
    image: "/images/vc-434.jpg.jpeg",
    parentId: "shirt",
    featured: true,
  },
  {
    id: "denim-shirt",
    name: "Denim Shirt",
    href: "/shop/denim-shirt",
    image: "/images/denim-cata.jpg.jpeg",
    parentId: "shirt",
    featured: true,
  },
  {
    id: "panjabi",
    name: "Panjabi",
    href: "/shop/panjabi",
    image: "/images/vk-2000i.jpg.jpeg",
    featured: true,
  },
  {
    id: "luxury-panjabi",
    name: "Luxury Panjabi",
    href: "/shop/luxury-panjabi",
    image: "/images/vk-2006i.jpg.jpeg",
    parentId: "panjabi",
    featured: true,
  },
  {
    id: "cotton-panjabi",
    name: "Cotton Panjabi",
    href: "/shop/cotton-panjabi",
    image: "/images/kabli-cate-i_66d6c9b9-4efb-4e53-8c42-32c62d4f20f0.jpg.jpeg",
    parentId: "panjabi",
  },
  {
    id: "kabli",
    name: "Kabli",
    href: "/shop/kabli",
    image: "/images/kabli-cate.jpg.jpeg",
    parentId: "panjabi",
  },
  {
    id: "pant",
    name: "Pant",
    href: "/shop/pant",
    image: "/images/vp-1072.jpg.jpeg",
    featured: true,
  },
  {
    id: "formal-pant",
    name: "Formal Pant",
    href: "/shop/formal-pant",
    image: "/images/vp-1010i.jpg.jpeg",
    parentId: "pant",
    featured: true,
  },
  {
    id: "denim-pant",
    name: "Denim Pant",
    href: "/shop/denim-pant",
    image: "/images/deep-denim-i.jpg.jpeg",
    parentId: "pant",
    featured: true,
  },
  {
    id: "pajama",
    name: "Pajama",
    href: "/shop/pajama",
    image: "/images/Beige-Light-ii.jpg.jpeg",
    parentId: "pant",
  },
  {
    id: "bootcut-pant",
    name: "Bootcut Pant",
    href: "/shop/bootcut-pant",
    image: "/images/Black-Charcol.jpg.jpeg",
    parentId: "pant",
  },
  {
    id: "jacket",
    name: "Jacket",
    href: "/shop/jacket",
    image: "/images/jack-cata-fir-phone.jpg.jpeg",
    featured: true,
  },
  {
    id: "denim-jacket",
    name: "Denim Jacket",
    href: "/shop/denim-jacket",
    image: "/images/denim-jacks-pc.jpg.jpeg",
    parentId: "jacket",
    featured: true,
  },
  {
    id: "t-shirt",
    name: "T Shirt",
    href: "/shop/t-shirt",
    image: "/images/summer.jpg.jpeg",
    featured: true,
  },
  {
    id: "casual-all",
    name: "Casual All",
    href: "/shop/casual-all",
    image: "/images/collection-img6.webp.jpeg",
    parentId: "t-shirt",
  },
  {
    id: "sweater",
    name: "Sweater",
    href: "/shop/sweater",
    image: "/images/Whitehaven-Sherpa-i.jpg.jpeg",
    parentId: "t-shirt",
  },
];

export const featuredCategories = storeCategories.filter((category) => category.featured);

