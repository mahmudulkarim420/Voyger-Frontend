import { Suspense } from "react";
import SearchPageClient from "@/features/search/SearchPageClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FCFAF6]" />}>
      <SearchPageClient />
    </Suspense>
  );
}
