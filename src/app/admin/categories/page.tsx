"use client";

import React, { useState } from "react";
import { storeCategories, StoreCategory } from "@/config/categories";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { SearchToolbar } from "@/components/super-admin/ui/SearchToolbar";
import { DataTable, Column } from "@/components/super-admin/ui/DataTable";
import { ConfirmationDialog } from "@/components/super-admin/ui/ConfirmationDialog";
import { Plus, Edit, Trash2, FolderTree, Star, X } from "lucide-react";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<StoreCategory[]>(storeCategories);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const slug = newCatName.toLowerCase().replace(/\s+/g, "-");
    const newCat: StoreCategory = {
      id: slug as any,
      name: newCatName,
      href: `/shop/${slug}`,
      image: "/images/summer.jpg.jpeg",
      featured: true,
    };

    setCategories([newCat, ...categories]);
    setNewCatName("");
    setIsModalOpen(false);
  };

  const columns: Column<StoreCategory>[] = [
    {
      header: "Category",
      cell: (c) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 relative flex-shrink-0 border border-gray-200">
            <Image src={c.image} alt={c.name} fill className="object-cover" />
          </div>
          <span className="font-bold text-gray-900">{c.name}</span>
        </div>
      ),
    },
    {
      header: "Slug / Route",
      cell: (c) => <span className="font-mono text-gray-500 text-[11px]">/shop/{c.id}</span>,
    },
    {
      header: "Parent Group",
      cell: (c) =>
        c.parentId ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 capitalize">
            <FolderTree size={10} /> {c.parentId}
          </span>
        ) : (
          <span className="text-gray-400 italic">Root Category</span>
        ),
    },
    {
      header: "Featured",
      cell: (c) =>
        c.featured ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
            <Star size={10} fill="currentColor" /> Featured
          </span>
        ) : (
          <span className="text-gray-400 text-[11px]">Standard</span>
        ),
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (c) => (
        <div className="flex items-center justify-end gap-1">
          <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#B37068] hover:bg-[#F4EBE4] transition-colors">
            <Edit size={14} />
          </button>
          <button
            onClick={() => setDeleteTargetId(c.id)}
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
        title="Categories Management"
        description="Organize product taxonomy and store collection categories"
        breadcrumbs={[{ label: "Categories" }]}
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#B37068] hover:bg-[#9c6059] text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Category</span>
        </button>
      </PageHeader>

      <SearchToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search category by title or slug..."
      />

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(c) => c.id}
        emptyMessage="No categories found matching criteria"
      />

      <ConfirmationDialog
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() =>
          deleteTargetId && setCategories(categories.filter((c) => c.id !== deleteTargetId))
        }
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        confirmText="Delete Category"
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Add New Category</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Category Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Winter Jackets"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#B37068]"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#B37068] hover:bg-[#9c6059] text-white py-2.5 rounded-xl font-bold transition-colors shadow-sm"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
