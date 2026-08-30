"use client";

import React from "react";
import { useAuthCheck } from "@/hooks/useAuth";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  Heart,
  ArrowRight,
  Package,
  Truck,
  MapPin,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

const recentOrders = [
  {
    id: "ORD-98421",
    date: "30 Aug 2026",
    total: "৳4,435.00",
    status: "Processing",
    itemsCount: 3,
    itemPreview: "Classic Silk Panjabi + 2 more",
  },
  {
    id: "ORD-97890",
    date: "14 Jul 2026",
    total: "৳12,800.00",
    status: "Delivered",
    itemsCount: 2,
    itemPreview: "Slim Fit Stretch Denim",
  },
];

const recommendedProducts = [
  {
    id: "rec-1",
    name: "Classic Silk Panjabi Collection",
    price: "৳2,490.00",
    image: "/images/panjabi.jpeg",
    category: "Panjabi",
  },
  {
    id: "rec-2",
    name: "Casual Slim Cotton Shirt",
    price: "৳1,800.00",
    image: "/images/shirt.jpg.jpeg",
    category: "Shirts",
  },
  {
    id: "rec-3",
    name: "Summer Collection Casual Wear",
    price: "৳1,490.00",
    image: "/images/summer.jpg.jpeg",
    category: "Casual",
  },
];

export default function UserDashboardPage() {
  const { user } = useAuthCheck();
  const userName = user?.name ? user.name.split(" ")[0] : "Valued Customer";

  return (
    <div className="space-y-8 w-full pb-12">
      {/* ---------------- 1. WELCOME BANNER ---------------- */}
      <div className="bg-gradient-to-r from-[#3A322B] to-[#54463C] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#B37068] bg-[#B37068]/15 px-3 py-1 rounded-full border border-[#B37068]/30">
            <Sparkles size={12} /> Welcome Back
          </span>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Hello, {userName}!
          </h1>
          <p className="text-xs text-gray-300 max-w-md leading-relaxed">
            Track your ongoing shipments, review past orders, manage your wishlist, and update your delivery addresses.
          </p>
        </div>

        <Link
          href="/shop"
          className="z-10 bg-[#B37068] hover:bg-[#9c6059] text-white px-5 py-3 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <span>Explore Storefront</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* ---------------- 2. STATS CARDS ---------------- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-3xl p-5 border border-gray-200/70 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShoppingBag size={20} />
          </div>
          <p className="text-[11px] font-bold text-gray-400 uppercase">Total Purchases</p>
          <p className="text-2xl font-extrabold text-[#3A322B]">14</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-200/70 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock size={20} />
          </div>
          <p className="text-[11px] font-bold text-gray-400 uppercase">Pending Orders</p>
          <p className="text-2xl font-extrabold text-[#3A322B]">1</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-200/70 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
          <p className="text-[11px] font-bold text-gray-400 uppercase">Completed</p>
          <p className="text-2xl font-extrabold text-[#3A322B]">13</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-200/70 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Heart size={20} />
          </div>
          <p className="text-[11px] font-bold text-gray-400 uppercase">Wishlist Items</p>
          <p className="text-2xl font-extrabold text-[#3A322B]">4</p>
        </div>
      </div>

      {/* ---------------- 3. ACTIVE ORDER TRACKER CARD ---------------- */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Current Order Status</h3>
            <p className="text-[11px] text-gray-400">Live parcel tracking for Order #ORD-98421</p>
          </div>
          <Link
            href="/user/orders/ORD-98421"
            className="text-xs font-bold text-[#B37068] hover:underline flex items-center gap-1"
          >
            <span>Order Details</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs">
          {[
            { step: "Order Placed", done: true, icon: Package },
            { step: "Processing", done: true, icon: Clock },
            { step: "On the Way", done: false, icon: Truck },
            { step: "Delivered", done: false, icon: MapPin },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.done
                    ? "bg-[#B37068] text-white shadow-xs"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <item.icon size={18} />
              </div>
              <span className={`text-[11px] font-bold ${item.done ? "text-gray-900" : "text-gray-400"}`}>
                {item.step}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- 4. RECENT ORDERS & RECOMMENDED ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Recent Orders List (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900">Recent Purchases</h3>
            <Link
              href="/user/orders"
              className="text-xs font-bold text-[#B37068] hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            {recentOrders.map((o) => (
              <div key={o.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">{o.id}</p>
                  <p className="text-[10px] text-gray-400">{o.itemPreview}</p>
                </div>
                <span className="font-extrabold text-[#3A322B]">{o.total}</span>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    o.status === "Delivered"
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      : "bg-blue-50 text-blue-600 border border-blue-100"
                  }`}
                >
                  {o.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Products (5 cols) */}
        <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900">Recommended for You</h3>

          <div className="space-y-3">
            {recommendedProducts.map((p) => (
              <Link
                key={p.id}
                href="/shop"
                className="flex items-center justify-between p-2 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 relative flex-shrink-0 border border-gray-200">
                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 line-clamp-1">{p.name}</p>
                    <p className="text-[10px] text-gray-400">{p.category}</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#B37068]">{p.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
