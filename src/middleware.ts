import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authorizeRoute } from "@/lib/auth/route-policy";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const callbackUrlParam = request.nextUrl.searchParams.get("callbackUrl");

  // Read Better Auth session token cookie
  const sessionToken =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("better-auth.session_token.sig");

  let isAuthenticated = false;
  let rawRole: string | undefined = undefined;
  let requiresDeviceMgmt: boolean | undefined = undefined;

  if (sessionToken) {
    const authUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001/api/v1/auth";

    try {
      const res = await fetch(`${authUrl}/get-session`, {
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.user) {
          isAuthenticated = true;
          rawRole = data.user.role;
          requiresDeviceMgmt = data.user.requiresDeviceManagement === true;
        }
      }
    } catch {
      // Fail gracefully on network or unreachable backend
    }
  }

  // Authoritative route authorization evaluation
  const authResult = authorizeRoute(
    pathname,
    isAuthenticated,
    rawRole,
    requiresDeviceMgmt,
    callbackUrlParam
  );

  if (authResult.decision !== "ALLOW" && authResult.targetUrl) {
    const currentUrl = request.nextUrl.pathname + request.nextUrl.search;
    
    // Prevent redirect loops if already at target URL
    if (currentUrl !== authResult.targetUrl && pathname !== authResult.targetUrl) {
      const redirectUrl = new URL(authResult.targetUrl, request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes (/api/...)
     * - _next static & image optimization files
     * - static files (svg, png, jpg, jpeg, gif, webp, ico, css, js, woff, woff2)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)$).*)",
  ],
};
