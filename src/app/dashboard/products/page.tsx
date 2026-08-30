"use client";

import React, { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";
import { storeCategories } from "@/config/categories";
import { Plus, Search, Filter, Edit, Trash2, Eye, X, PackageCheck, AlertTriangle } from "lucide-react";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New product form state
  const [formData, setFormData] = useState({
    name: "",
    category: "casual-shirt",
    price: "",
    stock: "20",
    description: "",
  });

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
      p.id?.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    fetchApi("products", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
      }),
    }).then(() => {
      setIsModalOpen(false);
      loadProducts();
    });
  };

  return (
    <div className="space-y-6 w-full pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#3A322B] tracking-tight">Products Management</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage store inventory, stock levels, and pricing</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#B37068] hover:bg-[#9c6059] text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-gray-200/70 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-[#B37068] transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#B37068] cursor-pointer"
            >
              <option value="all">All Categories</option>
              {storeCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Data Table */}
      <div className="bg-white rounded-3xl border border-gray-200/70 p-6 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-gray-400 animate-pulse">Loading products...</div>
        ) : filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="pb-3 px-3">Product</th>
                  <th className="pb-3 px-3">Category</th>
                  <th className="pb-3 px-3">Price</th>
                  <th className="pb-3 px-3">Stock</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredProducts.map((p) => {
                  const stockNum = p.stock ?? 15;
                  const isOutOfStock = stockNum <= 0;
                  const isLowStock = stockNum > 0 && stockNum <= 5;

                  return (
                    <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 relative border border-gray-200/60">
                            <Image
                              src={p.images?.[0] || "/images/summer.jpg.jpeg"}
                              alt={p.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 line-clamp-1">{p.name}</p>
                            <p className="text-[10px] text-gray-400">SKU: {p.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 capitalize text-gray-600 font-medium">
                        {p.category?.replace("-", " ") || "General"}
                      </td>
                      <td className="py-3.5 px-3 font-bold text-[#3A322B]">৳{p.price}</td>
                      <td className="py-3.5 px-3 font-semibold text-gray-700">{stockNum} units</td>
                      <td className="py-3.5 px-3">
                        {isOutOfStock ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                            <AlertTriangle size={10} /> Out of Stock
                          </span>
                        ) : isLowStock ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
                            <AlertTriangle size={10} /> Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                            <PackageCheck size={10} /> In Stock
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors">
                            <Eye size={14} />
                          </button>
                          <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#B37068] hover:bg-[#F4EBE4] transition-colors">
                            <Edit size={14} />
                          </button>
                          <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-gray-400 text-sm">No products found matching criteria</div>
        )}
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Add New Product</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Classic Cotton Shirt"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#B37068]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#B37068]"
                  >
                    {storeCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Price (৳)</label>
                  <input
                    type="number"
                    required
                    placeholder="1490"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#B37068]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Stock Quantity</label>
                <input
                  type="number"
                  placeholder="20"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#B37068]"
                />
              </div>

              <div className="pt-3 flex gap-3">
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
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
