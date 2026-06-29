"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Register page — OAuth-only redirect.
 *
 * Since the app now exclusively uses Google/Facebook OAuth,
 * there is no separate registration flow. Any user landing on
 * /register is immediately redirected to /login.
 */
export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return (
    <div className="w-full max-w-md mx-auto pt-20 text-center">
      <p className="text-sm text-gray-500">Redirecting to login...</p>
    </div>
  );
}
