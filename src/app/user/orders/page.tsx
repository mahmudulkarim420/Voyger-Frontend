"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { SearchToolbar } from "@/components/super-admin/ui/SearchToolbar";
import { DataTable, Column } from "@/components/super-admin/ui/DataTable";
import { StatusBadge } from "@/components/super-admin/ui/StatusBadge";
import { Pagination } from "@/components/super-admin/ui/Pagination";
import { Eye } from "lucide-react";
import Link from "next/link";

const userOrders = [
  {
    id: "ORD-98421",
    date: "30 Aug 2026",
    total: "৳4,435.00",
    paymentStatus: "PAID",
    status: "Processing",
    itemsCount: 3,
  },
  {
    id: "ORD-97890",
    date: "14 Jul 2026",
    total: "৳12,800.00",
    paymentStatus: "PAID",
    status: "Delivered",
    itemsCount: 2,
  },
  {
    id: "ORD-97102",
    date: "02 May 2026",
    total: "৳8,490.00",
    paymentStatus: "PAID",
    status: "Delivered",
    itemsCount: 4,
  },
];

export default function UserOrdersPage() {
  const [orders, setOrders] = useState(userOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const filtered = orders.filter((o) => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || o.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns: Column<any>[] = [
    {
      header: "Order Reference",
      cell: (o) => (
        <div>
          <p className="font-bold text-gray-900">{o.id}</p>
          <p className="text-[10px] text-gray-400">{o.itemsCount} items ordered</p>
        </div>
      ),
    },
    {
      header: "Purchase Date",
      cell: (o) => <span className="text-gray-500 font-medium">{o.date}</span>,
    },
    {
      header: "Grand Total",
      cell: (o) => <span className="font-extrabold text-[#3A322B]">{o.total}</span>,
    },
    {
      header: "Payment",
      cell: (o) => <StatusBadge status={o.paymentStatus} type="payment" />,
    },
    {
      header: "Status",
      cell: (o) => <StatusBadge status={o.status} type="order" />,
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (o) => (
        <Link
          href={`/user/orders/${o.id}`}
          className="inline-flex items-center gap-1 bg-[#B37068] text-white hover:bg-[#9c6059] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors"
        >
          <Eye size={13} />
          <span>View Order</span>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6 w-full pb-12">
      <PageHeader
        title="My Purchase Orders"
        description="View your order history, payment status, and parcel delivery tracking"
        breadcrumbs={[{ label: "My Orders" }]}
      />

      <SearchToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search order ID..."
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        filterOptions={[
          { label: "All Order Statuses", value: "all" },
          { label: "Processing", value: "processing" },
          { label: "Delivered", value: "delivered" },
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
