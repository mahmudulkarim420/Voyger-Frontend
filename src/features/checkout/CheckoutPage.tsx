"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/formatters";
import { IoHelpCircleOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";


const shippingMethods = [
  { id: "in-dhaka", label: "In Dhaka", price: 70 },
  { id: "sub-dhaka", label: "Sub Dhaka", price: 100 },
  { id: "outside-dhaka", label: "Outside Dhaka", price: 130 },
];

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[0]);
  const [paymentMethod, setPaymentMethod] = useState("sslcommerz");
  const [billingAddress, setBillingAddress] = useState("same");

  const total = cartTotal + selectedShipping.price;

  return (
    <div className="min-h-screen w-full bg-[#FCFAF6]">
      <div className="container mx-auto px-4 lg:px-12 max-w-7xl py-8 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 py-12 lg:pr-16 border-r border-gray-200">
            {/* Contact */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
                    M
                  </div>
                  <span className="text-sm text-gray-700">mknaiem998@gmail.com</span>
                </div>
                <button className="text-gray-400">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <label className="absolute left-4 top-2 text-[10px] text-gray-400 uppercase tracking-wider">
                    Country/Region
                  </label>
                  <select className="w-full bg-white border border-gray-300 text-gray-900 rounded-md px-4 pt-6 pb-2 text-sm focus:outline-none focus:ring focus:ring-[#A05C55] focus:border-[#A05C55] appearance-none font-medium">
                    <option>Bangladesh</option>
                  </select>
                  <FaChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={12}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First name (optional)"
                    className="w-full text-gray-900 placeholder:text-gray-500 bg-white border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring focus:ring-[#A05C55] focus:border-[#A05C55] font-medium"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full text-gray-900 placeholder:text-gray-500 bg-white border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring focus:ring-[#A05C55] focus:border-[#A05C55] font-medium"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Address"
                  className="w-full text-gray-900 placeholder:text-gray-500 bg-white border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring focus:ring-[#A05C55] focus:border-[#A05C55] font-medium"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full text-gray-900 placeholder:text-gray-500 bg-white border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring focus:ring-[#A05C55] focus:border-[#A05C55] font-medium"
                  />
                  <input
                    type="text"
                    placeholder="Postal code (optional)"
                    className="w-full text-gray-900 placeholder:text-gray-500 bg-white border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring focus:ring-[#A05C55] focus:border-[#A05C55] font-medium"
                  />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Phone"
                    className="w-full text-gray-900 placeholder:text-gray-500 bg-white border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring focus:ring-[#A05C55] focus:border-[#A05C55] font-medium pr-10"
                  />
                  <IoHelpCircleOutline
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="mb-10">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping method</h3>
              <div className="border-2 border-gray-300 rounded-md overflow-hidden">
                {shippingMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${
                      selectedShipping.id === method.id
                        ? "bg-[#F0F7FF] border-b border-blue-100"
                        : "bg-white border-b border-gray-100 last:border-b-0"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={selectedShipping.id === method.id}
                        onChange={() => setSelectedShipping(method)}
                        className="w-5 h-5 text-[#A05C55] focus:ring-[#A05C55]"
                      />
                      <span className="text-sm text-gray-700">{method.label}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {formatPrice(method.price)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="mb-10">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Payment</h3>
              <p className="text-sm text-gray-500 mb-4">
                All transactions are secure and encrypted.
              </p>

              <div className="border-2 border-gray-300 rounded-md overflow-hidden">
                <div
                  className={`p-4 ${paymentMethod === "sslcommerz" ? "bg-[#F0F7FF]" : "bg-white"} border-b border-gray-100`}
                >
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "sslcommerz"}
                        onChange={() => setPaymentMethod("sslcommerz")}
                        className="w-5 h-5 text-[#A05C55] focus:ring-[#A05C55]"
                      />
                      <span className="text-sm text-gray-700">SSLCOMMERZ</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-8 h-5 bg-white border border-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-blue-800 italic">
                        VISA
                      </div>
                      <div className="w-8 h-5 bg-white border border-gray-200 rounded flex items-center justify-center overflow-hidden">
                        <div className="w-3 h-3 bg-red-500 rounded-full -mr-1"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-80"></div>
                      </div>
                      <div className="w-8 h-5 bg-blue-600 border border-blue-600 rounded flex items-center justify-center text-[6px] font-bold text-white tracking-tighter">
                        AMEX
                      </div>
                      <div className="w-6 h-5 bg-gray-50 border border-gray-200 rounded flex items-center justify-center text-[8px] text-gray-500">
                        +2
                      </div>
                    </div>
                  </label>
                  {paymentMethod === "sslcommerz" && (
                    <div className="mt-4 pt-4 border-t border-blue-100 text-center">
                      <p className="text-xs text-gray-600">
                        You&apos;ll be redirected to SSLCOMMERZ to complete your purchase.
                      </p>
                    </div>
                  )}
                </div>

                <label
                  className={`flex items-center gap-3 p-4 cursor-pointer ${paymentMethod === "cod" ? "bg-[#F0F7FF]" : "bg-white"}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="w-5 h-5 text-[#A05C55] focus:ring-[#A05C55]"
                  />
                  <span className="text-sm text-gray-700">Cash on Delivery (COD)</span>
                </label>
              </div>
            </div>

            {/* Billing Address */}
            <div className="mb-10">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Billing address</h3>
              <div className="border-2 border-gray-300 rounded-md overflow-hidden">
                <label
                  className={`flex items-center gap-3 p-4 cursor-pointer ${billingAddress === "same" ? "bg-[#F0F7FF]" : "bg-white"} border-b border-gray-100`}
                >
                  <input
                    type="radio"
                    name="billing"
                    checked={billingAddress === "same"}
                    onChange={() => setBillingAddress("same")}
                    className="w-5 h-5 text-[#A05C55] focus:ring-[#A05C55]"
                  />
                  <span className="text-sm text-gray-700">Same as shipping address</span>
                </label>
                <label
                  className={`flex items-center gap-3 p-4 cursor-pointer ${billingAddress === "different" ? "bg-[#F0F7FF]" : "bg-white"}`}
                >
                  <input
                    type="radio"
                    name="billing"
                    checked={billingAddress === "different"}
                    onChange={() => setBillingAddress("different")}
                    className="w-5 h-5 text-[#A05C55] focus:ring-[#A05C55]"
                  />
                  <span className="text-sm text-gray-700">Use a different billing address</span>
                </label>
              </div>
            </div>

            <button className="w-full bg-[#A05C55] hover:bg-[#8e524b] active:bg-[#7a4840] text-white py-5 rounded-md font-bold tracking-[0.1em] text-sm transition-all mb-12 shadow-md uppercase">
              Pay now
            </button>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 py-12 lg:pl-16 bg-white lg:bg-[#FCFAF6]">
            <div className="flex flex-col gap-6 mb-8">
              {cartItems.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 bg-white border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                      <span className="absolute -top-1.5 -right-1.5 bg-gray-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.selectedSize}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 py-6 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span>Shipping</span>
                  <IoHelpCircleOutline size={16} />
                </div>
                <span className="font-medium text-gray-900">
                  {formatPrice(selectedShipping.price)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 mr-2">BDT</span>
                <span className="text-2xl font-bold text-gray-900">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
