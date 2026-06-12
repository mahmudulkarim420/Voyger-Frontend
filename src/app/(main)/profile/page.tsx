"use client";

import React, { useState } from "react";
import { FiEdit2, FiInfo, FiTrash2 } from "react-icons/fi";
import { HoverButton } from "@/components/ui/HoverButton";

interface Address {
  id: string;
  street: string;
  city: string;
  postalCode: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "M K Naiem",
    email: "mknaiem998@gmail.com",
    phone: "+880 1234 567890",
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editUser, setEditUser] = useState(user);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState<Omit<Address, "id">>({
    street: "",
    city: "",
    postalCode: "",
  });

  const handleSaveProfile = () => {
    setUser(editUser);
    setIsEditingProfile(false);
  };

  const handleAddAddress = () => {
    if (newAddress.street && newAddress.city) {
      setAddresses([...addresses, { ...newAddress, id: Date.now().toString() }]);
      setNewAddress({ street: "", city: "", postalCode: "" });
      setIsAddingAddress(false);
    }
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  return (
    <div className="bg-[#FCFAF6] min-h-screen">
      <div className="container mx-auto px-4 lg:px-12 py-12 max-w-7xl">
        <h1 className="text-2xl font-bold text-black mb-8">Profile</h1>

        <div className="space-y-6">
          {/* Personal Info Card */}
          <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-black">Personal Information</h2>
              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
                >
                  <FiEdit2 size={16} /> <span className="text-sm font-medium">Edit</span>
                </button>
              )}
            </div>

            {isEditingProfile ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 font-medium block mb-1">Name</label>
                  <input
                    type="text"
                    value={editUser.name}
                    onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                    className="w-full border border-gray-200 text-black rounded-lg px-4 py-2 focus:outline-none focus:border-black transition-colors placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 font-medium block mb-1">Email</label>
                  <input
                    type="email"
                    value={editUser.email}
                    disabled
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-500 cursor-not-allowed focus:outline-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400 font-medium block mb-1">Phone</label>
                  <input
                    type="text"
                    value={editUser.phone}
                    onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                    className="w-full border border-gray-200 text-black rounded-lg px-4 py-2 focus:outline-none focus:border-black transition-colors placeholder:text-gray-500"
                  />
                </div>
                <div className="pt-2 flex gap-3">
                  <HoverButton variant="primary" size="sm" onClick={handleSaveProfile} className="rounded-md">
                    Save Changes
                  </HoverButton>
                  <HoverButton
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setIsEditingProfile(false);
                      setEditUser(user);
                    }}
                    className="rounded-md"
                  >
                    Cancel
                  </HoverButton>
                </div>
              </div>
            ) : (
              <div className="space-y-6 flex flex-col sm:flex-row sm:gap-12 sm:space-y-0">
                <div className="flex-1">
                  <span className="text-sm text-gray-400 font-medium block mb-1">Name</span>
                  <span className="text-sm text-gray-800 font-medium">
                    {user.name || "Not set"}
                  </span>
                </div>
                <div className="flex-1">
                  <span className="text-sm text-gray-400 font-medium block mb-1">Email</span>
                  <span className="text-sm text-gray-800 font-medium">{user.email}</span>
                </div>
                <div className="flex-1">
                  <span className="text-sm text-gray-400 font-medium block mb-1">Phone</span>
                  <span className="text-sm text-gray-800 font-medium">
                    {user.phone || "Not set"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Addresses Card */}
          <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-black">Addresses</h2>
              {!isAddingAddress && (
                <button
                  onClick={() => setIsAddingAddress(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  + Add New
                </button>
              )}
            </div>

            {isAddingAddress && (
              <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100 mb-6 space-y-4">
                <h3 className="text-sm font-bold text-gray-800">New Address</h3>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Street Address</label>
                  <input
                    type="text"
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    placeholder="e.g. 123 Main St, Apt 4B"
                    className="w-full border border-gray-200 text-black rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors bg-white placeholder:text-gray-500"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 block mb-1">City</label>
                    <input
                      type="text"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      placeholder="e.g. Dhaka"
                      className="w-full border border-gray-200 text-black rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors bg-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 block mb-1">Postal Code</label>
                    <input
                      type="text"
                      value={newAddress.postalCode}
                      onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                      placeholder="e.g. 1200"
                      className="w-full border border-gray-200 text-black rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors bg-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
                <div className="pt-3 flex gap-3 ">
                  <HoverButton variant="primary" size="sm" onClick={handleAddAddress} className="rounded-md">
                    Save Address
                  </HoverButton>
                  <HoverButton
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsAddingAddress(false)}
                    className="rounded-md"
                  >
                    Cancel
                  </HoverButton>
                </div>
              </div>
            )}

            {addresses.length === 0 ? (
              <div className="bg-gray-50/50 rounded-xl p-6 flex items-center justify-center gap-3 border border-dashed border-gray-200">
                <FiInfo className="text-gray-400" size={18} />
                <span className="text-sm text-gray-500">No addresses added yet</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="border border-gray-100 bg-white rounded-xl p-5 flex justify-between items-start shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-1">{address.street}</p>
                      <p className="text-xs text-gray-500">
                        {address.city}
                        {address.postalCode ? `, ${address.postalCode}` : ""}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-gray-400 hover:text-red-500 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                      title="Delete address"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100">
            <HoverButton variant="accent" size="md" className="rounded-lg">
              Sign out
            </HoverButton>
            <HoverButton variant="secondary" size="md" className="rounded-lg">
              Sign out of all devices
            </HoverButton>
          </div>
        </div>
      </div>
    </div>
  );
}
