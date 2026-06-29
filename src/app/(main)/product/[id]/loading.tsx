import React from "react";
import { Skeleton } from "@/components/ui/loaders/Skeleton";

export default function ProductDetailsLoading() {
  return (
    <div className="bg-[#FCFAF6] min-h-screen">
      <div className="container mx-auto px-4 lg:px-12 py-8 max-w-[1400px]">
        {/* Breadcrumb Skeleton */}
        <Skeleton className="h-4 w-48 mb-8" />

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          {/* Images Skeleton */}
          <div className="lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible w-full md:w-24 shrink-0">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="w-20 md:w-full aspect-[3/4] shrink-0" />
              ))}
            </div>
            <Skeleton className="w-full aspect-[3/4] flex-1 max-h-[800px]" />
          </div>

          {/* Info Skeleton */}
          <div className="lg:w-1/2 flex flex-col pt-4">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-10 w-3/4 mb-6" />

            <div className="flex items-center gap-4 mb-8">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>

            <div className="space-y-6 mb-8 gap-4">
              <Skeleton className="h-20 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>
            </div>

            <Skeleton className="h-14 w-full mb-12" />

            <div className="space-y-4">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
