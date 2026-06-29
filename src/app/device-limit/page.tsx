"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";

export default function DeviceLimitPage() {
  const { data: session, isPending } = useSession();
  const [sessions, setSessions] = useState<any[]>([]);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const router = useRouter();

  const fetchActiveSessions = async () => {
    // Better Auth native method to list all devices bound to this user.
    const res = await authClient.listSessions();
    if (res.data) {
      setSessions(res.data);
      // If we fall to 2 or below, trigger a quick session refresh and return to dashboard
      if (res.data.length <= 2) {
        // Force refresh of session data so the navbar and middleware know the flag flipped
        await authClient.getSession();
        router.push("/");
      }
    }
  };

  useEffect(() => {
    fetchActiveSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRevoke = async (sessionToken: string) => {
    setLoadingIds((prev) => [...prev, sessionToken]);
    await authClient.revokeSession({ token: sessionToken });
    await fetchActiveSessions();
    setLoadingIds((prev) => prev.filter((id) => id !== sessionToken));
  };

  if (isPending) {
    return <p className="text-center mt-20">Securely loading your devices...</p>;
  }

  if (!(session?.user as any)?.requiresDeviceManagement) {
    return <p className="text-center mt-20">You are within normal device limits. Redirecting...</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-20 p-8 border border-red-200 rounded-2xl bg-white shadow-xl shadow-red-500/5">
      <div className="text-center space-y-3 mb-8">
        <h1 className="text-2xl font-bold text-red-600">Maximum Devices Reached</h1>
        <p className="text-gray-600 text-sm">
          Your account is currently active on too many devices. To continue, please log out of at
          least one other device to free up a slot.
        </p>
      </div>

      <div className="space-y-4">
        {sessions.map((s) => {
          const isCurrentSession = s.id === session?.session?.id;

          return (
            <div
              key={s.id}
              className={`flex items-center justify-between p-4 rounded-xl border ${isCurrentSession ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`}
            >
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">
                  {s.userAgent?.includes("Mac")
                    ? "Mac OS"
                    : s.userAgent?.includes("Win")
                      ? "Windows"
                      : "Mobile / Unknown"}
                </span>
                <span className="text-xs text-gray-500">
                  {isCurrentSession
                    ? "Currently using this device"
                    : `Logged in on ${new Date(s.createdAt).toLocaleDateString()}`}
                </span>
              </div>

              {!isCurrentSession && (
                <button
                  onClick={() => handleRevoke(s.token)}
                  disabled={loadingIds.includes(s.token)}
                  className="px-4 py-2 text-sm bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors focus:ring-4 focus:ring-red-100 disabled:opacity-50"
                >
                  {loadingIds.includes(s.token) ? "Removing..." : "Remove Access"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
