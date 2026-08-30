"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { SearchToolbar } from "@/components/super-admin/ui/SearchToolbar";
import { DataTable, Column } from "@/components/super-admin/ui/DataTable";
import { StatusBadge } from "@/components/super-admin/ui/StatusBadge";
import { Pagination } from "@/components/super-admin/ui/Pagination";
import { Eye, Smartphone, CheckCircle, Ban } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

const mockCustomers = [
  {
    id: "usr-01",
    name: "Naiem Hasan",
    email: "naiem@voyage.com",
    role: "SUPER_ADMIN",
    activeSessions: 1,
    totalSpent: "৳42,890.00",
    ordersCount: 14,
    status: "ACTIVE",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: "usr-02",
    name: "Alex Rivera",
    email: "alex@voyage.com",
    role: "ADMIN",
    activeSessions: 2,
    totalSpent: "৳18,450.00",
    ordersCount: 8,
    status: "ACTIVE",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: "usr-03",
    name: "Sarah Jenkins",
    email: "sarah@gmail.com",
    role: "USER",
    activeSessions: 1,
    totalSpent: "৳6,790.00",
    ordersCount: 4,
    status: "ACTIVE",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: "usr-04",
    name: "Tariq Mahmood",
    email: "tariq@yahoo.com",
    role: "USER",
    activeSessions: 3,
    totalSpent: "৳12,300.00",
    ordersCount: 6,
    status: "ACTIVE",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: "usr-05",
    name: "Elena Rostova",
    email: "elena@hotmail.com",
    role: "USER",
    activeSessions: 0,
    totalSpent: "৳990.00",
    ordersCount: 1,
    status: "SUSPENDED",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100&h=100",
  },
];

export default function SuperAdminCustomersPage() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || c.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns: Column<any>[] = [
    {
      header: "Customer",
      cell: (u) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 relative border border-gray-200">
            <Image src={u.avatar} alt={u.name} fill className="object-cover" />
          </div>
          <div>
            <p className="font-bold text-gray-900">{u.name}</p>
            <p className="text-[10px] text-gray-400">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Role Privilege",
      cell: (u) => <StatusBadge status={u.role} type="role" />,
    },
    {
      header: "Active Devices",
      cell: (u) => (
        <span className="inline-flex items-center gap-1 font-bold text-gray-700">
          <Smartphone size={12} className="text-gray-400" />
          {u.activeSessions} device{u.activeSessions !== 1 ? "s" : ""}
        </span>
      ),
    },
    {
      header: "Orders / Spend",
      cell: (u) => (
        <div>
          <p className="font-extrabold text-[#3A322B]">{u.totalSpent}</p>
          <p className="text-[10px] text-gray-400">{u.ordersCount} orders</p>
        </div>
      ),
    },
    {
      header: "Account Status",
      cell: (u) => <StatusBadge status={u.status} type="active" />,
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (u) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/super-admin/customers/${u.id}`}
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
        title="Customer Accounts & Profiles"
        description="Monitor platform user list, total purchase volume, active device sessions, and role credentials"
        breadcrumbs={[{ label: "Customers" }]}
      />

      <SearchToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search customer by name or email..."
        filterValue={roleFilter}
        onFilterChange={setRoleFilter}
        filterOptions={[
          { label: "All User Roles", value: "all" },
          { label: "Customer (USER)", value: "USER" },
          { label: "Admin", value: "ADMIN" },
          { label: "Super Admin", value: "SUPER_ADMIN" },
        ]}
      />

      <DataTable
        columns={columns}
        data={paginated}
        keyExtractor={(c) => c.id}
        emptyMessage="No customer accounts found matching criteria"
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
