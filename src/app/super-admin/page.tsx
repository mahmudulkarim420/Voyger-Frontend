"use client";

import React, { useState } from "react";
import { useAuthCheck } from "@/hooks/useAuth";
import {
  ArrowUpRight,
  Calendar,
  Plus,
  Send,
  Download,
  CreditCard as CreditCardIcon,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

// Payment history items for Quixotic table layout
const paymentHistoryItems = [
  {
    id: "1",
    name: "Dribbble Design",
    growth: "+18.67%",
    date: "16 Jun 2026",
    time: "10:30 PM",
    status: "Successful",
    amount: "89,345.23 USD",
    iconBg: "bg-pink-100 text-pink-600",
    letter: "D",
  },
  {
    id: "2",
    name: "Google Pay",
    growth: "+9.34%",
    date: "15 Jun 2026",
    time: "11:45 PM",
    status: "Successful",
    amount: "12,345.89 USD",
    iconBg: "bg-amber-100 text-amber-600",
    letter: "G",
  },
  {
    id: "3",
    name: "Amazon Shopping",
    growth: "+12.23%",
    date: "14 Jun 2026",
    time: "10:15 PM",
    status: "Successful",
    amount: "32,123.67 USD",
    iconBg: "bg-slate-100 text-slate-800",
    letter: "a",
  },
];

// Team / Customer avatar stack
const teamAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=100&h=100",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100&h=100",
];

