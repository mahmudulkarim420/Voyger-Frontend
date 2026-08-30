"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { StatsCard } from "@/components/super-admin/ui/StatsCard";
import { TrendingUp, BarChart2, DollarSign, Users, ShoppingBag, Download, PieChart } from "lucide-react";

export default function SuperAdminAnalyticsPage() {
  const [timeframe, setTimeframe] = useState("This Month");

  const categoryShare = [
    { name: "Panjabi Collection", revenue: "৳1,840,000", share: "40%", color: "bg-[#B37068]" },
    { name: "Casual & Solid Shirts", revenue: "৳1,190,000", share: "26%", color: "bg-[#3A322B]" },
    { name: "Formal & Denim Pants", revenue: "৳920,000", share: "20%", color: "bg-blue-600" },
    { name: "Winter Jackets & Sherpas", revenue: "৳640,000", share: "14%", color: "bg-amber-600" },
  ];

  return (
    <div className="space-y-6 w-full pb-12">
      <PageHeader
        title="Platform Analytics & Revenue Insights"
        description="Comprehensive analysis of store sales trends, category distribution, and customer retention"
        breadcrumbs={[{ label: "Analytics" }]}
      >
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-2xl px-4 py-2.5 outline-none focus:border-[#B37068] shadow-2xs cursor-pointer"
        >
          <option>This Week</option>
          <option>This Month</option>
          <option>This Quarter</option>
          <option>This Year</option>
        </select>
        <button className="flex items-center gap-2 bg-[#B37068] hover:bg-[#9c6059] text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer">
          <Download size={14} />
          <span>Export Analytics</span>
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard label="Gross Revenue" value="৳4,892,450" change="+18.4%" icon={DollarSign} />
        <StatsCard label="Total Orders" value="1,248" change="+12.2%" icon={ShoppingBag} />
        <StatsCard label="Customer Conversion" value="3.48%" change="+0.8%" icon={TrendingUp} />
        <StatsCard label="Repeat Buyers" value="42.6%" change="+3.1%" icon={Users} />
      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-sm font-bold text-[#3A322B]">Category Share Breakdown</h3>
            <p className="text-xs text-gray-400">Revenue distribution by product taxonomy</p>
          </div>
          <PieChart size={20} className="text-gray-400" />
        </div>

        <div className="space-y-4">
          {categoryShare.map((c) => (
            <div key={c.name} className="space-y-1 text-xs">
              <div className="flex justify-between font-bold">
                <span className="text-gray-800">{c.name}</span>
                <span className="text-[#3A322B]">{c.revenue} ({c.share})</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${c.color}`}
                  style={{ width: c.share }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
