"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  subtext?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  change,
  isPositive = true,
  icon: Icon,
  subtext,
}) => {
  return (
    <div className="bg-white p-5 rounded-3xl border border-gray-200/70 shadow-2xs flex items-center justify-between hover:shadow-sm transition-all">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gray-100/80 text-[#3A322B] flex items-center justify-center flex-shrink-0">
          <Icon size={22} />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-[#3A322B]">{value}</span>
            {change && (
              <span
                className={`inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                  isPositive
                    ? "text-emerald-600 bg-emerald-50 border-emerald-100"
                    : "text-rose-600 bg-rose-50 border-rose-100"
                }`}
              >
                {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {change}
              </span>
            )}
          </div>
          {subtext && <p className="text-[10px] text-gray-400 mt-0.5">{subtext}</p>}
        </div>
      </div>
    </div>
  );
};
