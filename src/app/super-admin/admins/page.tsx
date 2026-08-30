"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { SearchToolbar } from "@/components/super-admin/ui/SearchToolbar";
import { DataTable, Column } from "@/components/super-admin/ui/DataTable";
import { StatusBadge } from "@/components/super-admin/ui/StatusBadge";
import { ShieldCheck, Shield, Plus, Lock } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

const mockAdmins = [
  {
    id: "adm-1",
    name: "Naiem Hasan",
    email: "naiem@voyage.com",
    role: "SUPER_ADMIN",
    status: "ACTIVE",
    lastActive: "Today, 10:30 PM",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: "adm-2",
    name: "Alex Rivera",
    email: "alex@voyage.com",
    role: "ADMIN",
    status: "ACTIVE",
    lastActive: "Yesterday",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
  },
];

export default function SuperAdminAdminsPage() {
  const [admins, setAdmins] = useState(mockAdmins);
  const [search, setSearch] = useState("");

  const filtered = admins.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<any>[] = [
    {
      header: "Admin User",
      cell: (a) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 relative border border-gray-200">
            <Image src={a.avatar} alt={a.name} fill className="object-cover" />
          </div>
          <div>
            <p className="font-bold text-gray-900">{a.name}</p>
            <p className="text-[10px] text-gray-400">{a.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Role Privilege",
      cell: (a) => <StatusBadge status={a.role} type="role" />,
    },
    {
      header: "Status",
      cell: (a) => <StatusBadge status={a.status} type="active" />,
    },
    {
      header: "Last Active",
      cell: (a) => <span className="text-gray-500 font-medium text-xs">{a.lastActive}</span>,
    },
  ];

  return (
    <div className="space-y-6 w-full pb-12">
      <PageHeader
        title="Admin Users & Privileges"
        description="Manage administrator accounts, assign super admin privileges, and audit active staff"
        breadcrumbs={[{ label: "Admins" }]}
      >
        <div className="flex gap-2">
          <Link
            href="/super-admin/roles"
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-2xs"
          >
            <Lock size={14} />
            <span>Role Matrix</span>
          </Link>
          <Link
            href="/super-admin/activity-logs"
            className="flex items-center gap-2 bg-[#B37068] hover:bg-[#9c6059] text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs"
          >
            <ShieldCheck size={14} />
            <span>Audit Logs</span>
          </Link>
        </div>
      </PageHeader>

      <SearchToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search admin by name or email..."
      />

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(a) => a.id}
        emptyMessage="No administrative users found"
      />
    </div>
  );
}
