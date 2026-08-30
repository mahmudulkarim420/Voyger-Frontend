"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { SearchToolbar } from "@/components/super-admin/ui/SearchToolbar";
import { DataTable, Column } from "@/components/super-admin/ui/DataTable";
import { StatusBadge } from "@/components/super-admin/ui/StatusBadge";
import { Pagination } from "@/components/super-admin/ui/Pagination";
import { Eye, Clock } from "lucide-react";
import Link from "next/link";

const mockOrders = [
  {
    id: "ORD-98421",
    customer: "Naiem Hasan",
    email: "naiem@voyage.com",
    date: "30 Aug 2026",
    total: "৳4,435.00",
    paymentStatus: "PAID",
    status: "Processing",
    itemsCount: 3,
  },
  {
    id: "ORD-98422",
    customer: "Alex Rivera",
    email: "alex@voyage.com",
    date: "29 Aug 2026",
    total: "৳2,790.00",
    paymentStatus: "PAID",
    status: "Shipped",
    itemsCount: 1,
  },
  {
    id: "ORD-98423",
    customer: "Sarah Jenkins",
    email: "sarah@gmail.com",
    date: "28 Aug 2026",
    total: "৳1,490.00",
    paymentStatus: "PENDING",
    status: "Pending",
    itemsCount: 2,
  },
  {
    id: "ORD-98424",
    customer: "Tariq Mahmood",
    email: "tariq@yahoo.com",
    date: "27 Aug 2026",
    total: "৳5,680.00",
    paymentStatus: "PAID",
    status: "Delivered",
    itemsCount: 4,
  },
  {
    id: "ORD-98425",
    customer: "Elena Rostova",
    email: "elena@hotmail.com",
    date: "26 Aug 2026",
    total: "৳990.00",
    paymentStatus: "FAILED",
    status: "Cancelled",
    itemsCount: 1,
  },
];

export default function SuperAdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || o.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  const columns: Column<any>[] = [
    {
      header: "Order ID",
      cell: (o) => <span className="font-bold text-gray-900">{o.id}</span>,
    },
    {
      header: "Customer",
      cell: (o) => (
        <div>
          <p className="font-bold text-gray-800">{o.customer}</p>
          <p className="text-[10px] text-gray-400">{o.email}</p>
        </div>
      ),
    },
    {
      header: "Date",
      cell: (o) => <span className="text-gray-500 font-medium">{o.date}</span>,
    },
    {
      header: "Total Amount",
      cell: (o) => <span className="font-extrabold text-[#3A322B]">{o.total}</span>,
    },
    {
      header: "Payment",
      cell: (o) => <StatusBadge status={o.paymentStatus} type="payment" />,
    },
    {
      header: "Fulfillment",
      cell: (o) => <StatusBadge status={o.status} type="order" />,
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (o) => (
        <div className="flex items-center justify-end gap-2">
          <select
            value={o.status}
            onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
            className="bg-gray-50 border border-gray-200 text-gray-700 text-[11px] font-bold rounded-lg px-2 py-1 outline-none focus:border-[#B37068] cursor-pointer"
          >
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <Link
            href={`/super-admin/orders/${o.id}`}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors"
          >
            <Eye size={14} />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 w-full pb-12">
      <PageHeader
        title="Orders Fulfillment Pipeline"
        description="Monitor customer purchases, payment verification, and delivery dispatches"
        breadcrumbs={[{ label: "Orders" }]}
      />

      <SearchToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search order ID, customer name or email..."
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        filterOptions={[
          { label: "All Order Statuses", value: "all" },
          { label: "Processing", value: "processing" },
          { label: "Shipped", value: "shipped" },
          { label: "Delivered", value: "delivered" },
          { label: "Cancelled", value: "cancelled" },
        ]}
      />

      <DataTable
        columns={columns}
        data={paginated}
        keyExtractor={(o) => o.id}
        emptyMessage="No orders found matching criteria"
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filtered.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
