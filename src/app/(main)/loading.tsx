import React from "react";
import { Spinner } from "@/components/ui/loaders/Spinner";

export default function GlobalLoading() {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center bg-[#FCFAF6]">
      <Spinner size={32} className="text-[#A05C55]" />
    </div>
  );
}
