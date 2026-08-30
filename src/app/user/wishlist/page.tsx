"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { ShoppingBag, Trash2, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

const mockWishlist = [
  {
    id: "w-1",
    name: "Classic Silk Panjabi Collection",
    price: "৳2,490.00",
    oldPrice: "৳2,990.00",
    stock: "IN_STOCK",
    image: "/images/panjabi.jpeg",
  },
  {
    id: "w-2",
    name: "Casual Slim Fit Cotton Shirt",
    price: "৳1,800.00",
    oldPrice: "৳2,100.00",
    stock: "IN_STOCK",
    image: "/images/shirt.jpg.jpeg",
  },
  {
    id: "w-3",
    name: "Slim Fit Stretch Denim Pants",
    price: "৳2,290.00",
    oldPrice: null,
    stock: "OUT_OF_STOCK",
    image: "/images/pants.jpeg",
  },
];

export default function UserWishlistPage() {
  const [items, setItems] = useState(mockWishlist);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6 w-full pb-12">
      <PageHeader
        title="My Saved Wishlist"
        description="Keep track of your favorite products and move them to cart anytime"
        breadcrumbs={[{ label: "Wishlist" }]}
      />

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-gray-200/70 shadow-sm text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart size={32} />
          </div>
          <h3 className="text-base font-bold text-gray-900">Your Wishlist is Empty</h3>
          <p className="text-xs text-gray-400">
            Browse our luxury collection and save items you love.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#B37068] hover:bg-[#9c6059] text-white px-6 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs"
          >
            <span>Explore Collection</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-4 border border-gray-200/70 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-full h-52 relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-gray-400 hover:text-rose-600 shadow-sm transition-colors cursor-pointer"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-extrabold text-[#3A322B]">{item.price}</span>
                    {item.oldPrice && (
                      <span className="text-[11px] text-gray-400 line-through">
                        {item.oldPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  disabled={item.stock === "OUT_OF_STOCK"}
                  className={`w-full py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    item.stock === "OUT_OF_STOCK"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-[#B37068] hover:bg-[#9c6059] text-white shadow-xs"
                  }`}
                >
                  <ShoppingBag size={14} />
                  <span>{item.stock === "OUT_OF_STOCK" ? "Out of Stock" : "Add to Cart"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
