"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoCloseOutline, IoTrashOutline, IoBagOutline } from "react-icons/io5";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/formatters";
import { HoverButton } from "@/components/ui/HoverButton";

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
  } = useCart();

  const [isClosing, setIsClosing] = useState(false);

  if (!isCartOpen && !isClosing) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsCartOpen(false);
      setIsClosing(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] ${
          isCartOpen && !isClosing ? "backdrop-fade-in" : "backdrop-fade-out"
        }`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={`relative w-full max-w-[420px] bg-[#FCFAF6] shadow-2xl flex flex-col ${
          isCartOpen && !isClosing ? "cart-slide-in" : "cart-slide-out"
        }`}
      >
        {/* Header */}
        <div className="bg-[#A05C55] px-6 py-5 flex items-center justify-between text-white shadow-sm">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase">Your Cart</h2>
            <div className="bg-white text-[#A05C55] w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold font-sans">
              {cartCount}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="hover:rotate-90 transition-transform duration-300"
            aria-label="Close cart"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide">
          {cartItems.length > 0 ? (
            <div className="flex flex-col gap-8">
              {cartItems.map((item, idx) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${idx}`}
                  className="flex gap-4 group cart-item-fade"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {/* Product Image */}
                  <div className="relative w-24 aspect-square flex-shrink-0 overflow-hidden rounded-[2px] bg-white border border-[#E9E1D8]/50">
                    <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-sm font-medium text-[#3A322B] leading-snug mb-1">
                        {item.name} {item.selectedSize ? `- ${item.selectedSize}` : ""}
                      </h3>
                      <p className="text-sm font-bold text-[#3A322B]">{formatPrice(item.price)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#E9E1D8] bg-white">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1, item.selectedSize)
                          }
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <AiOutlineMinus size={10} />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-xs font-bold text-[#3A322B]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1, item.selectedSize)
                          }
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                          aria-label="Increase quantity"
                        >
                          <AiOutlinePlus size={10} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <IoTrashOutline size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className="w-20 h-20 bg-[#F8F3EE] rounded-full flex items-center justify-center mb-6 opacity-60">
                <IoBagOutline className="text-[#A05C55] opacity-40" size={32} />
              </div>
              <p className="text-[#6A5A4A] italic font-light mb-8">Your cart is currently empty.</p>
              <HoverButton
                onClick={() => setIsCartOpen(false)}
                variant="primary"
                size="md"
                className="rounded-[1px]"
              >
                Continue Shopping
              </HoverButton>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#E9E1D8]/50 p-6 bg-white/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-bold text-[#3A322B] tracking-wide uppercase">
                Subtotal
              </span>
              <span className="text-lg font-bold text-[#3A322B]">{formatPrice(cartTotal)}</span>
            </div>

            <div className="flex flex-col gap-3">
              {/* View Cart Button */}
              <HoverButton
                variant="secondary"
                size="lg"
                href="/cart"
                onClick={handleClose}
                className="w-full rounded-[1px] border border-slate-900 uppercase tracking-[0.2em]"
              >
                View Cart
              </HoverButton>

              {/* Checkout Button */}
              <HoverButton
                variant="primary"
                size="lg"
                href="/checkout"
                onClick={handleClose}
                className="w-full rounded-[1px] uppercase tracking-[0.2em]"
              >
                Checkout
              </HoverButton>
            </div>
            <p className="mt-6 text-center text-xs text-gray-400 italic">
              Shipping, taxes, and discount codes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
