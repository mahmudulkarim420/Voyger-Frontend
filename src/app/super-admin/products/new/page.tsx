"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { storeCategories } from "@/config/categories";
import { Save, ArrowLeft, Image as ImageIcon } from "lucide-react";

export default function SuperAdminNewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    category: "casual-shirt",
    stock: "25",
    sku: "",
    sizes: "M, L, XL",
    isFeatured: false,
    images: "/images/summer.jpg.jpeg",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/super-admin/products");
  };

  return (
    <div className="space-y-6 w-full max-w-3xl pb-12">
      <PageHeader
        title="Add New Product"
        description="Create a new product listing in the Voyger platform catalog"
        breadcrumbs={[
          { label: "Products", href: "/super-admin/products" },
          { label: "New Product" },
        ]}
      />

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-6 text-xs">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
            General Information
          </h3>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Product Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Classic Cotton Linen Shirt"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Description</label>
            <textarea
              rows={4}
              placeholder="Detailed product features, materials, and care instructions..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068]"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
            Pricing & Inventory
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Price (৳) *</label>
              <input
                type="number"
                required
                placeholder="1490"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Original / Old Price (৳)</label>
              <input
                type="number"
                placeholder="1990"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Stock Quantity *</label>
              <input
                type="number"
                required
                placeholder="25"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">SKU Code</label>
              <input
                type="text"
                placeholder="VYG-SHIRT-01"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068] font-mono"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
            Organization & Media
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068] cursor-pointer"
              >
                {storeCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Available Sizes</label>
              <input
                type="text"
                placeholder="S, M, L, XL"
                value={formData.sizes}
                onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              value={formData.images}
              onChange={(e) => setFormData({ ...formData, images: e.target.value })}
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
            <span>Save Product</span>
          </button>
        </div>
      </form>
    </div>
  );
}
