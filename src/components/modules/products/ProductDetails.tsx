"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaChevronDown,
  FaEnvelope,
  FaFacebookF,
  FaFacebookMessenger,
  FaMinus,
  FaPinterestP,
  FaPlus,
  FaRulerCombined,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoBagOutline } from "react-icons/io5";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductDetailsProps {
  product: Product;
  relatedProducts: Product[];
  similarProducts: Product[];
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  })
    .format(price)
    .replace("BDT", "Tk");

export default function ProductDetails({
  product,
  relatedProducts,
  similarProducts,
}: ProductDetailsProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const sizes = product.sizes ?? ["M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>("details");
  const activeProductImage = product.images[activeImage] ?? product.images[0];

  // Use a placeholder base URL for social sharing
  const baseUrl = "https://voyage-fashion.com";
  const shareUrl = `${baseUrl}/product/${product.id}`;
  const encodedShareUrl = encodeURIComponent(shareUrl);
  const encodedShareText = encodeURIComponent(`Check out ${product.name} from VOYAGE`);
  const encodedImage = encodeURIComponent(product.images[0] ?? "");

  const shareLinks = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`,
      icon: <FaFacebookF size={12} />,
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedShareText}&url=${encodedShareUrl}`,
      icon: <FaXTwitter size={12} />,
    },
    {
      name: "Pinterest",
      href: `https://www.pinterest.com/pin/create/button/?url=${encodedShareUrl}&media=${encodedImage}&description=${encodedShareText}`,
      icon: <FaPinterestP size={12} />,
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodedShareText}%20${encodedShareUrl}`,
      icon: <FaWhatsapp size={12} />,
    },
    {
      name: "Messenger",
      href: `fb-messenger://share/?link=${encodedShareUrl}`,
      icon: <FaFacebookMessenger size={12} />,
    },
    {
      name: "Email",
      href: `mailto:?subject=${encodedShareText}&body=${encodedShareUrl}`,
      icon: <FaEnvelope size={12} />,
    },
  ];

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="w-full min-h-screen bg-[#FCFAF6]">
      <div className="container mx-auto px-4 lg:px-12 py-6 max-w-7xl">
        <nav className="text-[10px] text-gray-500 mb-6 flex items-center gap-2 tracking-tight">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600 underline underline-offset-2">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden rounded-[2px] bg-white group">
              <Image
                src={activeProductImage}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
              <div className="absolute top-6 left-6 flex items-baseline gap-1 opacity-70">
                <span className="text-white text-lg font-serif tracking-[4px] uppercase select-none">
                  VOYAGE
                </span>
              </div>
              <div className="absolute top-6 right-6 opacity-60">
                <span className="text-white text-[8px] font-medium tracking-[2px] uppercase select-none">
                  divine couture
                </span>
              </div>
            </div>

            <div className="flex gap-4 scrollbar-hide overflow-x-auto py-1">
              {product.images.map((img, idx) => (
                <button
                  key={`${product.id}-${img}-${idx}`}
                  onClick={() => setActiveImage(idx)}
                  aria-label={`Show ${product.name} image ${idx + 1}`}
                  className={`w-32 aspect-[4/3] rounded-[1px] overflow-hidden border transition-all ${
                    activeImage === idx
                      ? "border-[#A05C55]"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    width={128}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <h1 className="text-3xl lg:text-4xl font-serif text-[#3A322B] mb-3 font-light">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-8">
              <span className="text-xl font-bold text-[#3A322B]">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <div className="relative text-sm text-gray-400 italic">
                  {formatPrice(product.oldPrice)}
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-600 -rotate-3" />
                </div>
              )}
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#3A322B] tracking-wider">Size</span>
                <button
                  className="flex items-center gap-1.5 text-[10px] text-gray-800 hover:text-black transition-colors font-semibold"
                  aria-label="Open size guide"
                >
                  <FaRulerCombined className="rotate-45" size={12} />
                  <span className="underline underline-offset-4 italic">Size Guide</span>
                </button>
              </div>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    aria-label={`Select size ${size}`}
                    className={`w-9 h-8 flex items-center justify-center rounded-[1px] border text-[11px] font-bold transition-all ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-300 text-[#3A322B] hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <div className="inline-flex items-center border border-gray-200 bg-white/50 backdrop-blur-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black transition-colors border-r border-gray-100"
                  aria-label="Decrease quantity"
                >
                  <FaMinus size={8} />
                </button>
                <span className="w-16 h-10 flex items-center justify-center text-xs font-bold text-[#3A322B]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black transition-colors border-l border-gray-100"
                  aria-label="Increase quantity"
                >
                  <FaPlus size={8} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-10">
              <button
                onClick={() => addToCart(product, selectedSize)}
                className="w-full bg-[#A05C55] hover:bg-[#8e524b] text-white py-[14px] rounded-[1px] flex items-center justify-center gap-3 font-bold tracking-[2px] text-xs transition-all uppercase shadow-sm"
              >
                <IoBagOutline size={16} />
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product, selectedSize);
                  router.push("/checkout");
                }}
                className="w-full bg-[#6C714D] hover:bg-[#606544] text-white py-[14px] rounded-[1px] font-bold tracking-[2px] text-xs transition-all uppercase shadow-sm"
              >
                Buy It Now
              </button>
            </div>

            <div className="flex items-center gap-4 mb-10">
              <span className="text-[10px] text-gray-400 italic">Share:</span>
              <div className="flex gap-4">
                {shareLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-900 transition-colors hover:text-[#A05C55]"
                    aria-label={`Share ${product.name} on ${item.name}`}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col border-t border-gray-200">
              {[
                { id: "details", title: "Product Details", content: product.description },
                {
                  id: "delivery",
                  title: "Delivery",
                  content:
                    "Standard delivery within 3-5 business days. Free shipping on orders over Tk 5,000.",
                },
                {
                  id: "policy",
                  title: "Exchange & Return Policy",
                  content:
                    "7-day easy return and exchange policy for unused items with original tags.",
                },
              ].map((section) => (
                <div key={section.id} className="border-b border-gray-200">
                  <button
                    onClick={() => toggleAccordion(section.id)}
                    className="w-full py-4 flex items-center justify-between text-left group"
                    aria-expanded={openAccordion === section.id}
                  >
                    <span className="text-[12px] font-medium text-[#3A322B] group-hover:text-[#A05C55] transition-colors tracking-wide">
                      {section.title}
                    </span>
                    <FaChevronDown
                      size={10}
                      className={`text-gray-400 transition-transform duration-500 ease-out ${
                        openAccordion === section.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openAccordion === section.id
                        ? "max-h-[500px] opacity-100 pb-6"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-[11px] text-gray-600 leading-relaxed italic pr-4">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 border-t border-gray-100">
          {relatedProducts.length > 0 && (
            <div className="lg:col-span-9">
              <h2 className="text-2xl lg:text-3xl font-serif text-[#3A322B] mb-10 tracking-widest font-light">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {relatedProducts.map((item) => (
                  <Link key={item.id} href={`/product/${item.id}`} className="flex flex-col group">
                    <div className="relative aspect-square overflow-hidden rounded-[2px] mb-6 shadow-sm bg-white">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, 100vw"
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="bg-[#F8F3EE] px-4 py-4 rounded-[1px] text-center border border-[#E9E1D8]/50">
                      <h3 className="text-[11px] font-bold text-[#3A322B] mb-2 group-hover:text-[#A05C55] transition-colors tracking-wider uppercase">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-[10px] font-bold text-[#3A322B]">
                          {formatPrice(item.price)}
                        </span>
                        {item.oldPrice && (
                          <div className="relative text-[9px] text-gray-400 italic">
                            {formatPrice(item.oldPrice)}
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-300 -rotate-3" />
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {similarProducts.length > 0 && (
            <div className="lg:col-span-3">
              <h2 className="text-2xl lg:text-3xl font-serif text-[#3A322B] mb-10 tracking-widest font-light">
                Similar Products
              </h2>
              <div className="flex flex-col gap-6">
                {similarProducts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.id}`}
                    className="flex gap-4 group items-center"
                  >
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-[1px] shadow-sm bg-white">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-[10px] font-bold text-[#3A322B] group-hover:text-[#A05C55] transition-colors tracking-wide uppercase">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#3A322B]">
                          {formatPrice(item.price)}
                        </span>
                        {item.oldPrice && (
                          <div className="relative text-[9px] text-gray-400 italic">
                            {formatPrice(item.oldPrice)}
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-300 -rotate-3" />
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