export default function SuperAdminDashboardPage() {
  const { user } = useAuthCheck();
  const userName = user?.name ? user.name.split(" ")[0] : "Sujon";
  const [chartPeriod, setChartPeriod] = useState<"Monthly" | "Annually">("Annually");

  return (
    <div className="space-y-8 w-full pb-12">
      {/* ---------------- 1. GREETING & ACTION HEADER BAR ---------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-[#3A322B]">
            Welcome Back, <span className="font-semibold text-gray-800">{userName}</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Picker Pill */}
          <button className="flex items-center gap-2 bg-white border border-gray-200/80 px-4 py-2.5 rounded-full text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer">
            <Calendar size={15} className="text-gray-500" />
            <span>29 Jun, 2026 - 29 August, 2026</span>
          </button>

          {/* Add Action Button */}
          <button className="flex items-center gap-2 bg-white border border-gray-200/80 px-4 py-2.5 rounded-full text-xs font-bold text-gray-800 shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer">
            <Plus size={16} />
            <span>Add New Wallet</span>
          </button>
        </div>
      </div>

      {/* ---------------- 2. TOP GRID (3 CARDS) ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* CARD 1 (4 COLS): PAYMENT GOAL & STORE CREDIT CARD */}
        <div className="md:col-span-4 bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Payment Goal</h3>
                <p className="text-[11px] text-gray-400">Total amount goal</p>
              </div>
              <button
                className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-black transition-colors cursor-pointer"
                aria-label="Expand goal"
              >
                <ArrowUpRight size={16} />
              </button>
            </div>

            {/* Quixotic VISA / Voyage Credit Card Widget */}
            <div className="mt-5 bg-gradient-to-br from-[#B37068] to-[#8E4F49] text-white p-5 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between h-44">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="font-bold tracking-widest text-sm italic">VISA</span>
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/70" />
                </div>
              </div>

              {/* Balance */}
              <div>
                <p className="text-[11px] text-white/80 font-medium">Credit Card</p>
                <p className="text-2xl font-bold tracking-tight mt-0.5">$ 78,989.09</p>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between text-[11px] text-white/90 font-mono tracking-wider">
                <span>•••• 909090</span>
                <span>EXP 09/26</span>
              </div>
            </div>
          </div>

          {/* Weekly Revenue Footer */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-gray-400">Weekly Revenue</p>
              <p className="text-lg font-extrabold text-[#3A322B]">+3,945 USD</p>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              <TrendingUp size={12} />
              +12.8%
            </span>
          </div>
        </div>

        {/* CARD 2 (5 COLS): ENGAGEMENT RATE STRIPED BAR CHART */}
        <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700">
                <CreditCardIcon size={18} />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Engagement Rate</h3>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-gray-100/80 p-1 rounded-full text-[11px] font-semibold border border-gray-200/50">
                <button
                  onClick={() => setChartPeriod("Monthly")}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    chartPeriod === "Monthly"
                      ? "bg-white text-gray-900 shadow-xs font-bold"
                      : "text-gray-500"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setChartPeriod("Annually")}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    chartPeriod === "Annually"
                      ? "bg-[#B37068] text-white shadow-xs font-bold"
                      : "text-gray-500"
                  }`}
                >
                  Annually
                </button>
              </div>

              <button
                className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-black transition-colors cursor-pointer"
                aria-label="Expand chart"
              >
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Striped Bar Chart Visual */}
          <div className="mt-6 relative">
            {/* Active Peak Badge */}
            <div className="absolute top-0 left-[58%] -translate-x-1/2 -translate-y-4 bg-[#B37068] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md z-10 flex items-center gap-0.5">
              +17.8%
            </div>

            {/* Grid Line */}
            <div className="border-b border-dashed border-gray-200 w-full mb-3 text-[10px] text-gray-300 flex justify-between">
              <span>5k</span>
              <span>4k</span>
              <span>3k</span>
              <span>2k</span>
              <span>1k</span>
              <span>0</span>
            </div>

            {/* Vertical Striped Bars Container */}
            <div className="flex items-end justify-between px-2 h-44">
              {[
                { month: "JAN", height: "h-20", active: false },
                { month: "FEB", height: "h-36", active: false },
                { month: "MAR", height: "h-24", active: false },
                { month: "APR", height: "h-40", active: true },
                { month: "MAY", height: "h-32", active: false },
                { month: "JUN", height: "h-36", active: false },
              ].map((bar) => (
                <div key={bar.month} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div
                    className={`w-9 ${bar.height} rounded-2xl transition-all ${
                      bar.active
                        ? "bg-[#B37068] shadow-md scale-105"
                        : "bg-[#B37068]/30 hover:bg-[#B37068]/50"
                    }`}
                    style={{
                      backgroundImage: bar.active
                        ? "none"
                        : "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.4) 4px, rgba(255,255,255,0.4) 8px)",
                    }}
                  />
                  <span
                    className={`text-[10px] font-bold transition-colors ${
                      bar.active ? "text-[#3A322B]" : "text-gray-400 group-hover:text-gray-700"
                    }`}
                  >
                    {bar.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 3 (3 COLS): PAYMENT GOAL SPARKLINE WAVE CARD */}
        <div className="md:col-span-3 bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Payment Goal</h3>
                <p className="text-[11px] text-gray-400">Total amount goal</p>
              </div>
              <button
                className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-black transition-colors cursor-pointer"
                aria-label="Expand details"
              >
                <ArrowUpRight size={16} />
              </button>
            </div>

            {/* Total Balance Metric */}
            <div className="mt-4">
              <p className="text-[11px] font-semibold text-gray-400">Total Balance</p>
              <p className="text-2xl font-extrabold text-[#3A322B] mt-0.5">$32,678.90</p>
            </div>

            {/* Smooth Sparkline Wave Chart */}
            <div className="mt-4 h-20 w-full overflow-hidden">
              <svg viewBox="0 0 200 60" className="w-full h-full">
                <defs>
                  <linearGradient id="waveGradSuper" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#B37068" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#B37068" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,40 Q25,10 50,30 T100,20 T150,45 T200,15 L200,60 L0,60 Z"
                  fill="url(#waveGradSuper)"
                />
                <path
                  d="M0,40 Q25,10 50,30 T100,20 T150,45 T200,15"
                  fill="none"
                  stroke="#B37068"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
          </div>

          {/* Action Buttons: Send / Receive */}
          <div className="flex items-center gap-2 pt-4">
            <button className="flex-1 bg-[#B37068] hover:bg-[#9c6059] text-white py-2.5 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs">
              <span>Send</span>
              <Send size={12} className="rotate-45" />
            </button>

            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
              <span>Receive</span>
              <Download size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- 3. BOTTOM GRID (PAYMENT HISTORY + CREDIT AMOUNT) ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* CARD 4 (8 COLS): PAYMENT HISTORY / RECENT TRANSACTIONS TABLE */}
        <div className="md:col-span-8 bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Payment History</h3>
                <p className="text-[11px] text-gray-400">Recent payments history</p>
              </div>

              <button
                className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-black transition-colors cursor-pointer"
                aria-label="Expand payment history"
              >
                <ArrowUpRight size={16} />
              </button>
            </div>

            {/* Payment History List Table */}
            <div className="space-y-4">
              {paymentHistoryItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl hover:bg-gray-50/80 transition-colors border border-transparent hover:border-gray-100 gap-3"
                >
                  {/* Name & Icon */}
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <div
                      className={`w-10 h-10 rounded-2xl ${item.iconBg} flex items-center justify-center font-bold text-sm shadow-2xs flex-shrink-0`}
                    >
                      {item.letter}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900">{item.name}</span>
                        <span className="text-[10px] font-bold text-emerald-600">
                          {item.growth}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="text-xs text-gray-500 font-medium">
                    <span>{item.date}</span>
                  </div>

                  <div className="text-xs text-gray-400">
                    <span>{item.time}</span>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{item.status}</span>
                  </div>

                  {/* Amount */}
                  <div className="text-xs font-extrabold text-[#3A322B] text-right">
                    {item.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 5 (4 COLS): AMOUNT OF CREDIT & MANDATORY PAYMENTS */}
        <div className="md:col-span-4 space-y-6">
          {/* Top Sub-Card: Amount of Credit */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700">
                <Wallet size={18} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900">Amount of credit</h3>
                <p className="text-[10px] text-gray-400">Total refund amount with fee</p>
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-[#3A322B]">$8,945.89</span>
              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                +12.8%
              </span>
            </div>
          </div>

          {/* Bottom Sub-Card: Mandatory Payments & Customer Avatars */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-gray-900">Mandatory Payments</h3>
                <p className="text-[10px] text-gray-400">Recent payments</p>
              </div>

              <button
                className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-black transition-colors cursor-pointer"
                aria-label="Expand payments"
              >
                <ArrowUpRight size={16} />
              </button>
            </div>

            {/* Customer Avatar Stack */}
            <div className="mt-5 flex items-center gap-2">
              <div className="flex -space-x-2 overflow-hidden">
                {teamAvatars.map((url, idx) => (
                  <div
                    key={idx}
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={url}
                      alt={`User ${idx + 1}`}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="w-9 h-9 rounded-full bg-[#B37068] text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-xs">
                +2
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
