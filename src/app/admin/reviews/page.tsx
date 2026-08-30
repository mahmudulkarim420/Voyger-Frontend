"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { SearchToolbar } from "@/components/super-admin/ui/SearchToolbar";
import { DataTable, Column } from "@/components/super-admin/ui/DataTable";
import { StatusBadge } from "@/components/super-admin/ui/StatusBadge";
import { Pagination } from "@/components/super-admin/ui/Pagination";
import { ConfirmationDialog } from "@/components/super-admin/ui/ConfirmationDialog";
import { Star, CheckCircle, XCircle, Trash2 } from "lucide-react";

const mockReviews = [
  {
    id: "rev-1",
    productName: "Classic Silk Panjabi",
    user: "Alex Rivera",
    rating: 5,
    comment: "The fabric quality and fit are superb! Wore it to Eid prayer and got many compliments.",
    date: "28 Aug 2026",
    status: "APPROVED",
  },
  {
    id: "rev-2",
    productName: "Slim Fit Stretch Denim Pants",
    user: "Sarah Jenkins",
    rating: 4,
    comment: "Great fitting jeans. Slightly long on the hem but overall comfortable stretch.",
    date: "25 Aug 2026",
    status: "APPROVED",
  },
  {
    id: "rev-3",
    productName: "Premium Oxford Cotton Shirt",
    user: "Tariq Mahmood",
    rating: 2,
    comment: "Color faded after first wash. Expected better durability for the price.",
    date: "20 Aug 2026",
    status: "PENDING",
  },
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(mockReviews);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const itemsPerPage = 8;

  const filtered = reviews.filter((r) => {
    const matchesSearch =
      r.productName.toLowerCase().includes(search.toLowerCase()) ||
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const columns: Column<any>[] = [
    {
      header: "Product & Rating",
      cell: (r) => (
        <div>
          <p className="font-bold text-gray-900">{r.productName}</p>
          <div className="flex items-center gap-0.5 text-amber-500 mt-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < r.rating ? "currentColor" : "none"}
                className={i < r.rating ? "text-amber-500" : "text-gray-300"}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      header: "Reviewer",
      cell: (r) => (
        <div>
          <p className="font-bold text-gray-800">{r.user}</p>
          <p className="text-[10px] text-gray-400">{r.date}</p>
        </div>
      ),
    },
    {
      header: "Comment",
      cell: (r) => <p className="text-xs text-gray-600 line-clamp-2 max-w-sm">{r.comment}</p>,
    },
    {
      header: "Status",
      cell: (r) => <StatusBadge status={r.status} type="active" />,
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => handleUpdateStatus(r.id, "APPROVED")}
            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
            title="Approve Review"
          >
            <CheckCircle size={15} />
          </button>
          <button
            onClick={() => handleUpdateStatus(r.id, "REJECTED")}
            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
            title="Reject Review"
          >
            <XCircle size={15} />
          </button>
          <button
            onClick={() => setDeleteId(r.id)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 w-full pb-12">
      <PageHeader
        title="Product Reviews & Moderation"
        description="Moderate customer ratings, approve verified feedback, and filter spam reviews"
        breadcrumbs={[{ label: "Reviews" }]}
      />

      <SearchToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search product, customer, or comment..."
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        filterOptions={[
          { label: "All Review Statuses", value: "all" },
          { label: "Approved", value: "APPROVED" },
          { label: "Pending", value: "PENDING" },
          { label: "Rejected", value: "REJECTED" },
        ]}
      />

      <DataTable
        columns={columns}
        data={paginated}
        keyExtractor={(r) => r.id}
        emptyMessage="No reviews found matching criteria"
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
        onConfirm={() => deleteId && setReviews(reviews.filter((r) => r.id !== deleteId))}
        title="Delete Review"
        message="Are you sure you want to delete this customer review?"
        confirmText="Delete Review"
      />
    </div>
  );
}
