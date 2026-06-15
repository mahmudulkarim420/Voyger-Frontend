"use client";

import React, { useState } from "react";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/formatters";
import { IoHelpCircleOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { HoverButton } from "@/components/ui/HoverButton";

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

  const [isLoading, setIsLoading] = useState(false);

  const total = cartTotal + selectedShipping.price;

  const handleCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // alert("Order placed successfully");
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#FCFAF6]">
      <div className="container mx-auto px-4 lg:px-12 max-w-7xl py-6 md:py-8 lg:py-0">
        {/* মোবাইলের জন্য flex-col-reverse ব্যবহার করা হয়েছে, যাতে Order Summary আগে দেখায় */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-0">
          
          {/* Left Column: Form (মোবাইলে এটি নিচে থাকবে) */}
          <div className="lg:col-span-7 py-8 lg:py-12 lg:pr-16 lg:border-r border-gray-200 mt-6 lg:mt-0 border-t lg:border-t-0">
            {/* Contact */}
            <div className="mb-8 lg:mb-10">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
                    M
                  </div>
                  <span className="text-sm text-gray-700 truncate max-w-[200px] sm:max-w-none">
                    mknaiem998@gmail.com
                  </span>
                </div>
                <button className="text-gray-400 p-1">
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

                {/* মোবাইলের জন্য grid-cols-1 এবং বড় স্ক্রিনের জন্য sm:grid-cols-2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                {/* মোবাইলের জন্য grid-cols-1 এবং বড় স্ক্রিনের জন্য sm:grid-cols-2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div className="mb-8 lg:mb-10">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping method</h3>
              <div className="border border-gray-300 rounded-md overflow-hidden">
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
            <div className="mb-8 lg:mb-10">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Payment</h3>
              <p className="text-sm text-gray-500 mb-4">
                All transactions are secure and encrypted.
              </p>

              <div className="border border-gray-300 rounded-md overflow-hidden">
                <div
                  className={`p-4 ${paymentMethod === "sslcommerz" ? "bg-[#F0F7FF]" : "bg-white"} border-b border-gray-100`}
                >
                  <label className="flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer gap-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "sslcommerz"}
                        onChange={() => setPaymentMethod("sslcommerz")}
                        className="w-5 h-5 text-[#A05C55] focus:ring-[#A05C55] shrink-0"
                      />
                      <span className="text-sm text-gray-700 font-medium">SSLCOMMERZ</span>
                    </div>
                    {/* পেমেন্ট আইকনগুলো মোবাইলে যেন ভেঙে না যায় তাই flex-wrap দেওয়া হয়েছে */}
                    <div className="flex flex-wrap gap-1.5 ml-8 sm:ml-0">
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
                    className="w-5 h-5 text-[#A05C55] focus:ring-[#A05C55] shrink-0"
                  />
                  <span className="text-sm text-gray-700">Cash on Delivery (COD)</span>
                </label>
              </div>
            </div>

            {/* Billing Address */}
            <div className="mb-10">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Billing address</h3>
              <div className="border border-gray-300 rounded-md overflow-hidden">
                <label
                  className={`flex items-center gap-3 p-4 cursor-pointer ${billingAddress === "same" ? "bg-[#F0F7FF]" : "bg-white"} border-b border-gray-100`}
                >
                  <input
                    type="radio"
                    name="billing"
                    checked={billingAddress === "same"}
                    onChange={() => setBillingAddress("same")}
                    className="w-5 h-5 text-[#A05C55] focus:ring-[#A05C55] shrink-0"
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
                    className="w-5 h-5 text-[#A05C55] focus:ring-[#A05C55] shrink-0"
                  />
                  <span className="text-sm text-gray-700">Use a different billing address</span>
                </label>
              </div>
            </div>

            <HoverButton
              variant="primary"
              size="lg"
              className="w-full rounded-md mb-6 lg:mb-12 py-4 cursor-pointer"
              isLoading={isLoading}
              onClick={handleCheckout}
            >
              Pay now
            </HoverButton>
          </div>

          {/* Right Column: Order Summary (মোবাইলে এটি উপরে থাকবে) */}
          <div className="lg:col-span-5 pt-4 pb-8 lg:py-12 lg:pl-16 bg-[#FCFAF6]">
            
            {/* Mobile Header for Order Summary */}
            <h2 className="text-xl font-bold text-gray-900 mb-6 lg:hidden">Order Summary</h2>

            <div className="flex flex-col gap-6 mb-8">
              {cartItems.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    
                    {/* কোয়ান্টিটি ব্যাজ ফিক্স: overflow-hidden এর বাইরে রাখা হয়েছে যাতে কেটে না যায় */}
                    <div className="relative flex-shrink-0">
                      <div className="relative w-16 h-16 bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                      </div>
                      <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#FCFAF6] z-10 shadow-sm">
                        {item.quantity}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{item.selectedSize}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 shrink-0">
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