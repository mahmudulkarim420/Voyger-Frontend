"use client";

import React, { useState } from "react";
import { storeCategories, StoreCategory } from "@/config/categories";
import { Plus, Search, FolderTree, Edit, Trash2, Tag, Star, X } from "lucide-react";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<StoreCategory[]>(storeCategories);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCategory = (e: React.FormEvent) => {
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

  return (
    <div className="space-y-6 w-full pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#3A322B] tracking-tight">Categories Management</h1>
          <p className="text-xs text-gray-500 mt-0.5">Organize store taxonomy, parent hierarchy, and featured collections</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#B37068] hover:bg-[#9c6059] text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Category</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-gray-200/70 shadow-sm flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search category by title or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-[#B37068] transition-all"
          />
        </div>

        <div className="text-xs font-semibold text-gray-500">
          Total: <span className="font-bold text-[#3A322B]">{categories.length}</span> categories
        </div>
      </div>

      {/* Categories Grid Table */}
      <div className="bg-white rounded-3xl border border-gray-200/70 p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                <th className="pb-3 px-3">Category</th>
                <th className="pb-3 px-3">Slug / Path</th>
                <th className="pb-3 px-3">Parent Group</th>
                <th className="pb-3 px-3">Featured</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredCategories.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 relative border border-gray-200/60">
                        <Image src={c.image} alt={c.name} fill className="object-cover" />
                      </div>
                      <span className="font-bold text-gray-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-gray-500 text-[11px]">
                    /shop/{c.id}
                  </td>
                  <td className="py-3.5 px-3">
                    {c.parentId ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 capitalize">
                        <FolderTree size={10} /> {c.parentId}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">Root Category</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3">
                    {c.featured ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
                        <Star size={10} fill="currentColor" /> Featured
                      </span>
                    ) : (
                      <span className="text-gray-400 text-[11px]">Standard</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#B37068] hover:bg-[#F4EBE4] transition-colors">
                        <Edit size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Category Modal */}
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

            <form onSubmit={handleAddCategory} className="space-y-4 text-xs">
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
