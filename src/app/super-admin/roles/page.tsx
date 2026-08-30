"use client";

import React from "react";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { ShieldCheck, Shield, UserCheck, Check, X } from "lucide-react";

export default function SuperAdminRolesPage() {
  const permissions = [
    { feature: "View Dashboard Analytics", customer: true, admin: true, superAdmin: true },
    { feature: "Manage Products & Inventory", customer: false, admin: true, superAdmin: true },
    { feature: "Manage Categories Taxonomy", customer: false, admin: true, superAdmin: true },
    { feature: "Process & Ship Customer Orders", customer: false, admin: true, superAdmin: true },
    { feature: "Elevate / Demote User Roles", customer: false, admin: false, superAdmin: true },
    { feature: "Configure System & Device Session Limits", customer: false, admin: false, superAdmin: true },
    { feature: "Access Financial Transactions & Refunds", customer: false, admin: false, superAdmin: true },
  ];

  return (
    <div className="space-y-6 w-full max-w-4xl pb-12">
      <PageHeader
        title="Role Privilege & Permission Matrix"
        description="Backend Prisma role scope definitions for USER, ADMIN, and SUPER_ADMIN"
        breadcrumbs={[
          { label: "Admins", href: "/super-admin/admins" },
          { label: "Role Matrix" },
        ]}
      />

      <div className="bg-white rounded-3xl border border-gray-200/70 shadow-sm overflow-hidden p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 font-bold text-gray-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3 px-3">Platform Capability</th>
                <th className="pb-3 px-3 text-center">USER (Customer)</th>
                <th className="pb-3 px-3 text-center">ADMIN</th>
                <th className="pb-3 px-3 text-center">SUPER_ADMIN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {permissions.map((p, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-gray-800">{p.feature}</td>
                  <td className="py-3.5 px-3 text-center">
                    {p.customer ? (
                      <Check size={16} className="text-emerald-600 mx-auto" />
                    ) : (
                      <X size={16} className="text-gray-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {p.admin ? (
                      <Check size={16} className="text-emerald-600 mx-auto" />
                    ) : (
                      <X size={16} className="text-gray-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {p.superAdmin ? (
                      <Check size={16} className="text-emerald-600 mx-auto" />
                    ) : (
                      <X size={16} className="text-gray-300 mx-auto" />
                    )}
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
