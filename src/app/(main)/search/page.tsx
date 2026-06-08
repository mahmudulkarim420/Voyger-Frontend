import { Suspense } from "react";
import SearchPageClient from "@/components/modules/search/SearchPageClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FCFAF6]" />}>
      <SearchPageClient />
    </Suspense>
  );
}
