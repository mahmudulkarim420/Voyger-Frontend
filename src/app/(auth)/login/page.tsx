import React from "react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-black">Welcome Back</h1>
        <p className="text-sm text-gray-500">Enter your credentials to access your account</p>
      </div>

      <form className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all"
          />
        </div>
        <button className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-colors">
          Sign In
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-black font-semibold hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
