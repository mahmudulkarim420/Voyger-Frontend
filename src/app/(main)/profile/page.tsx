"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiAlertTriangle,
  FiArrowRight,
  FiLogOut,
  FiMail,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { HoverButton } from "@/components/ui/HoverButton";
import { Skeleton } from "@/components/ui/loaders/Skeleton";
import { useAuthCheck, useSignOut } from "@/hooks/useAuth";

/** Maps a raw backend role string to a display label + styling. */
function getRoleBadge(role: string | undefined) {
  if (!role) return null;

  const normalized = role.toLowerCase();
  if (normalized === "admin") {
    return { label: "Admin", className: "bg-black text-white" };
  }
  // Default to "User" for any non-admin role the backend may return.
  return { label: "User", className: "bg-gray-100 text-gray-700" };
}

export default function ProfilePage() {
  const router = useRouter();
  const {
    user,
    isPending,
    isAuthenticated,
    role,
    requiresDeviceManagement,
  } = useAuthCheck();
  const { signOutNow, isSigningOut } = useSignOut("/");

  // While the session is still resolving, show a structured skeleton so the
  // layout never collapses into an empty screen.
  if (isPending) {
    return <ProfileSkeleton />;
  }

  // If the session resolved but there is no user, bounce to the login page.
  // (The middleware also guards this, but we keep the client guard for safety.)
  if (!isAuthenticated || !user) {
    router.replace("/login");
    return <ProfileSkeleton />;
  }

  const roleBadge = getRoleBadge(role);
  const displayName = user.name?.trim() || "VOYΛGE Member";
  const initials = (user.name?.trim()?.[0] ?? "V").toUpperCase();

  return (
    <div className="bg-[#FCFAF6] min-h-screen">
      <div className="container mx-auto px-4 lg:px-12 py-10 md:py-16 max-w-3xl">
        {/* Page heading */}
        <div className="mb-8 md:mb-12">
          <p className="text-[11px] font-bold tracking-[0.3em] text-gray-400 uppercase mb-2">
            Account
          </p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
            Profile
          </h1>
        </div>

        <div className="space-y-6">
          {/* Security / Device Management alert */}
          {requiresDeviceManagement && (
            <div className="rounded-2xl border border-red-200 bg-red-50/70 p-5 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <FiAlertTriangle size={20} />
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-bold text-red-700">
                    Device limit reached
                  </h2>
                  <p className="mt-1 text-sm text-red-600/90 leading-relaxed">
                    Your account is active on too many devices. Please sign out
                    of at least one other device to continue using VOYΛGE
                    securely.
                  </p>
                  <Link
                    href="/device-limit"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-700 hover:text-red-800 transition-colors"
                  >
                    Manage devices
                    <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Identity card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
              {/* Avatar */}
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={displayName}
                  className="h-16 w-16 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white text-xl font-bold">
                  {initials}
                </div>
              )}

              {/* Name + role badge */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-lg font-bold text-black truncate">
                    {displayName}
                  </h2>
                  {roleBadge && (
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${roleBadge.className}`}
                    >
                      <FiShield size={11} />
                      {roleBadge.label}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailCard
              icon={<FiUser size={16} />}
              label="Name"
              value={displayName}
            />
            <DetailCard
              icon={<FiMail size={16} />}
              label="Email"
              value={user.email}
              mono
            />
          </div>

          {/* Account meta */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">
              Account
            </h3>
            <dl className="divide-y divide-gray-100">
              <MetaRow label="User ID" value={user.id} mono />
              <MetaRow
                label="Role"
                value={roleBadge ? roleBadge.label : "—"}
              />
              <MetaRow
                label="Device management"
                value={requiresDeviceManagement ? "Required" : "All clear"}
                tone={requiresDeviceManagement ? "warn" : "ok"}
              />
            </dl>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <HoverButton
              variant="dark"
              size="md"
              onClick={signOutNow}
              isLoading={isSigningOut}
              className="rounded-lg cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <FiLogOut size={15} />
                Sign Out
              </span>
            </HoverButton>
            <HoverButton
              variant="secondary"
              size="md"
              href="/orders"
              className="rounded-lg cursor-pointer"
            >
              My Orders
            </HoverButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/** A single detail card used in the two-up grid. */
function DetailCard({
  icon,
  label,
  value,
  mono,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-2 text-gray-400 mb-2">
        {icon}
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
          {label}
        </span>
      </div>
      <p
        className={`text-sm font-medium text-gray-900 break-words ${
          mono ? "font-mono text-[13px]" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

/** A label/value row inside the account meta card. */
function MetaRow({
  label,
  value,
  mono,
  tone,
}: {
  label: string;
  value: string;
  mono?: boolean;
  tone?: "ok" | "warn";
}) {
  const toneClass =
    tone === "warn"
      ? "text-red-600 font-semibold"
      : tone === "ok"
        ? "text-green-700 font-semibold"
        : "text-gray-900";

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd
        className={`text-sm text-right break-all min-w-0 ${
          mono ? "font-mono text-[12px]" : ""
        } ${toneClass}`}
      >
        {value}
      </dd>
    </div>
  );
}

/** Loading skeleton mirroring the real layout to avoid empty-screen flashes. */
function ProfileSkeleton() {
  return (
    <div className="bg-[#FCFAF6] min-h-screen">
      <div className="container mx-auto px-4 lg:px-12 py-10 md:py-16 max-w-3xl">
        <div className="mb-8 md:mb-12">
          <Skeleton className="h-3 w-16 mb-2" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-56" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
          </div>
          <Skeleton className="h-40 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
