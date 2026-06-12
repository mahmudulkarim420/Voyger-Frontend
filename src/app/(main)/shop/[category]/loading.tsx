import React from "react";
import { ProductGridSkeleton } from "@/components/ui/loaders/Skeleton";

export default function ShopCategoryLoading() {
  return (
    <div className="container-standard section-padding bg-[#FCFAF6] min-h-screen">
      <div className="animate-pulse bg-gray-200 h-8 w-1/3 mb-4 rounded"></div>
      <div className="animate-pulse bg-gray-200 h-4 w-1/4 mb-10 rounded"></div>
      <ProductGridSkeleton count={12} />
    </div>
  );
}
