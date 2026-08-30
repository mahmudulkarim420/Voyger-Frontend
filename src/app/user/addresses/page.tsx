"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { MapPin, Plus, Edit, Trash2, CheckCircle2, X } from "lucide-react";

interface Address {
  id: string;
  type: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

const mockAddresses: Address[] = [
  {
    id: "addr-1",
    type: "Home",
    name: "Naiem Hasan",
    phone: "+880 1711-223344",
    street: "House 42, Road 11, Block D",
    city: "Banani, Dhaka",
    zip: "1213",
    country: "Bangladesh",
    isDefault: true,
  },
  {
    id: "addr-2",
    type: "Office",
    name: "Naiem Hasan",
    phone: "+880 1819-556677",
    street: "Level 8, Concord Tower, Gulshan 2",
    city: "Dhaka",
    zip: "1212",
    country: "Bangladesh",
    isDefault: false,
  },
];

export default function UserAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    type: "Home",
    name: "",
    phone: "",
    street: "",
    city: "",
    zip: "",
    country: "Bangladesh",
  });

  const setDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.street || !formData.city) return;

    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      ...formData,
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, newAddr]);
    setIsModalOpen(false);
    setFormData({
      type: "Home",
      name: "",
      phone: "",
      street: "",
      city: "",
      zip: "",
      country: "Bangladesh",
    });
  };

  return (
    <div className="space-y-6 w-full pb-12">
      <PageHeader
        title="Delivery Addresses"
        description="Manage your default shipping location and secondary address destinations"
        breadcrumbs={[{ label: "Addresses" }]}
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#B37068] hover:bg-[#9c6059] text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Address</span>
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`bg-white rounded-3xl p-6 border shadow-2xs space-y-4 relative flex flex-col justify-between ${
              addr.isDefault ? "border-[#B37068]/60 ring-2 ring-[#B37068]/20" : "border-gray-200/70"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-[#B37068]">
                    <MapPin size={16} />
                  </span>
                  <span className="font-bold text-gray-900 text-xs">{addr.type}</span>
                </div>

                {addr.isDefault ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    <CheckCircle2 size={10} /> Default Address
                  </span>
                ) : (
                  <button
                    onClick={() => setDefault(addr.id)}
                    className="text-[10px] font-bold text-gray-400 hover:text-[#B37068] transition-colors cursor-pointer"
                  >
                    Set as Default
                  </button>
                )}
              </div>

              <div className="text-xs space-y-1 text-gray-600">
                <p className="font-bold text-gray-900">{addr.name}</p>
                <p>{addr.phone}</p>
                <p>{addr.street}</p>
                <p>
                  {addr.city}, {addr.zip}
                </p>
                <p className="text-gray-400 text-[10px]">{addr.country}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => deleteAddress(addr.id)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                title="Delete Address"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-gray-900">Add New Shipping Address</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddAddress} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Address Label</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#B37068]"
                  >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Recipient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#B37068]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="text"
                  required
                  placeholder="+880 1700-000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#B37068]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Street / House Address *</label>
                <input
                  type="text"
                  required
                  placeholder="House #, Road #, Area"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#B37068]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">City / District *</label>
                  <input
                    type="text"
                    required
                    placeholder="Dhaka"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#B37068]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    placeholder="1213"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#B37068]"
                  />
                </div>
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
                  className="flex-1 bg-[#B37068] hover:bg-[#9c6059] text-white py-2.5 rounded-xl font-bold transition-colors shadow-sm cursor-pointer"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
