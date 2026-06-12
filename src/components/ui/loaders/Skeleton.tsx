import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-gray-200/60", className)} {...props} />;
}

// Pre-configured Skeleton Layouts
export const ProductCardSkeleton = () => (
  <div className="flex flex-col gap-3">
    <Skeleton className="w-full aspect-[3/4]" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const CategoryGridSkeleton = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: 4 }).map((_, i) => (
      <Skeleton key={i} className="aspect-[3/4] w-full" />
    ))}
  </div>
);
