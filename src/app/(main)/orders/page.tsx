"use client";

import React from "react";
import Image from "next/image";
import { FiPackage, FiChevronRight } from "react-icons/fi";

const mockOrders = [
  {
    id: "ORD-7721-X92",
    date: "June 05, 2026",
    status: "Delivered",
    total: "Tk 3,880.00",
    items: [
      {
        name: "Luxury Panjabi-1067",
        image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Male%20model%20wearing%20navy%20luxury%20panjabi&image_size=square",
        size: "L",
        quantity: 1
      },
      {
        name: "Formal - Sky",
        image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Male%20model%20wearing%20sky%20blue%20formal%20shirt&image_size=square",
        size: "M",
        quantity: 1
      }
    ]
  },
  {
    id: "ORD-8812-Y45",
    date: "May 22, 2026",
    status: "Processing",
    total: "Tk 1,290.00",
    items: [
      {
        name: "Stripe Shirt -434",
        image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Male%20model%20wearing%20stripe%20shirt&image_size=square",
        size: "L",
        quantity: 1
      }
    ]
  }
];

export default function OrdersPage() {
  return (
    <div className="bg-[#FCFAF6] min-h-screen">
      <div className="container mx-auto px-4 lg:px-12 py-12 max-w-7xl">
        <h1 className="text-2xl font-bold text-black mb-8">Your Orders</h1>

        <div className="space-y-6">
          {mockOrders.length > 0 ? (
            mockOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50 overflow-hidden transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
                {/* Order Header */}
                <div className="bg-gray-50/50 px-8 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Order Placed</p>
                      <p className="text-sm text-gray-700 font-medium">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Total</p>
                      <p className="text-sm text-gray-700 font-medium">{order.total}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Order #</p>
                      <p className="text-sm text-gray-700 font-medium">{order.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                    <button className="p-2 text-gray-400 hover:text-black transition-colors">
                      <FiChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-8">
                  <div className="space-y-6">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-6">
                        <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-gray-900 mb-1">{item.name}</h4>
                          <p className="text-xs text-gray-500">Size: {item.size} • Qty: {item.quantity}</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors">
                          Buy it again
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-16 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiPackage className="text-gray-300" size={32} />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">No orders found</h2>
              <p className="text-sm text-gray-500 mb-8">You haven&apos;t placed any orders yet.</p>
              <button className="bg-[#A05C55] text-white px-10 py-3 rounded-lg font-bold tracking-widest text-xs uppercase hover:bg-[#8e524b] transition-all shadow-md">
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
