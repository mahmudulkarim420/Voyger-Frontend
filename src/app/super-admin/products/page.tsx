"use client";

import React, { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";
import { storeCategories } from "@/config/categories";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { SearchToolbar } from "@/components/super-admin/ui/SearchToolbar";
import { DataTable, Column } from "@/components/super-admin/ui/DataTable";
import { StatusBadge } from "@/components/super-admin/ui/StatusBadge";
import { Pagination } from "@/components/super-admin/ui/Pagination";
import { ConfirmationDialog } from "@/components/super-admin/ui/ConfirmationDialog";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

export default function SuperAdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const itemsPerPage = 8;

  const loadProducts = () => {
    setLoading(true);
    fetchApi("products?limit=100").then((res) => {
      if (res.success && res.data) {
        setProducts(Array.isArray(res.data) ? res.data : (res.data.products ?? []));
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase()) ||
      p.id?.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const columns: Column<any>[] = [
    {
      header: "Product",
      cell: (p) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 relative flex-shrink-0 border border-gray-200/60">
            <Image src={p.images?.[0] || "/images/summer.jpg.jpeg"} alt={p.name} fill className="object-cover" />
          </div>
          <div>
            <p className="font-bold text-gray-900 line-clamp-1">{p.name}</p>
            <p className="text-[10px] text-gray-400 font-mono">SKU: {p.sku || p.id?.slice(0, 8)}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      cell: (p) => (
        <span className="capitalize font-semibold text-gray-600">
          {p.category?.replace("-", " ") || "General"}
        </span>
      ),
    },
    {
      header: "Price",
      cell: (p) => (
        <div>
          <span className="font-bold text-[#3A322B]">৳{p.price}</span>
          {p.oldPrice && (
            <span className="text-[10px] text-gray-400 line-through ml-1.5">৳{p.oldPrice}</span>
          )}
        </div>
      ),
    },
    {
      header: "Stock",
      cell: (p) => <span className="font-semibold text-gray-700">{p.stock ?? 15} units</span>,
    },
    {
      header: "Status",
      cell: (p) => {
        const stock = p.stock ?? 15;
        const stockStatus = stock <= 0 ? "OUT_OF_STOCK" : stock <= 5 ? "LOW_STOCK" : "IN_STOCK";
        return <StatusBadge status={stockStatus} type="stock" />;
      },
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (p) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/super-admin/products/${p.id}`}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors"
          >
            <Eye size={14} />
          </Link>
          <Link
            href={`/super-admin/products/${p.id}/edit`}
            className="p-1.5 rounded-lg text-gray-400 hover:text-[#B37068] hover:bg-[#F4EBE4] transition-colors"
          >
            <Edit size={14} />
          </Link>
          <button
            onClick={() => setDeleteTargetId(p.id)}
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
        title="Products Catalog"
        description="Manage e-commerce inventory, prices, stock levels, and product creation"
        breadcrumbs={[{ label: "Products" }]}
      >
        <Link
          href="/super-admin/products/new"
          className="flex items-center gap-2 bg-[#B37068] hover:bg-[#9c6059] text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs"
        >
          <Plus size={16} />
          <span>Add Product</span>
        </Link>
      </PageHeader>

      <SearchToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search product by title, SKU, or ID..."
        filterValue={categoryFilter}
        onFilterChange={setCategoryFilter}
        filterOptions={[
          { label: "All Categories", value: "all" },
          ...storeCategories.map((c) => ({ label: c.name, value: c.id })),
        ]}
      />

      <DataTable
        columns={columns}
        data={paginatedProducts}
        keyExtractor={(p) => p.id}
        emptyMessage="No products found matching criteria"
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredProducts.length}
        itemsPerPage={itemsPerPage}
      />

      <ConfirmationDialog
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => deleteTargetId && handleDelete(deleteTargetId)}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action will remove it from the store catalog."
        confirmText="Delete Product"
      />
    </div>
  );
}
