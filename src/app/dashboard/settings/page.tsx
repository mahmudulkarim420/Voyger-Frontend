"use client";

import React, { useState } from "react";
import { Settings, Save, Shield, Smartphone, Globe, Mail, Phone, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("VOYΛGE");
  const [supportEmail, setSupportEmail] = useState("support@voyage.com");
  const [phone, setPhone] = useState("+880 1700-000000");
  const [deviceLimit, setDeviceLimit] = useState("3");
  const [saved, setSaved] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 w-full pb-12 max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#3A322B] tracking-tight">CMS & System Settings</h1>
          <p className="text-xs text-gray-500 mt-0.5">Configure store info, security policies, and device session limits</p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-2 bg-[#B37068] hover:bg-[#9c6059] text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 size={16} />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* General Store Information */}
      <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-5 text-xs">
        <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <Globe size={16} className="text-[#B37068]" /> Store Identity
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Store Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068] font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Support Email</label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068]"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">Store Contact Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068]"
          />
        </div>
      </form>

      {/* Security & Device Session Limits */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-5 text-xs">
        <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <Smartphone size={16} className="text-[#B37068]" /> Device Session Limit Middleware
        </h3>

        <div className="space-y-3">
          <label className="block font-bold text-gray-700">Max Allowed Active Devices Per Account</label>
          <select
            value={deviceLimit}
            onChange={(e) => setDeviceLimit(e.target.value)}
            className="w-full max-w-xs bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068] font-bold cursor-pointer"
          >
            <option value="1">1 Active Device Only</option>
            <option value="2">2 Active Devices</option>
            <option value="3">3 Active Devices (Recommended)</option>
            <option value="5">5 Active Devices</option>
          </select>
          <p className="text-[11px] text-gray-400">
            When a user logs in from a new device exceeding this limit, the system redirects them to the `/device-limit` management portal.
          </p>
        </div>
      </div>
    </div>
  );
}
