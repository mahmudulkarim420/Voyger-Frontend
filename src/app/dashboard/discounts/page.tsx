"use client";

import React, { useState } from "react";
import { Plus, Percent, Tag, Calendar, CheckCircle, Clock, X, Trash2 } from "lucide-react";

const mockCoupons = [
  {
    id: "c-1",
    code: "VOYAGE20",
    discount: "20% OFF",
    minSpend: "৳2,000",
    usedCount: 142,
    expiry: "30 Sep 2026",
    status: "ACTIVE",
  },
  {
    id: "c-2",
    code: "EIDSPECIAL",
    discount: "৳500 OFF",
    minSpend: "৳3,500",
    usedCount: 389,
    expiry: "15 Oct 2026",
    status: "ACTIVE",
  },
  {
    id: "c-3",
    code: "WELCOME10",
    discount: "10% OFF",
    minSpend: "৳1,000",
    usedCount: 812,
    expiry: "31 Dec 2026",
    status: "ACTIVE",
  },
  {
    id: "c-4",
    code: "SUMMERFLASHSALE",
    discount: "30% OFF",
    minSpend: "৳5,000",
    usedCount: 500,
    expiry: "15 Aug 2026",
    status: "EXPIRED",
  },
];

export default function AdminDiscountsPage() {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState("");

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newDiscount) return;

    const newC = {
      id: `c-${Date.now()}`,
      code: newCode.toUpperCase(),
      discount: newDiscount,
      minSpend: "৳1,500",
      usedCount: 0,
      expiry: "31 Oct 2026",
      status: "ACTIVE",
    };

    setCoupons([newC, ...coupons]);
    setNewCode("");
    setNewDiscount("");
    setIsModalOpen(false);
  };

  const toggleCouponStatus = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === "ACTIVE" ? "EXPIRED" : "ACTIVE" } : c
      )
    );
  };

  return (
    <div className="space-y-6 w-full pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#3A322B] tracking-tight">Discounts & Promotions</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage store promo codes, flash sale discounts, and minimum order vouchers</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#B37068] hover:bg-[#9c6059] text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          <Plus size={16} />
          <span>Create New Coupon</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-3xl border border-gray-200/70 p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                <th className="pb-3 px-3">Coupon Code</th>
                <th className="pb-3 px-3">Discount Value</th>
                <th className="pb-3 px-3">Min. Spend</th>
                <th className="pb-3 px-3">Times Used</th>
                <th className="pb-3 px-3">Expiration Date</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1.5 font-mono font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-xl border border-gray-200">
                      <Tag size={12} className="text-[#B37068]" /> {c.code}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-extrabold text-[#B37068]">{c.discount}</td>
                  <td className="py-3.5 px-3 font-semibold text-gray-700">{c.minSpend}</td>
                  <td className="py-3.5 px-3 text-gray-500 font-bold">{c.usedCount} times</td>
                  <td className="py-3.5 px-3 text-gray-500">{c.expiry}</td>
                  <td className="py-3.5 px-3">
                    <button
                      onClick={() => toggleCouponStatus(c.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                        c.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-gray-100 text-gray-500 border border-gray-200"
                      }`}
                    >
                      {c.status === "ACTIVE" ? <CheckCircle size={10} /> : <Clock size={10} />}
                      {c.status}
                    </button>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => setCoupons(coupons.filter((cp) => cp.id !== c.id))}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Create New Coupon</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddCoupon} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VOYAGE15"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#B37068] uppercase font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Discount Amount / %</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 15% OFF or ৳300 OFF"
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#B37068]"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#B37068] hover:bg-[#9c6059] text-white py-2.5 rounded-xl font-bold transition-colors shadow-sm"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
