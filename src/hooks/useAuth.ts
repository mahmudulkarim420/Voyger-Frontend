"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, authClient, signOut } from "@/lib/auth-client";

/**
 * Custom fields that the backend attaches to the Better Auth `user` object.
 *
 * These are NOT part of Better Auth's default client types, so we declare them
 * here as an extension and read them through a type-safe accessor. The core
 * session object remains strictly typed by `auth-client`'s `useSession()`.
 */
export interface AuthCustomUserFields {
  role?: string;
  requiresDeviceManagement?: boolean;
}

/** The session shape exactly as typed by Better Auth's `useSession()`. */
type SessionData = ReturnType<typeof useSession>["data"];

/** The user shape exactly as typed by Better Auth's `useSession()`. */
type SessionUser = NonNullable<SessionData>["user"];

/**
 * Safely read an optional custom field off the session user without resorting
 * to `as any`. We keep the original auth-client type intact and only widen the
 * known custom keys.
 */
function getCustomFields(user: SessionUser | undefined): AuthCustomUserFields {
  if (!user) return {};
  return user as unknown as AuthCustomUserFields;
}

export interface UseAuthCheckResult {
  /** Raw session data, strictly typed by auth-client (null when logged out). */
  session: SessionData;
  /** Convenience accessor for `session.user`. */
  user: SessionUser | undefined;
  /** True only while the session request is in flight (initial load / refetch). */
  isPending: boolean;
  /** True only when the session has resolved AND a user exists. */
  isAuthenticated: boolean;
  /** True only when the session has resolved AND no user exists. */
  isUnauthenticated: boolean;
  /** The user's role, if the backend provides one (e.g. "admin" / "user"). */
  role: string | undefined;
  /** Backend flag indicating the user must manage/revoke active devices. */
  requiresDeviceManagement: boolean;
  /** Force a fresh fetch of the session from the backend. */
  refetch: () => Promise<unknown>;
}

/**
 * Centralized auth-state hook.
 *
 * Wraps Better Auth's `useSession()` so every consumer gets a single,
 * consistent view of the auth state. Crucially, it separates the `isPending`
 * (loading) state from the authenticated/unauthenticated states so the UI
 * never flashes an empty screen while the session is still resolving.
 */
export function useAuthCheck(): UseAuthCheckResult {
  const { data: session, isPending, refetch } = useSession();

  const user = session?.user;
  const custom = getCustomFields(user);

  const hasResolved = !isPending;
  const isAuthenticated = hasResolved && Boolean(session && user);
  const isUnauthenticated = hasResolved && !session;

  return {
    session,
    user,
    isPending,
    isAuthenticated,
    isUnauthenticated,
    role: custom.role,
    requiresDeviceManagement: Boolean(custom.requiresDeviceManagement),
    refetch,
  };
}

export interface UseSignOutResult {
  /** Triggers sign-out, clears local session state, and redirects home. */
  signOutNow: () => Promise<void>;
  /** True while the sign-out request is in flight. */
  isSigningOut: boolean;
}

/**
 * Reusable sign-out flow.
 *
 * 1. Calls Better Auth's `signOut()` to invalidate the session server-side.
 * 2. Forces a local session refresh so every `useSession()` subscriber
 *    (navbar, profile, etc.) drops its cached user immediately.
 * 3. Redirects to the landing page.
 */
export function useSignOut(redirectPath = "/"): UseSignOutResult {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const signOutNow = useCallback(async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      // Clear the locally-cached session so reactive consumers update at once.
      await authClient.getSession();
    } catch {
      // Even if the network call fails, push the user off the authenticated view.
    } finally {
      setIsSigningOut(false);
      router.push(redirectPath);
    }
  }, [router, redirectPath]);

  return { signOutNow, isSigningOut };
}
