"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { SearchToolbar } from "@/components/super-admin/ui/SearchToolbar";
import { DataTable, Column } from "@/components/super-admin/ui/DataTable";
import { StatusBadge } from "@/components/super-admin/ui/StatusBadge";
import { Pagination } from "@/components/super-admin/ui/Pagination";
import { Boxes, RefreshCw } from "lucide-react";

const mockInventory = [
  { id: "inv-1", name: "Classic Silk Panjabi", sku: "VYG-PANJ-01", stock: 35, category: "Panjabi", status: "IN_STOCK" },
  { id: "inv-2", name: "Premium Oxford Cotton Shirt", sku: "VYG-SHIRT-04", stock: 4, category: "Casual Shirts", status: "LOW_STOCK" },
  { id: "inv-3", name: "Slim Fit Stretch Denim Pants", sku: "VYG-PANTS-02", stock: 0, category: "Pants", status: "OUT_OF_STOCK" },
];

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState(mockInventory);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const filtered = inventory.filter((i) => {
    const matchesSearch =
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.sku.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleStockChange = (id: string, newStock: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const s = Math.max(0, newStock);
          const st = s <= 0 ? "OUT_OF_STOCK" : s <= 5 ? "LOW_STOCK" : "IN_STOCK";
          return { ...item, stock: s, status: st };
        }
        return item;
      })
    );
  };

  const columns: Column<any>[] = [
    {
      header: "Product Title",
      cell: (i) => (
        <div>
          <p className="font-bold text-gray-900">{i.name}</p>
          <p className="text-[10px] text-gray-400 font-mono">SKU: {i.sku}</p>
        </div>
      ),
    },
    {
      header: "Category",
      cell: (i) => <span className="font-medium text-gray-600">{i.category}</span>,
    },
    {
      header: "Stock Quantity",
      cell: (i) => (
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={i.stock}
            onChange={(e) => handleStockChange(i.id, parseInt(e.target.value, 10) || 0)}
            className="w-16 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-center outline-none focus:border-[#B37068]"
          />
          <span className="text-gray-400 font-medium">units</span>
        </div>
      ),
    },
    {
      header: "Stock Status",
      cell: (i) => <StatusBadge status={i.status} type="stock" />,
    },
  ];

  return (
    <div className="space-y-6 w-full pb-12">
      <PageHeader
        title="Stock & Inventory Control"
        description="Monitor warehouse stock levels, low-stock warnings, and inline quantity adjustments"
        breadcrumbs={[{ label: "Inventory" }]}
      />

      <SearchToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search inventory by title or SKU..."
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        filterOptions={[
          { label: "All Stock Levels", value: "all" },
          { label: "In Stock", value: "IN_STOCK" },
          { label: "Low Stock", value: "LOW_STOCK" },
          { label: "Out of Stock", value: "OUT_OF_STOCK" },
        ]}
      />

      <DataTable
        columns={columns}
        data={paginated}
        keyExtractor={(i) => i.id}
        emptyMessage="No inventory items found matching criteria"
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
