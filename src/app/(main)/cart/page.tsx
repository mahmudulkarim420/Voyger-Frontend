"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCart } from "@/context/CartContext";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  })
    .format(price)
    .replace("BDT", "Tk");

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="w-full min-h-screen bg-[#FCFAF6]">
      <div className="container mx-auto px-4 lg:px-12 py-16 max-w-5xl">
        {/* Header */}
        <div className="flex justify-between items-end mb-12 border-b border-[#E9E1D8] pb-8">
          <h1 className="text-5xl font-serif text-[#3A322B] font-medium tracking-tight">
            Your cart
          </h1>
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-black transition-colors underline underline-offset-4 decoration-gray-300"
          >
            Continue shopping
          </Link>
        </div>

        {cartItems.length > 0 ? (
          <>
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 mb-6 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
              <div className="col-span-6">Product</div>
              <div className="col-span-4 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Cart Items */}
            <div className="flex flex-col border-b border-[#E9E1D8]">
              {cartItems.map((item, idx) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${idx}`}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-t border-[#E9E1D8]/50 items-center"
                >
                  {/* Product Info */}
                  <div className="col-span-1 md:col-span-6 flex gap-6">
                    <div className="relative w-28 aspect-square flex-shrink-0 overflow-hidden rounded-[2px] bg-white border border-[#E9E1D8]/30">
                      <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                      <h3 className="text-lg font-serif text-[#3A322B] font-medium leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                      {item.selectedSize && (
                        <p className="text-sm text-gray-500 italic mt-1">
                          Size: {item.selectedSize}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-1 md:col-span-4 flex justify-center items-center gap-6">
                    <div className="flex items-center border border-[#D5C1B6] bg-white shadow-sm">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1, item.selectedSize)
                        }
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <AiOutlineMinus size={12} />
                      </button>
                      <span className="w-12 h-10 flex items-center justify-center text-sm font-bold text-[#3A322B]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1, item.selectedSize)
                        }
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                        aria-label="Increase quantity"
                      >
                        <AiOutlinePlus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      aria-label="Remove item"
                    >
                      <IoTrashOutline size={20} />
                    </button>
                  </div>

                  {/* Total per Item */}
                  <div className="col-span-1 md:col-span-2 text-right">
                    <span className="text-lg font-medium text-[#3A322B]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal & Checkout */}
            <div className="mt-12 flex flex-col items-end gap-6">
              <div className="flex items-baseline gap-4">
                <span className="text-sm font-bold text-[#3A322B] tracking-wide uppercase">
                  Estimated total
                </span>
                <span className="text-2xl font-bold text-[#3A322B]">
                  {formatPrice(cartTotal)} BDT
                </span>
              </div>
              <p className="text-xs text-gray-400 italic">
                Taxes, discounts and shipping calculated at checkout.
              </p>
              <Link
                href="/checkout"
                className="w-full md:w-80 py-4 bg-[#A05C55] text-white text-center font-bold tracking-[0.2em] text-xs uppercase hover:bg-[#8e524b] transition-all duration-300 rounded-[1px] shadow-md"
              >
                Check out
              </Link>
            </div>
          </>
        ) : (
          <div className="py-32 text-center">
            <h2 className="text-2xl font-serif text-[#3A322B] mb-6">Your cart is empty</h2>
            <Link
              href="/"
              className="bg-[#A05C55] text-white px-12 py-4 rounded-[1px] font-bold tracking-[0.2em] text-xs uppercase hover:bg-[#8e524b] transition-all shadow-md inline-block"
            >
              Continue shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
