"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { StatusBadge } from "@/components/super-admin/ui/StatusBadge";
import { Edit, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

export default function AdminProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi(`products/${id}`).then((res) => {
      if (res.success && res.data) {
        setProduct(res.data);
      } else {
        setProduct({
          id,
          name: "Classic Cotton Linen Shirt",
          description: "High quality breathable linen fabric designed for comfort and elegance.",
          price: 1890,
          oldPrice: 2290,
          category: "casual-shirt",
          stock: 35,
          sku: `VYG-${id?.toString().slice(0, 6)}`,
          images: ["/images/shirt.jpg.jpeg"],
          sizes: ["M", "L", "XL"],
        });
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="py-20 text-center text-gray-400 animate-pulse">Loading product details...</div>;
  }

  return (
    <div className="space-y-6 w-full max-w-4xl pb-12">
      <PageHeader
        title={product?.name || "Product Details"}
        description={`SKU: ${product?.sku || id}`}
        breadcrumbs={[
          { label: "Products", href: "/admin/products" },
          { label: product?.name || "Product Details" },
        ]}
      >
        <Link
          href={`/admin/products/${id}/edit`}
          className="flex items-center gap-2 bg-[#B37068] hover:bg-[#9c6059] text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs"
        >
          <Edit size={16} />
          <span>Edit Product</span>
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm flex items-center justify-center">
          <div className="w-full h-80 relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
            <Image src={product?.images?.[0] || "/images/summer.jpg.jpeg"} alt={product?.name} fill className="object-cover" />
          </div>
        </div>

        <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-gray-200/70 shadow-sm space-y-5 text-xs">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-[#B37068] tracking-wider">
                {product?.category}
              </span>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">{product?.name}</h2>
            </div>
            <StatusBadge status={product?.stock <= 0 ? "OUT_OF_STOCK" : "IN_STOCK"} type="stock" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 font-bold text-[10px] uppercase">Price</p>
              <p className="text-xl font-extrabold text-[#3A322B] mt-0.5">৳{product?.price}</p>
            </div>
            <div>
              <p className="text-gray-400 font-bold text-[10px] uppercase">Stock Available</p>
              <p className="text-xl font-extrabold text-gray-800 mt-0.5">{product?.stock} units</p>
            </div>
          </div>

          <div>
            <p className="text-gray-400 font-bold text-[10px] uppercase mb-1">Description</p>
            <p className="text-gray-700 leading-relaxed">{product?.description || "No description provided."}</p>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to List</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
