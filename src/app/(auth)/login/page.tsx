"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { useAuthCheck } from "@/hooks/useAuth";
import { getDashboardRoute } from "@/lib/auth/route-policy";
import { getSafeCallbackUrl } from "@/lib/security/safe-redirect";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCallbackUrl = searchParams.get("callbackUrl");

  const { isAuthenticated, isPending, role } = useAuthCheck();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If the user is already authenticated, send them to safe callback or default dashboard
  useEffect(() => {
    if (isMounted && !isPending && isAuthenticated) {
      const defaultDashboard = getDashboardRoute(role);
      const safeTarget = getSafeCallbackUrl(rawCallbackUrl, defaultDashboard);
      router.replace(safeTarget);
    }
  }, [isMounted, isPending, isAuthenticated, role, rawCallbackUrl, router]);

  if (!isMounted) {
    return (
      <div className="w-full max-w-md mx-auto space-y-6 pt-8 md:pt-0 relative px-4">
        <div className="flex justify-center items-center w-full mb-6 md:mb-10">
          <div className="w-32 h-9 bg-gray-100 animate-pulse rounded" />
        </div>
        <div className="space-y-4 pt-4">
          <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  // Build absolute OAuth callback URL
  const getCallbackURL = () => {
    const defaultDashboard = getDashboardRoute(role);
    const targetPath = getSafeCallbackUrl(rawCallbackUrl, defaultDashboard);

    if (typeof window !== "undefined") {
      return `${window.location.origin}${targetPath}`;
    }
    return `https://voyger-frontend.vercel.app${targetPath}`;
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    const { error: signInError } = await signIn.social({
      provider: "google",
      callbackURL: getCallbackURL(),
    });
    if (signInError) {
      setError(signInError.message || "Failed to sign in with Google");
      setIsLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setIsLoading(true);
    setError(null);
    const { error: signInError } = await signIn.social({
      provider: "facebook",
      callbackURL: getCallbackURL(),
    });
    if (signInError) {
      setError(signInError.message || "Failed to sign in with Facebook");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 pt-8 md:pt-0 relative">
      {/* Logo */}
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
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Welcome Back</h1>
        <p className="text-xs md:text-sm text-gray-500">
          Sign in with your social account to continue
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm">
          {error}
        </div>
      )}

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
        <p className="text-xs text-gray-400">
          By continuing, you agree to our{" "}
          <Link href="/terms-of-service" className="underline hover:text-gray-600">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="underline hover:text-gray-600">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md mx-auto space-y-6 pt-8 md:pt-0 relative px-4">
          <div className="flex justify-center items-center w-full mb-6 md:mb-10">
            <div className="w-32 h-9 bg-gray-100 animate-pulse rounded" />
          </div>
          <div className="space-y-4 pt-4">
            <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
          </div>
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}