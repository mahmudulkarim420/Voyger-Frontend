"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { SearchToolbar } from "@/components/super-admin/ui/SearchToolbar";
import { DataTable, Column } from "@/components/super-admin/ui/DataTable";
import { StatusBadge } from "@/components/super-admin/ui/StatusBadge";
import { Pagination } from "@/components/super-admin/ui/Pagination";
import { ShieldCheck, Activity } from "lucide-react";

const mockLogs = [
  {
    id: "log-101",
    user: "Naiem Hasan (Super Admin)",
    action: "UPDATE_USER_ROLE",
    details: "Promoted Alex Rivera to ADMIN privilege",
    ip: "103.24.18.2",
    date: "Today, 10:28 PM",
  },
  {
    id: "log-102",
    user: "Alex Rivera (Admin)",
    action: "UPDATE_ORDER_STATUS",
    details: "Marked Order #ORD-98422 as SHIPPED",
    ip: "182.160.10.4",
    date: "Today, 08:14 PM",
  },
  {
    id: "log-103",
    user: "Naiem Hasan (Super Admin)",
    action: "CREATE_PRODUCT",
    details: "Added product 'Classic Silk Panjabi' to catalog",
    ip: "103.24.18.2",
    date: "Yesterday",
  },
];

export default function SuperAdminActivityLogsPage() {
  const [logs, setLogs] = useState(mockLogs);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const filtered = logs.filter(
    (l) =>
      l.user.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns: Column<any>[] = [
    {
      header: "Action",
      cell: (l) => (
        <span className="font-mono font-bold text-xs text-[#B37068] bg-[#F4EBE4] px-2.5 py-1 rounded-lg border border-[#B37068]/20">
          {l.action}
        </span>
      ),
    },
    {
      header: "Performed By",
      cell: (l) => <span className="font-bold text-gray-800">{l.user}</span>,
    },
    {
      header: "Details",
      cell: (l) => <span className="text-gray-600 font-medium">{l.details}</span>,
    },
    {
      header: "IP Address",
      cell: (l) => <span className="font-mono text-gray-400 text-[11px]">{l.ip}</span>,
    },
    {
      header: "Timestamp",
      cell: (l) => <span className="text-gray-500">{l.date}</span>,
    },
  ];

  return (
    <div className="space-y-6 w-full pb-12">
      <PageHeader
        title="Activity Audit Logs"
        description="Audit trail of administrative actions, user role changes, and system events"
        breadcrumbs={[
          { label: "Admins", href: "/super-admin/admins" },
          { label: "Activity Logs" },
        ]}
      />

      <SearchToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search audit log action, user, or details..."
      />

      <DataTable
        columns={columns}
        data={paginated}
        keyExtractor={(l) => l.id}
        emptyMessage="No audit log entries found"
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
