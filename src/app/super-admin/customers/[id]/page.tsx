"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { StatusBadge } from "@/components/super-admin/ui/StatusBadge";
import { ArrowLeft, User, Mail, ShoppingBag, DollarSign, Smartphone } from "lucide-react";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

export default function SuperAdminCustomerDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const customer = {
    id: id || "usr-01",
    name: "Naiem Hasan",
    email: "naiem@voyage.com",
    role: "SUPER_ADMIN",
    activeSessions: 1,
    totalSpent: "৳42,890.00",
    ordersCount: 14,
    status: "ACTIVE",
    joinedDate: "12 Jan 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100",
    orders: [
      { id: "ORD-98421", date: "30 Aug 2026", total: "৳4,435.00", status: "Processing" },
      { id: "ORD-98102", date: "14 Jul 2026", total: "৳12,800.00", status: "Delivered" },
      { id: "ORD-97890", date: "02 May 2026", total: "৳8,490.00", status: "Delivered" },
    ],
  };

  return (
    <div className="space-y-6 w-full max-w-4xl pb-12">
      <PageHeader
        title={`Customer Profile: ${customer.name}`}
        description={`Account ID: ${customer.id}`}
        breadcrumbs={[
          { label: "Customers", href: "/super-admin/customers" },
          { label: customer.name },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Customer Info Card (4 COLS) */}
        <div className="md:col-span-4 bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full overflow-hidden relative border-2 border-white shadow-md bg-gray-100">
            <Image src={customer.avatar} alt={customer.name} fill className="object-cover" />
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900">{customer.name}</h2>
            <p className="text-xs text-gray-400">{customer.email}</p>
          </div>

          <div className="pt-2">
            <StatusBadge status={customer.role} type="role" />
          </div>

          <div className="w-full pt-4 border-t border-gray-100 space-y-3 text-xs text-left">
            <div className="flex justify-between text-gray-500">
              <span>Account Status:</span>
              <StatusBadge status={customer.status} type="active" />
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Joined Date:</span>
              <span className="font-bold text-gray-800">{customer.joinedDate}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Active Devices:</span>
              <span className="font-bold text-gray-800">{customer.activeSessions} device</span>
            </div>
          </div>
        </div>

        {/* Right: Order History & Spending Stats (8 COLS) */}
        <div className="md:col-span-8 space-y-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-gray-200/70 shadow-2xs">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Lifetime Spend</p>
              <p className="text-xl font-extrabold text-[#3A322B] mt-1">{customer.totalSpent}</p>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-gray-200/70 shadow-2xs">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Total Orders</p>
              <p className="text-xl font-extrabold text-[#3A322B] mt-1">{customer.ordersCount} purchases</p>
            </div>
          </div>

          {/* Customer Order History */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Order History</h3>

            <div className="divide-y divide-gray-100 text-xs">
              {customer.orders.map((o) => (
                <div key={o.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{o.id}</p>
                    <p className="text-[10px] text-gray-400">{o.date}</p>
                  </div>
                  <span className="font-extrabold text-[#3A322B]">{o.total}</span>
                  <StatusBadge status={o.status} type="order" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
