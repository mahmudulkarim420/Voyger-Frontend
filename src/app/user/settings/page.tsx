"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { ConfirmationDialog } from "@/components/super-admin/ui/ConfirmationDialog";
import { KeyRound, Bell, AlertTriangle, Save, Smartphone } from "lucide-react";

export default function UserSettingsPage() {
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [prefs, setPrefs] = useState({ emailAlerts: true, orderSms: true, promoEmails: false });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPass && passwords.newPass === passwords.confirm) {
      setPassSuccess(true);
      setPasswords({ current: "", newPass: "", confirm: "" });
      setTimeout(() => setPassSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-3xl pb-12">
      <PageHeader
        title="Account Settings & Security"
        description="Update security passwords, notification preferences, active sessions, and account options"
        breadcrumbs={[{ label: "Settings" }]}
      />

      {/* Password Change Card */}
      <form onSubmit={handlePasswordSubmit} className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-4 text-xs">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
          <KeyRound size={16} className="text-[#B37068]" />
          <span>Security & Password Update</span>
        </h3>

        {passSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-2xl font-bold">
            Password updated successfully!
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={passwords.newPass}
                onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B37068]"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#B37068] hover:bg-[#9c6059] text-white px-5 py-2.5 rounded-2xl font-bold transition-all shadow-xs cursor-pointer"
          >
            <Save size={15} />
            <span>Update Password</span>
          </button>
        </div>
      </form>

      {/* Notification Preferences */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-4 text-xs">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
          <Bell size={16} className="text-[#B37068]" />
          <span>Notification Preferences</span>
        </h3>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100 cursor-pointer">
            <div>
              <p className="font-bold text-gray-900">Email Order Updates</p>
              <p className="text-[10px] text-gray-400">Receive order receipt & shipping dispatch notifications</p>
            </div>
            <input
              type="checkbox"
              checked={prefs.emailAlerts}
              onChange={(e) => setPrefs({ ...prefs, emailAlerts: e.target.checked })}
              className="w-4 h-4 accent-[#B37068]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100 cursor-pointer">
            <div>
              <p className="font-bold text-gray-900">SMS Tracking Alerts</p>
              <p className="text-[10px] text-gray-400">Get instant SMS updates when courier picks up parcel</p>
            </div>
            <input
              type="checkbox"
              checked={prefs.orderSms}
              onChange={(e) => setPrefs({ ...prefs, orderSms: e.target.checked })}
              className="w-4 h-4 accent-[#B37068]"
            />
          </label>
        </div>
      </div>

      {/* Danger Zone: Account Deletion */}
      <div className="bg-rose-50/60 rounded-3xl p-6 border border-rose-200/80 shadow-2xs space-y-3 text-xs">
        <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2">
          <AlertTriangle size={16} className="text-rose-600" />
          <span>Danger Zone</span>
        </h3>

        <p className="text-rose-700 leading-relaxed">
          Permanently delete your VOYΛGE customer account and purge stored address preferences. This action cannot be reversed.
        </p>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-2xl font-bold transition-all shadow-xs cursor-pointer"
        >
          Delete My Account
        </button>
      </div>

      <ConfirmationDialog
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => setShowDeleteModal(false)}
        title="Confirm Account Deletion"
        message="Are you sure you want to permanently delete your account? All saved addresses, wishlist items, and account preferences will be removed."
        confirmText="Permanently Delete Account"
      />
    </div>
  );
}
