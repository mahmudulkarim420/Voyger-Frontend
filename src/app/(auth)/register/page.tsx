"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HoverButton } from "@/components/ui/HoverButton";
import { signUp, signIn } from "@/lib/auth-client";

export default function RegisterPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full max-w-md mx-auto space-y-6 pt-8 md:pt-0 relative px-4">
        <div className="flex justify-center items-center w-full mb-6 md:mb-10">
          <div className="w-32 h-9 bg-gray-100 animate-pulse rounded" />
        </div>
        <div className="space-y-4 pt-4">
          <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-12 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const { data, error: signUpError } = await signUp.email({
      name,
      email,
      password,
    });
    if (signUpError) {
      setError(signUpError.message || "Failed to create account");
      setIsLoading(false);
    } else {
      router.push("/");
      // Keep isLoading true while redirecting
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error: signInError } = await signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000/",
    });
    if (signInError) {
      setError(signInError.message || "Failed to sign up with Google");
      setIsLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error: signInError } = await signIn.social({
      provider: "facebook",
      callbackURL: "http://localhost:3000/",
    });
    if (signInError) {
      setError(signInError.message || "Failed to sign up with Facebook");
      setIsLoading(false);
    }
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
            <path d="M4 10 L16 30 L28 10" stroke="black" strokeWidth="1.5" strokeLinejoin="miter" />
            <path d="M16 2 L16 30" stroke="black" strokeWidth="1.5" />
            <path d="M10 6 L10 20" stroke="black" strokeWidth="1.5" />
            <path d="M22 6 L22 20" stroke="black" strokeWidth="1.5" />
            <path d="M4 10 L10 10" stroke="black" strokeWidth="1.5" />
            <path d="M22 10 L28 10" stroke="black" strokeWidth="1.5" />
          </svg>
          <span className="text-xl md:text-2xl text-black font-bold tracking-[0.2em] mt-1">
            VOYΛGE
          </span>
        </Link>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Create Account</h1>
        <p className="text-xs md:text-sm text-gray-500">
          Join VOYAGE for a premium shopping experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm">
            {error}
          </div>
        )}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-black focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-gray-500"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-black focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-gray-500"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
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
          {isLoading ? "Creating Account..." : "Create Account"}
        </HoverButton>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full px-4 py-3 bg-white border border-gray-200 text-black font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <button
          type="button"
          onClick={handleFacebookSignIn}
          disabled={isLoading}
          className="w-full px-4 py-3 bg-white border border-gray-200 text-black font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Continue with Facebook
        </button>
      </div>

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
