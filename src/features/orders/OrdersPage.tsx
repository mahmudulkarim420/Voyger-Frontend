"use client";

import React, { useEffect, useState } from "react";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";
import { FiPackage, FiChevronRight } from "react-icons/fi";
import { HoverButton } from "@/components/ui/HoverButton";
import { fetchApi } from "@/lib/api";
import { formatPrice } from "@/lib/formatters";

const mockOrders = [
  {
    id: "ORD-7721-X92",
    date: "June 05, 2026",
    status: "Delivered",
    total: 3880,
    items: [
      {
        name: "Luxury Panjabi-1067",
        image: "/images/vp-1067i.jpg.jpeg",
        size: "L",
        quantity: 1,
      },
      {
        name: "Formal - Sky",
        image: "/images/sky-i.jpg.jpeg",
        size: "M",
        quantity: 1,
      },
    ],
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi("orders").then((res) => {
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        const formatted = res.data.map((order: any) => ({
          id: order.orderNumber || order.id,
          date: new Date(order.placedAt || Date.now()).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          status: order.status,
          total: order.total,
          items: order.items,
        }));
        setOrders(formatted);
      } else {
        setOrders(mockOrders);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-[#FCFAF6] min-h-screen">
      <div className="container mx-auto px-4 lg:px-12 py-8 md:py-12 max-w-7xl">
        <h1 className="text-xl md:text-2xl font-bold text-black mb-6 md:mb-8">Your Orders</h1>

        <div className="space-y-5 md:space-y-6">
          {loading ? (
            <div className="h-40 bg-white animate-pulse rounded-xl" />
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50 overflow-hidden transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
              >
                <div className="bg-gray-50/50 px-4 md:px-8 py-4 border-b border-gray-100 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div className="grid grid-cols-2 md:flex gap-4 md:gap-8 w-full md:w-auto">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">
                        Order Placed
                      </p>
                      <p className="text-xs md:text-sm text-gray-700 font-medium">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">
                        Total
                      </p>
                      <p className="text-xs md:text-sm text-gray-700 font-medium">
                        {typeof order.total === "number" ? formatPrice(order.total) : order.total}
                      </p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">
                        Order #
                      </p>
                      <p className="text-xs md:text-sm text-gray-700 font-medium">{order.id}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto pt-3 md:pt-0 border-t border-gray-200 md:border-none mt-1 md:mt-0">
                    <span
                      className={`px-3 py-1.5 md:py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                    <button className="p-2 text-gray-400 hover:text-black transition-colors flex items-center gap-1 cursor-pointer">
                      <span className="text-[11px] font-bold uppercase tracking-wide md:hidden text-gray-600">
                        View Details
                      </span>
                      <FiChevronRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="p-4 md:p-8">
                  <div className="space-y-4 md:space-y-6">
                    {order.items.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 sm:gap-6 border-b border-gray-50 pb-4 sm:border-none sm:pb-0 last:border-none last:pb-0"
                      >
                        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                          <div className="relative w-14 h-14 sm:w-20 sm:h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-[12px] sm:text-sm font-bold text-gray-900 mb-0.5 sm:mb-1 truncate sm:whitespace-normal sm:line-clamp-2">
                              {item.name}
                            </h4>
                            <p className="text-[10px] sm:text-xs text-gray-500">
                              Size: {item.size} <span className="mx-1">•</span> Qty: {item.quantity}
                            </p>
                          </div>
                        </div>

                        <div className="flex-shrink-0">
                          <HoverButton
                            variant="primary"
                            size="sm"
                            href="/products"
                            className="whitespace-nowrap rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-sm cursor-pointer"
                          >
                            Buy it again
                          </HoverButton>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-8 md:p-16 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <FiPackage className="text-gray-300" size={28} />
              </div>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-2">No orders found</h2>
              <p className="text-[13px] md:text-sm text-gray-500 mb-6 md:mb-8">
                You haven&apos;t placed any orders yet.
              </p>
              <HoverButton variant="primary" size="lg" href="/products" className="w-full sm:w-auto">
                Start Shopping
              </HoverButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}