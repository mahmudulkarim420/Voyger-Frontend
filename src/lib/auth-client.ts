import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001/api/v1/auth",
  user: {
    additionalFields: {
      role: {
        type: "string",
      },
      requiresDeviceManagement: {
        type: "boolean",
      },
    },
  },
});

export const { signIn, signOut, useSession } = authClient;
