"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { StatusBadge } from "@/components/super-admin/ui/StatusBadge";
import { ArrowLeft, Printer, User, MapPin } from "lucide-react";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [orderStatus, setOrderStatus] = useState("Processing");

  const mockOrder = {
    id: id || "ORD-98421",
    date: "30 August 2026, 10:30 PM",
    customerName: "Naiem Hasan",
    customerEmail: "naiem@voyage.com",
    customerPhone: "+880 1711-223344",
    shippingAddress: {
      street: "House 42, Road 11, Block D",
      city: "Banani, Dhaka",
      zip: "1213",
      country: "Bangladesh",
    },
    paymentMethod: "bKash Online Payment",
    paymentStatus: "PAID",
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
        title={`Order Details #${mockOrder.id}`}
        description={`Placed on ${mockOrder.date}`}
        breadcrumbs={[
          { label: "Orders", href: "/admin/orders" },
          { label: `Order #${mockOrder.id}` },
        ]}
      >
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
        >
          <Printer size={14} />
          <span>Print Invoice</span>
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
              Purchased Items ({mockOrder.items.length})
            </h3>

            <div className="divide-y divide-gray-100">
              {mockOrder.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4">
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
                  <span className="text-xs font-extrabold text-[#3A322B]">{item.price}</span>
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
                <span>Total Amount</span>
                <span>{mockOrder.total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-5 text-xs">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-gray-400">Fulfillment Status</span>
              <div>
                <StatusBadge status={orderStatus} type="order" />
              </div>
              <select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                className="w-full mt-2 bg-gray-50 border border-gray-200 text-gray-800 font-bold rounded-xl px-3 py-2 outline-none focus:border-[#B37068]"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-gray-400 flex items-center gap-1">
                <User size={12} /> Customer Information
              </span>
              <p className="font-bold text-gray-900">{mockOrder.customerName}</p>
              <p className="text-gray-500">{mockOrder.customerEmail}</p>
              <p className="text-gray-500">{mockOrder.customerPhone}</p>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-gray-400 flex items-center gap-1">
                <MapPin size={12} /> Shipping Address
              </span>
              <p className="text-gray-700 font-medium">{mockOrder.shippingAddress.street}</p>
              <p className="text-gray-500">
                {mockOrder.shippingAddress.city}, {mockOrder.shippingAddress.zip}
              </p>
              <p className="text-gray-500">{mockOrder.shippingAddress.country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
