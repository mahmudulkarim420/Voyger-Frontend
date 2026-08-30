"use client";

import React, { createContext, useState, useEffect } from "react";
import type { Product } from "@/types";
import { fetchApi } from "@/lib/api";

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size?: string, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  cartCount: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("voyage_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
    setIsMounted(true);

    fetchApi("cart").then((res) => {
      if (res.success && res.data?.items && res.data.items.length > 0) {
        const serverItems: CartItem[] = res.data.items.map((item: any) => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          description: "",
          category: "shirt" as any,
          stock: item.stock ?? 10,
          images: [item.image],
          quantity: item.quantity,
          selectedSize: item.size,
        }));
        setCartItems(serverItems);
      }
    });
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("voyage_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  const addToCart = (product: Product, size?: string, qtyToAdd = 1, openDrawer = true) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.selectedSize === size
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += qtyToAdd;
        return updatedItems;
      }

      return [...prevItems, { ...product, quantity: qtyToAdd, selectedSize: size }];
    });

    fetchApi("cart/items", {
      method: "POST",
      body: JSON.stringify({ productId: product.id, size, quantity: qtyToAdd }),
    });

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (productId: string, size?: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === productId && item.selectedSize === size))
    );

    const query = size ? `?size=${encodeURIComponent(size)}` : "";
    fetchApi(`cart/items/${productId}${query}`, {
      method: "DELETE",
    });
  };

  const updateQuantity = (productId: string, quantity: number, size?: string) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );

    const query = size ? `?size=${encodeURIComponent(size)}` : "";
    fetchApi(`cart/items/${productId}${query}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    });
  };

  const clearCart = () => {
    setCartItems([]);
    fetchApi("cart", { method: "DELETE" });
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
