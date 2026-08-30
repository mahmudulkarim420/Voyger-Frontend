"use client";

import React from "react";
import { CheckCircle2, Clock, Truck, XCircle, AlertTriangle, ShieldCheck, Shield, UserCheck } from "lucide-react";

interface StatusBadgeProps {
  status: string;
  type?: "order" | "payment" | "stock" | "role" | "active";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = "active" }) => {
  const normStatus = status.toUpperCase();

  if (type === "role") {
    switch (normStatus) {
      case "SUPER_ADMIN":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#B37068] text-white shadow-2xs">
            <ShieldCheck size={10} /> Super Admin
          </span>
        );
      case "ADMIN":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-200">
            <Shield size={10} /> Admin
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-200">
            <UserCheck size={10} /> Customer
          </span>
        );
    }
  }

  if (type === "order" || type === "payment") {
    switch (normStatus) {
      case "DELIVERED":
      case "PAID":
      case "SUCCESSFUL":
      case "ACTIVE":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
            <CheckCircle2 size={10} /> {status}
          </span>
        );
      case "SHIPPED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200">
            <Truck size={10} /> {status}
          </span>
        );
      case "PROCESSING":
      case "PENDING":
      case "INITIATED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
            <Clock size={10} /> {status}
          </span>
        );
      case "CANCELLED":
      case "FAILED":
      case "REFUNDED":
      case "SUSPENDED":
      case "EXPIRED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
            <XCircle size={10} /> {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-200">
            {status}
          </span>
        );
    }
  }

  // Stock status badge
  if (type === "stock") {
    if (normStatus === "OUT_OF_STOCK" || normStatus === "0") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
          <AlertTriangle size={10} /> Out of Stock
        </span>
      );
    }
    if (normStatus === "LOW_STOCK") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
          <AlertTriangle size={10} /> Low Stock
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
        <CheckCircle2 size={10} /> In Stock
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
      {status}
    </span>
  );
};
