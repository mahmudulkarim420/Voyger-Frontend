"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HoverButton } from "@/components/ui/HoverButton";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500); // Fake API latency
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 pt-8 md:pt-0 relative">
      
      {/* Logo Section - গ্যারান্টিড টপ সেন্টার (মোবাইলে) */}
      <div className="flex justify-center items-center w-full mb-6 md:mb-10">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="md:w-9 md:h-9"
          >
            <path
              d="M4 10 L16 30 L28 10"
              stroke="black"
              strokeWidth="1.5"
              strokeLinejoin="miter"
            />
            <path d="M16 2 L16 30" stroke="black" strokeWidth="1.5" />
            <path d="M10 6 L10 20" stroke="black" strokeWidth="1.5" />
            <path d="M22 6 L22 20" stroke="black" strokeWidth="1.5" />
            <path d="M4 10 L10 10" stroke="black" strokeWidth="1.5" />
            <path d="M22 10 L28 10" stroke="black" strokeWidth="1.5" />
          </svg>
          <span className="text-xl md:text-2xl text-black font-bold tracking-[0.2em] mt-1">VOYΛGE</span>
        </Link>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Create Account</h1>
        <p className="text-xs md:text-sm text-gray-500">Join VOYAGE for a premium shopping experience</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-black focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-gray-500"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-black focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-gray-500"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-black focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-gray-500"
            disabled={isLoading}
          />
        </div>
        <HoverButton
          variant="dark"
          size="lg"
          className="w-full rounded-xl py-3.5"
          isLoading={isLoading}
          type="submit"
        >
          Create Account
        </HoverButton>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-black font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}