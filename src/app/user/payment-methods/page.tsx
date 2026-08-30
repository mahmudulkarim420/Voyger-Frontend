"use client";

import React from "react";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { CreditCard, Smartphone, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function UserPaymentMethodsPage() {
  return (
    <div className="space-y-6 w-full max-w-3xl pb-12">
      <PageHeader
        title="Saved Payment Methods"
        description="View supported payment options and secure checkout credentials"
        breadcrumbs={[{ label: "Payment Methods" }]}
      />

      <div className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-6 text-xs">
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-emerald-800">
          <ShieldCheck size={24} className="text-emerald-600 flex-shrink-0" />
          <p className="leading-relaxed">
            VOYΛGE uses tokenized SSL Encrypted checkout. Raw credit card and mobile wallet CVVs are never stored on our frontend or backend servers.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
            Available Express Checkout Options
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-2xl p-4 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
                  bKash
                </div>
                <div>
                  <p className="font-bold text-gray-900">bKash Online Payment</p>
                  <p className="text-[10px] text-gray-400">Mobile Financial Service</p>
                </div>
              </div>
              <CheckCircle2 size={16} className="text-emerald-500" />
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                  Nagad
                </div>
                <div>
                  <p className="font-bold text-gray-900">Nagad Wallet</p>
                  <p className="text-[10px] text-gray-400">Mobile Wallet Gateway</p>
                </div>
              </div>
              <CheckCircle2 size={16} className="text-emerald-500" />
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <CreditCard size={18} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Credit / Debit Card</p>
                  <p className="text-[10px] text-gray-400">VISA, Mastercard, AMEX</p>
                </div>
              </div>
              <CheckCircle2 size={16} className="text-emerald-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
