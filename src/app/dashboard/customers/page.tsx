"use client";

import React, { useState } from "react";
import { Search, Shield, ShieldCheck, UserCheck, Smartphone, MoreVertical, CheckCircle, Ban } from "lucide-react";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

const mockUsers = [
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

export default function AdminCustomersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = (id: string, newRole: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
  };

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" } : u
      )
    );
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#B37068] text-white shadow-2xs">
            <ShieldCheck size={10} /> Super Admin
          </span>
        );
      case "ADMIN":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-200">
            <Shield size={10} /> Admin
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-200">
            <UserCheck size={10} /> Customer
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 w-full pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#3A322B] tracking-tight">Customers & Role Control</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage user accounts, elevate roles (Admin / Super Admin), and monitor active device sessions</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-gray-200/70 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-[#B37068] transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          {["ALL", "USER", "ADMIN", "SUPER_ADMIN"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                roleFilter === r
                  ? "bg-[#3A322B] text-white shadow-2xs"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Data Table */}
      <div className="bg-white rounded-3xl border border-gray-200/70 p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                <th className="pb-3 px-3">User</th>
                <th className="pb-3 px-3">Role</th>
                <th className="pb-3 px-3">Active Sessions</th>
                <th className="pb-3 px-3">Total Spend</th>
                <th className="pb-3 px-3">Account Status</th>
                <th className="pb-3 px-3 text-right">Role Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 relative border border-gray-200">
                        <Image src={u.avatar} alt={u.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{u.name}</p>
                        <p className="text-[10px] text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">{getRoleBadge(u.role)}</td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 font-bold text-gray-700">
                      <Smartphone size={12} className="text-gray-400" />
                      {u.activeSessions} device{u.activeSessions !== 1 ? "s" : ""}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-extrabold text-[#3A322B]">{u.totalSpent}</td>
                  <td className="py-3.5 px-3">
                    <button
                      onClick={() => handleToggleStatus(u.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                        u.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100"
                          : "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
                      }`}
                    >
                      {u.status === "ACTIVE" ? <CheckCircle size={10} /> : <Ban size={10} />}
                      {u.status}
                    </button>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="bg-gray-50 border border-gray-200 text-gray-800 text-[11px] font-bold rounded-lg px-2.5 py-1 outline-none focus:border-[#B37068] cursor-pointer"
                    >
                      <option value="USER">Customer (User)</option>
                      <option value="ADMIN">Admin</option>
                      <option value="SUPER_ADMIN">Super Admin</option>
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
