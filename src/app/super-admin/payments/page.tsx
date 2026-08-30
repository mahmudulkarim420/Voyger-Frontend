"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { SearchToolbar } from "@/components/super-admin/ui/SearchToolbar";
import { DataTable, Column } from "@/components/super-admin/ui/DataTable";
import { StatusBadge } from "@/components/super-admin/ui/StatusBadge";
import { Pagination } from "@/components/super-admin/ui/Pagination";
import { CreditCard, RefreshCw, CheckCircle2 } from "lucide-react";

const mockPayments = [
  {
    id: "TRX-882910",
    orderId: "ORD-98421",
    customer: "Naiem Hasan",
    amount: "৳4,435.00",
    method: "bKash Online Payment",
    status: "PAID",
    date: "30 Aug 2026, 10:30 PM",
  },
  {
    id: "TRX-882911",
    orderId: "ORD-98422",
    customer: "Alex Rivera",
    amount: "৳2,790.00",
    method: "Nagad Wallet",
    status: "PAID",
    date: "29 Aug 2026, 08:15 PM",
  },
  {
    id: "TRX-882912",
    orderId: "ORD-98423",
    customer: "Sarah Jenkins",
    amount: "৳1,490.00",
    method: "VISA Card",
    status: "PENDING",
    date: "28 Aug 2026, 04:20 PM",
  },
  {
    id: "TRX-882913",
    orderId: "ORD-98425",
    customer: "Elena Rostova",
    amount: "৳990.00",
    method: "Mastercard",
    status: "REFUNDED",
    date: "26 Aug 2026, 11:00 AM",
  },
];

export default function SuperAdminPaymentsPage() {
  const [payments, setPayments] = useState(mockPayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const filtered = payments.filter((p) => {
    const matchesSearch =
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.orderId.toLowerCase().includes(search.toLowerCase()) ||
      p.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns: Column<any>[] = [
    {
      header: "Transaction Ref",
      cell: (p) => (
        <div>
          <p className="font-bold text-gray-900 font-mono">{p.id}</p>
          <p className="text-[10px] text-gray-400">Order: {p.orderId}</p>
        </div>
      ),
    },
    {
      header: "Customer",
      cell: (p) => <span className="font-bold text-gray-800">{p.customer}</span>,
    },
    {
      header: "Payment Method",
      cell: (p) => <span className="font-medium text-gray-600">{p.method}</span>,
    },
    {
      header: "Amount",
      cell: (p) => <span className="font-extrabold text-[#3A322B]">{p.amount}</span>,
    },
    {
      header: "Status",
      cell: (p) => <StatusBadge status={p.status} type="payment" />,
    },
    {
      header: "Timestamp",
      cell: (p) => <span className="text-gray-500 font-medium">{p.date}</span>,
    },
  ];

  return (
    <div className="space-y-6 w-full pb-12">
      <PageHeader
        title="Financial Transactions & Payments"
        description="Monitor gateway settlement logs, payment verifications, and refund disbursements"
        breadcrumbs={[{ label: "Payments" }]}
      />

      <SearchToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search transaction ID, order ref, or customer..."
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        filterOptions={[
          { label: "All Payment Statuses", value: "all" },
          { label: "Paid", value: "PAID" },
          { label: "Pending", value: "PENDING" },
          { label: "Refunded", value: "REFUNDED" },
          { label: "Failed", value: "FAILED" },
        ]}
      />

      <DataTable
        columns={columns}
        data={paginated}
        keyExtractor={(p) => p.id}
        emptyMessage="No payment transactions found matching criteria"
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
