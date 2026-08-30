"use client";

import React, { useState } from "react";
import { TrendingUp, BarChart3, PieChart, ArrowUpRight, DollarSign, Users, ShoppingBag, Download } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("This Month");

  const categoryBreakdown = [
    { name: "Panjabi Collection", sales: "৳142,500", percentage: "38%", color: "bg-[#B37068]" },
    { name: "Casual & Solid Shirts", sales: "৳98,200", percentage: "26%", color: "bg-[#3A322B]" },
    { name: "Formal & Denim Pants", sales: "৳74,100", percentage: "20%", color: "bg-blue-600" },
    { name: "Winter Jackets & Sherpas", sales: "৳58,900", percentage: "16%", color: "bg-amber-600" },
  ];

  return (
    <div className="space-y-6 w-full pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#3A322B] tracking-tight">Analytics & Insights</h1>
          <p className="text-xs text-gray-500 mt-0.5">Deep-dive financial performance, sales conversion, and product popularity</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-2xl px-4 py-2.5 outline-none focus:border-[#B37068] shadow-2xs cursor-pointer"
          >
            <option>This Week</option>
            <option>This Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>

          <button className="flex items-center gap-2 bg-[#B37068] hover:bg-[#9c6059] text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-2xs cursor-pointer">
            <Download size={14} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-gray-200/70 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Conversion Rate</p>
            <p className="text-2xl font-extrabold text-[#3A322B] mt-1">3.48%</p>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-2">
              <TrendingUp size={10} /> +0.8% vs last month
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-700">
            <BarChart3 size={20} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200/70 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Avg Order Value</p>
            <p className="text-2xl font-extrabold text-[#3A322B] mt-1">৳2,180.00</p>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-2">
              <TrendingUp size={10} /> +5.2% vs last month
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-700">
            <DollarSign size={20} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200/70 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Returning Customers</p>
            <p className="text-2xl font-extrabold text-[#3A322B] mt-1">42.6%</p>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-2">
              <TrendingUp size={10} /> +3.1% vs last month
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-700">
            <Users size={20} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200/70 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Items Per Order</p>
            <p className="text-2xl font-extrabold text-[#3A322B] mt-1">2.4 pcs</p>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-2">
              <TrendingUp size={10} /> Stable trend
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-700">
            <ShoppingBag size={20} />
          </div>
        </div>
      </div>

      {/* Category Sales Share & Breakdown */}
      <div className="bg-white rounded-3xl p-7 border border-gray-200/70 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-[#3A322B]">Category Share Breakdown</h3>
            <p className="text-xs text-gray-400">Revenue distribution by product categories</p>
          </div>
          <PieChart size={20} className="text-gray-400" />
        </div>

        <div className="space-y-4">
          {categoryBreakdown.map((cat) => (
            <div key={cat.name} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-800">{cat.name}</span>
                <span className="text-[#3A322B]">{cat.sales} ({cat.percentage})</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${cat.color}`}
                  style={{ width: cat.percentage }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
