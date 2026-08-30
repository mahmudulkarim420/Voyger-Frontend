"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { Bell, CheckCheck, Trash2, Package, Tag, ShieldAlert } from "lucide-react";

const mockNotifications = [
  {
    id: "n-1",
    title: "Order #ORD-98421 Processing",
    message: "Your purchase order has been verified and is currently being packed for shipment.",
    time: "2 hours ago",
    read: false,
    icon: Package,
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    id: "n-2",
    title: "Seasonal Discount Voucher",
    message: "Use code VOYAGE20 to get 20% off on your next purchase.",
    time: "1 day ago",
    read: true,
    icon: Tag,
    iconBg: "bg-[#F4EBE4] text-[#B37068]",
  },
  {
    id: "n-3",
    title: "Order #ORD-97890 Delivered",
    message: "Your parcel was successfully delivered by Steadfast Courier.",
    time: "3 days ago",
    read: true,
    icon: Package,
    iconBg: "bg-emerald-100 text-emerald-600",
  },
];

export default function UserNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6 w-full max-w-3xl pb-12">
      <PageHeader
        title="Order & Account Notifications"
        description="Stay updated with order status changes, shipping tracking, and promotional alerts"
        breadcrumbs={[{ label: "Notifications" }]}
      >
        <button
          onClick={markAllRead}
          className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
        >
          <CheckCheck size={14} />
          <span>Mark All as Read</span>
        </button>
      </PageHeader>

      <div className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-3">
        {notifications.length === 0 ? (
          <div className="py-12 text-center text-gray-400 space-y-2">
            <Bell size={24} className="mx-auto text-gray-300" />
            <p className="text-xs">No notifications to display</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 text-xs">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`py-4 flex items-start justify-between gap-4 transition-colors p-3 rounded-2xl ${
                  !n.read ? "bg-amber-50/40" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl ${n.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}
                  >
                    <n.icon size={18} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-900">{n.title}</p>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-[#B37068] animate-pulse" />
                      )}
                    </div>
                    <p className="text-gray-600 mt-0.5 leading-relaxed">{n.message}</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">{n.time}</span>
                  </div>
                </div>

                <button
                  onClick={() => deleteNotification(n.id)}
                  className="p-1.5 rounded-lg text-gray-300 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Remove Notification"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
