"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { storeCategories } from "@/config/categories";
import { Save, ArrowLeft } from "lucide-react";

export default function SuperAdminEditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "Classic Panjabi Item",
    description: "High quality breathable linen fabric designed for comfort and elegance.",
    price: "1890",
    oldPrice: "2290",
    category: "panjabi",
    stock: "35",
    sku: `VYG-${id?.toString().slice(0, 6)}`,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/super-admin/products/${id}`);
  };

  return (
    <div className="space-y-6 w-full max-w-3xl pb-12">
      <PageHeader
        title={`Edit Product #${id}`}
        description="Update pricing, stock levels, and catalog details"
        breadcrumbs={[
          { label: "Products", href: "/super-admin/products" },
          { label: "Edit Product" },
        ]}
      />

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-6 text-xs">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
            Product Settings
          </h3>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Product Title</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Price (৳)</label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Stock Quantity</label>
            <input
              type="number"
              required
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068]"
            />
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-gray-100">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-2xl font-bold transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Cancel</span>
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 bg-[#B37068] hover:bg-[#9c6059] text-white px-6 py-2.5 rounded-2xl font-bold transition-colors shadow-sm cursor-pointer"
          >
            <Save size={16} />
            <span>Update Product</span>
          </button>
        </div>
      </form>
    </div>
  );
}
