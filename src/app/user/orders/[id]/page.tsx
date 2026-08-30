"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { StatusBadge } from "@/components/super-admin/ui/StatusBadge";
import { ArrowLeft, Printer, MapPin, Package, Clock, Truck, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

export default function UserOrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const mockOrder = {
    id: id || "ORD-98421",
    date: "30 August 2026, 10:30 PM",
    customerName: "Naiem Hasan",
    customerEmail: "naiem@voyage.com",
    shippingAddress: {
      street: "House 42, Road 11, Block D",
      city: "Banani, Dhaka",
      zip: "1213",
      country: "Bangladesh",
    },
    paymentMethod: "bKash Online Payment",
    paymentStatus: "PAID",
    orderStatus: "Processing",
    subtotal: "৳4,290.00",
    shippingCost: "৳145.00",
    total: "৳4,435.00",
    items: [
      {
        id: "item-1",
        name: "Classic Silk Panjabi Collection",
        size: "L",
        price: "৳2,490.00",
        quantity: 1,
        image: "/images/panjabi.jpeg",
      },
      {
        id: "item-2",
        name: "Casual Slim Cotton Shirt",
        size: "M",
        price: "৳1,800.00",
        quantity: 1,
        image: "/images/shirt.jpg.jpeg",
      },
    ],
  };

  return (
    <div className="space-y-6 w-full max-w-4xl pb-12">
      <PageHeader
        title={`Order Summary #${mockOrder.id}`}
        description={`Placed on ${mockOrder.date}`}
        breadcrumbs={[
          { label: "My Orders", href: "/user/orders" },
          { label: `Order #${mockOrder.id}` },
        ]}
      >
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
        >
          <Printer size={14} />
          <span>Download Invoice</span>
        </button>
      </PageHeader>

      {/* Live Order Timeline */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Parcel Delivery Tracker</h3>

        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { step: "Order Placed", done: true, icon: Package },
            { step: "Processing", done: true, icon: Clock },
            { step: "On the Way", done: false, icon: Truck },
            { step: "Delivered", done: false, icon: CheckCircle2 },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.done ? "bg-[#B37068] text-white shadow-xs" : "bg-gray-100 text-gray-400"
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

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
              Purchased Items ({mockOrder.items.length})
            </h3>

            <div className="divide-y divide-gray-100">
              {mockOrder.items.map((item) => (
                <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 relative border border-gray-200 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{item.name}</p>
                      <p className="text-[10px] text-gray-400">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <p className="text-xs font-extrabold text-[#3A322B]">{item.price}</p>
                    <Link
                      href="/user/reviews"
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-[#B37068] hover:underline"
                    >
                      <Star size={10} /> Write Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>{mockOrder.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping Fee</span>
                <span>{mockOrder.shippingCost}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#3A322B] pt-2 border-t border-gray-100">
                <span>Total Paid</span>
                <span>{mockOrder.total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-5 text-xs">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-gray-400">Payment Status</span>
              <div>
                <StatusBadge status={mockOrder.paymentStatus} type="payment" />
              </div>
              <p className="text-gray-500 mt-1">{mockOrder.paymentMethod}</p>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-gray-400 flex items-center gap-1">
                <MapPin size={12} /> Delivery Address
              </span>
              <p className="text-gray-700 font-medium">{mockOrder.shippingAddress.street}</p>
              <p className="text-gray-500">
                {mockOrder.shippingAddress.city}, {mockOrder.shippingAddress.zip}
              </p>
              <p className="text-gray-500">{mockOrder.shippingAddress.country}</p>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => router.back()}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={14} />
                <span>Back to My Orders</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
