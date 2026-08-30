"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { SearchToolbar } from "@/components/super-admin/ui/SearchToolbar";
import { DataTable, Column } from "@/components/super-admin/ui/DataTable";
import { StatusBadge } from "@/components/super-admin/ui/StatusBadge";
import { Pagination } from "@/components/super-admin/ui/Pagination";
import { ConfirmationDialog } from "@/components/super-admin/ui/ConfirmationDialog";
import { Plus, Tag, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

const mockCoupons = [
  {
    id: "c-1",
    code: "VOYAGE20",
    discountType: "Percentage",
    discountValue: "20% OFF",
    minSpend: "৳2,000",
    usedCount: 142,
    expiry: "30 Sep 2026",
    status: "ACTIVE",
  },
  {
    id: "c-2",
    code: "EIDSPECIAL",
    discountType: "Fixed Amount",
    discountValue: "৳500 OFF",
    minSpend: "৳3,500",
    usedCount: 389,
    expiry: "15 Oct 2026",
    status: "ACTIVE",
  },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const itemsPerPage = 8;

  const filtered = coupons.filter((c) => c.code.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleStatus = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === "ACTIVE" ? "EXPIRED" : "ACTIVE" } : c
      )
    );
  };

  const columns: Column<any>[] = [
    {
      header: "Coupon Code",
      cell: (c) => (
        <span className="inline-flex items-center gap-1.5 font-mono font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-xl border border-gray-200">
          <Tag size={12} className="text-[#B37068]" /> {c.code}
        </span>
      ),
    },
    {
      header: "Discount Value",
      cell: (c) => <span className="font-extrabold text-[#B37068]">{c.discountValue}</span>,
    },
    {
      header: "Min. Order",
      cell: (c) => <span className="font-semibold text-gray-700">{c.minSpend}</span>,
    },
    {
      header: "Times Used",
      cell: (c) => <span className="font-bold text-gray-500">{c.usedCount} times</span>,
    },
    {
      header: "Expiration Date",
      cell: (c) => <span className="text-gray-500">{c.expiry}</span>,
    },
    {
      header: "Status",
      cell: (c) => (
        <button onClick={() => toggleStatus(c.id)} className="cursor-pointer">
          <StatusBadge status={c.status} type="active" />
        </button>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (c) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/admin/coupons/${c.id}/edit`}
            className="p-1.5 rounded-lg text-gray-400 hover:text-[#B37068] hover:bg-[#F4EBE4] transition-colors"
          >
            <Edit size={14} />
          </Link>
          <button
            onClick={() => setDeleteId(c.id)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 w-full pb-12">
      <PageHeader
        title="Coupons & Promotional Vouchers"
        description="Configure discount codes, percentage vouchers, and minimum purchase requirements"
        breadcrumbs={[{ label: "Coupons" }]}
      >
        <Link
          href="/admin/coupons/new"
          className="flex items-center gap-2 bg-[#B37068] hover:bg-[#9c6059] text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs"
        >
          <Plus size={16} />
          <span>Create Coupon</span>
        </Link>
      </PageHeader>

      <SearchToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search coupon code..."
      />

      <DataTable
        columns={columns}
        data={paginated}
        keyExtractor={(c) => c.id}
        emptyMessage="No coupons found matching criteria"
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filtered.length}
        itemsPerPage={itemsPerPage}
      />

      <ConfirmationDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && setCoupons(coupons.filter((c) => c.id !== deleteId))}
        title="Delete Coupon"
        message="Are you sure you want to delete this promotional coupon?"
        confirmText="Delete Coupon"
      />
    </div>
  );
}
