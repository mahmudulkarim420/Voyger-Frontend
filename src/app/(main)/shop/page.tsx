import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const categories = [
  { name: "Casual Shirts", slug: "casual-shirt", image: "/images/vc-433.jpg.jpeg" },
  { name: "Panjabi", slug: "luxury-panjabi", image: "/images/vk-2000i.jpg.jpeg" },
  { name: "Denim", slug: "denim-shirt", image: "/images/Destryed-Blue-i.jpg.jpeg" },
  { name: "Formal Pants", slug: "formal-pant", image: "/images/vp-1010i.jpg.jpeg" },
];

export default function ShopPage() {
  return (
    <div className="w-full min-h-screen bg-[#FCFAF6]">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight text-black mb-4">Shop by Category</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Discover our curated collections designed for style and comfort.
          </p>
        </div>

        {/* গ্যাপ মোবাইলের জন্য একটু কমানো হয়েছে (gap-4) যাতে ইমেজের জায়গা বেশি পাওয়া যায় */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop/${category.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* এখানে justify-center (মোবাইলের জন্য) এবং md:justify-between যুক্ত করা হয়েছে, প্যাডিং p-3 করা হয়েছে */}
              <div className="absolute bottom-0 left-0 p-3 md:p-8 w-full flex items-center justify-center md:justify-between">
                
                {/* whitespace-nowrap টেক্সটকে ১ লাইনে রাখবে */}
                <h2 className="text-[14px] sm:text-base md:text-2xl font-bold text-white whitespace-nowrap text-center">
                  {category.name}
                </h2>
                
                {/* আইকনটি মোবাইলে absolute রাখা হয়েছে যেন টেক্সট একদম পারফেক্ট সেন্টারে থাকে */}
                <div className="absolute right-2 md:relative md:right-0 bg-white/20 backdrop-blur-md p-1.5 md:p-2 rounded-full text-white transform translate-x-4 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
                  <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-black font-semibold hover:underline"
          >
            View All Products <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}