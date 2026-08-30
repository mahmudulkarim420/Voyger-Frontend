"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { Save, ArrowLeft } from "lucide-react";

export default function AdminNewCouponPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    code: "",
    discountType: "Percentage",
    discountValue: "15",
    minSpend: "1500",
    expiry: "2026-10-31",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin/coupons");
  };

  return (
    <div className="space-y-6 w-full max-w-2xl pb-12">
      <PageHeader
        title="Create Promo Coupon"
        description="Generate a discount voucher code for storefront marketing"
        breadcrumbs={[
          { label: "Coupons", href: "/admin/coupons" },
          { label: "Create Coupon" },
        ]}
      />

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-5 text-xs">
        <div>
          <label className="block font-bold text-gray-700 mb-1">Coupon Code *</label>
          <input
            type="text"
            required
            placeholder="e.g. VOYAGE15"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068] font-mono uppercase font-bold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Discount Type</label>
            <select
              value={formData.discountType}
              onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068] cursor-pointer"
            >
              <option value="Percentage">Percentage (% OFF)</option>
              <option value="Fixed Amount">Fixed Amount (৳ OFF)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Discount Value *</label>
            <input
              type="number"
              required
              value={formData.discountValue}
              onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
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
            <span>Create Coupon</span>
          </button>
        </div>
      </form>
    </div>
  );
}
