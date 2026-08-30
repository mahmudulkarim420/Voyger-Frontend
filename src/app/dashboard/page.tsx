"use client";

import React, { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>({
    totalRevenue: "৳0",
    subscriptions: "+0",
    sales: "+0",
    activeNow: "+0",
  });

  useEffect(() => {
    fetchApi("admin/stats").then((res) => {
      if (res.success && res.data) {
        setStats(res.data);
      }
    });
  }, []);

  const statItems = [
    { label: "Total Revenue", value: stats.totalRevenue, change: "+20.1% from last month" },
    { label: "Subscriptions", value: stats.subscriptions, change: "+180.1% from last month" },
    { label: "Sales", value: stats.sales, change: "+19% from last month" },
    { label: "Active Products", value: stats.activeNow, change: "Live active catalog items" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard Overview</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statItems.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-xs font-medium text-green-600">
                {stat.change.split(" ")[0]}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              {stat.change.split(" ").slice(1).join(" ")}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[400px] flex items-center justify-center text-gray-400">
        Analytics & Realtime Sales Chart
      </div>
    </div>
  );
}
