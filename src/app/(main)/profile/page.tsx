"use client";

import React from "react";
import { FiEdit2, FiInfo } from "react-icons/fi";

export default function ProfilePage() {
  return (
    <div className="bg-[#FCFAF6] min-h-screen">
      <div className="container mx-auto px-4 lg:px-12 py-12 max-w-7xl">
        <h1 className="text-2xl font-bold text-black mb-8">Profile</h1>

        <div className="space-y-6">
          {/* Personal Info Card */}
          <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-400 font-medium">Name</span>
                  <button className="text-blue-600 hover:text-blue-700 transition-colors">
                    <FiEdit2 size={14} />
                  </button>
                </div>
                <div className="h-4"></div> {/* Placeholder for name value if any */}
              </div>

              <div>
                <span className="text-sm text-gray-400 font-medium block mb-1">Email</span>
                <span className="text-sm text-gray-800">mknaiem998@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Addresses Card */}
          <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-black">Addresses</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                + Add
              </button>
            </div>

            <div className="bg-gray-50/50 rounded-lg p-6 flex items-center gap-3 border border-gray-100">
              <FiInfo className="text-gray-400" size={18} />
              <span className="text-sm text-gray-500">No addresses added</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-8 pt-4">
            <button className="px-6 py-2.5 rounded-lg border border-[#B37068]/20 text-[#B37068] text-sm font-medium hover:bg-[#B37068]/5 transition-all">
              Sign out
            </button>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
              Sign out of all devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
