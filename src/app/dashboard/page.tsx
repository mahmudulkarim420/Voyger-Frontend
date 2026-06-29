import React from "react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard Overveiw</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Revenue", value: "$45,231.89", change: "+20.1% from last month" },
          { label: "Subscriptions", value: "+2350", change: "+180.1% from last month" },
          { label: "Sales", value: "+12,234", change: "+19% from last month" },
          { label: "Active Now", value: "+573", change: "+201 since last hour" },
        ].map((stat, i) => (
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
        Chart Placeholder
      </div>
    </div>
  );
}
