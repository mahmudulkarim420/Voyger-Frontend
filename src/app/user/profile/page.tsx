"use client";

import React, { useState } from "react";
import { useAuthCheck } from "@/hooks/useAuth";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { Save, User, Mail, Phone, Camera } from "lucide-react";

export default function UserProfilePage() {
  const { user } = useAuthCheck();
  const [formData, setFormData] = useState({
    name: user?.name || "Naiem Hasan",
    email: user?.email || "naiem@voyage.com",
    phone: "+880 1711-223344",
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 w-full max-w-2xl pb-12">
      <PageHeader
        title="Personal Profile"
        description="Manage your account contact info and profile details"
        breadcrumbs={[{ label: "Profile" }]}
      />

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-6 text-xs">
        {savedSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-2xl font-bold">
            Profile changes updated successfully!
          </div>
        )}

        <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
          <div className="w-16 h-16 rounded-full bg-[#3A322B] text-white font-bold text-xl flex items-center justify-center relative shadow-sm">
            {formData.name[0]?.toUpperCase() || "U"}
            <button
              type="button"
              className="absolute bottom-0 right-0 p-1 bg-[#B37068] text-white rounded-full border-2 border-white cursor-pointer"
            >
              <Camera size={10} />
            </button>
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">{formData.name}</h3>
            <p className="text-gray-400">{formData.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3.5 py-2.5 outline-none focus:border-[#B37068]"
              />
              <User size={15} className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3.5 py-2.5 outline-none focus:border-[#B37068]"
              />
              <Mail size={15} className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3.5 py-2.5 outline-none focus:border-[#B37068]"
              />
              <Phone size={15} className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#B37068] hover:bg-[#9c6059] text-white px-6 py-2.5 rounded-2xl font-bold transition-all shadow-xs cursor-pointer"
          >
            <Save size={16} />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
