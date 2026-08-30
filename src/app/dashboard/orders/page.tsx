"use client";

import React, { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";
import { Search, Filter, Eye, Truck, CheckCircle2, Clock, XCircle, Package } from "lucide-react";

const mockOrders = [
  {
    id: "ORD-98421",
    customer: "Naiem Hasan",
    email: "naiem@voyage.com",
    date: "30 Aug 2026",
    total: "৳4,435.00",
    paymentStatus: "PAID",
    status: "PROCESSING",
    itemsCount: 3,
  },
  {
    id: "ORD-98422",
    customer: "Alex Rivera",
    email: "alex@voyage.com",
    date: "29 Aug 2026",
    total: "৳2,790.00",
    paymentStatus: "PAID",
    status: "SHIPPED",
    itemsCount: 1,
  },
  {
    id: "ORD-98423",
    customer: "Sarah Jenkins",
    email: "sarah@gmail.com",
    date: "28 Aug 2026",
    total: "৳1,490.00",
    paymentStatus: "PENDING",
    status: "PENDING",
    itemsCount: 2,
  },
  {
    id: "ORD-98424",
    customer: "Tariq Mahmood",
    email: "tariq@yahoo.com",
    date: "27 Aug 2026",
    total: "৳5,680.00",
    paymentStatus: "PAID",
    status: "DELIVERED",
    itemsCount: 4,
  },
  {
    id: "ORD-98425",
    customer: "Elena Rostova",
    email: "elena@hotmail.com",
    date: "26 Aug 2026",
    total: "৳990.00",
    paymentStatus: "FAILED",
    status: "CANCELLED",
    itemsCount: 1,
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [activeTab, setActiveTab] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = activeTab === "ALL" || order.status === activeTab;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
            <CheckCircle2 size={10} /> Delivered
          </span>
        );
      case "SHIPPED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200">
            <Truck size={10} /> Shipped
          </span>
        );
      case "PROCESSING":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
            <Package size={10} /> Processing
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
            <XCircle size={10} /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200">
            <Clock size={10} /> Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 w-full pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#3A322B] tracking-tight">Orders Pipeline</h1>
          <p className="text-xs text-gray-500 mt-0.5">Track fulfillment status, payment confirmation, and customer dispatches</p>
        </div>
      </div>

      {/* Status Filter Tabs & Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-gray-200/70 shadow-sm space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {["ALL", "PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab
                  ? "bg-[#3A322B] text-white shadow-xs"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders by ID, customer name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-[#B37068] transition-all"
          />
        </div>
      </div>

      {/* Orders Data Table */}
      <div className="bg-white rounded-3xl border border-gray-200/70 p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                <th className="pb-3 px-3">Order ID</th>
                <th className="pb-3 px-3">Customer</th>
                <th className="pb-3 px-3">Date</th>
                <th className="pb-3 px-3">Total Amount</th>
                <th className="pb-3 px-3">Payment</th>
                <th className="pb-3 px-3">Fulfillment Status</th>
                <th className="pb-3 px-3 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-gray-900">{order.id}</td>
                  <td className="py-3.5 px-3">
                    <p className="font-bold text-gray-800">{order.customer}</p>
                    <p className="text-[10px] text-gray-400">{order.email}</p>
                  </td>
                  <td className="py-3.5 px-3 text-gray-500">{order.date}</td>
                  <td className="py-3.5 px-3 font-extrabold text-[#3A322B]">{order.total}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        order.paymentStatus === "PAID"
                          ? "text-emerald-700 bg-emerald-50"
                          : "text-amber-700 bg-amber-50"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">{getStatusBadge(order.status)}</td>
                  <td className="py-3.5 px-3 text-right">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className="bg-gray-50 border border-gray-200 text-gray-700 text-[11px] font-bold rounded-lg px-2 py-1 outline-none focus:border-[#B37068] cursor-pointer"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
