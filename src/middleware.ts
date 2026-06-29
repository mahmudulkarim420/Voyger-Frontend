import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Grab the session cookie.
  // Note: Depending on your domain config, Better Auth names this 'better-auth.session_token'.
  const sessionToken =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("better-auth.session_token.sig");

  const isDeviceLimitPath = request.nextUrl.pathname.startsWith("/device-limit");

  // If there's no session, bypass (they are either logged out or visiting public routes).
  if (!sessionToken) {
    return NextResponse.next();
  }

  // Fetch from the backend API to strictly read the 'requiresDeviceManagement' state.
  const authUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1/auth";

  try {
    const res = await fetch(`${authUrl}/get-session`, {
      headers: {
        // Forward the cookie so the backend can identify the session.
        cookie: request.headers.get("cookie") || "",
      },
    });

    if (res.ok) {
      const data = await res.json();
      const user = data?.user;

      const requiresMgmt = user?.requiresDeviceManagement === true;

      // Enforce redirect logic based on the user's forced state
      if (requiresMgmt && !isDeviceLimitPath && !request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/device-limit", request.url));
      }

      if (!requiresMgmt && isDeviceLimitPath) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } catch (error) {
    // Fail gracefully if backend is unreachable
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Run middleware on all paths except static assets & trpc/api routes.
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
