import type { ProductCategorySlug } from "@/types";

export interface NavigationItem {
  name: string;
  href: string;
  categoryId?: ProductCategorySlug;
  children?: NavigationItem[];
}

export const shopNavigation: NavigationItem[] = [
  {
    name: "SHIRT",
    href: "/shop/shirt",
    categoryId: "shirt",
    children: [
      { name: "Denim Shirt", href: "/shop/denim-shirt", categoryId: "denim-shirt" },
      { name: "Solid Shirt", href: "/shop/solid-shirt", categoryId: "solid-shirt" },
      { name: "Checked Shirt", href: "/shop/checked-shirt", categoryId: "checked-shirt" },
      { name: "Cuban Shirt", href: "/shop/cuban-shirt", categoryId: "cuban-shirt" },
      { name: "Casual Shirt", href: "/shop/casual-shirt", categoryId: "casual-shirt" },
    ],
  },
  {
    name: "PANJABI",
    href: "/shop/panjabi",
    categoryId: "panjabi",
    children: [
      { name: "Kabli", href: "/shop/kabli", categoryId: "kabli" },
      { name: "Luxury Panjabi", href: "/shop/luxury-panjabi", categoryId: "luxury-panjabi" },
      { name: "Cotton Panjabi", href: "/shop/cotton-panjabi", categoryId: "cotton-panjabi" },
    ],
  },
  {
    name: "PANT",
    href: "/shop/pant",
    categoryId: "pant",
    children: [
      { name: "Formal Pant", href: "/shop/formal-pant", categoryId: "formal-pant" },
      { name: "Denim Pant", href: "/shop/denim-pant", categoryId: "denim-pant" },
      { name: "Pajama", href: "/shop/pajama", categoryId: "pajama" },
      { name: "Bootcut Pant", href: "/shop/bootcut-pant", categoryId: "bootcut-pant" },
    ],
  },
  {
    name: "JACKET",
    href: "/shop/jacket",
    categoryId: "jacket",
    children: [
      { name: "Denim Jacket", href: "/shop/denim-jacket", categoryId: "denim-jacket" },
    ],
  },
  {
    name: "T SHIRT",
    href: "/shop/t-shirt",
    categoryId: "t-shirt",
    children: [
      { name: "Casual All", href: "/shop/casual-all", categoryId: "casual-all" },
      { name: "Sweater", href: "/shop/sweater", categoryId: "sweater" },
    ],
  },
];

export const desktopNavigationGroups = shopNavigation;
export const mobileNavigationGroups = shopNavigation;

export const utilityNavigation: NavigationItem[] = [
  { name: "Our Story", href: "#" },
  { name: "Find a Store", href: "#" },
  { name: "Support", href: "#" },
];

export const bottomNavigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Search", href: "/search" },
  { name: "Cart", href: "#" },
  { name: "Account", href: "#" },
  { name: "Call", href: "tel:+1234567890" },
];

export const cartItemCount = 1;

export const trendingSearches = [
  "Luxury Panjabi",
  "Denim Shirt",
  "Formal Pant",
  "Kabli",
  "Cotton Solid",
];
