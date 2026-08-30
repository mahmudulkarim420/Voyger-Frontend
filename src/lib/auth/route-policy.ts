import { Role, AuthorizationResult, RoutePermissionRule } from "./types";
import { getSafeCallbackUrl } from "../security/safe-redirect";

/**
 * Public routes accessible to everyone without authentication.
 */
export const PUBLIC_ROUTES = [
  "/",
  "/products",
  "/product",
  "/cart",
  "/checkout",
  "/contact",
  "/faq",
  "/find-store",
  "/privacy-policy",
  "/terms-of-service",
  "/refund-policy",
  "/shipping-policy",
  "/shop",
  "/search",
] as const;

/**
 * Authentication pages (login/register).
 */
export const AUTH_PAGE_ROUTES = ["/login", "/register"] as const;

/**
 * Centralized Route Permission Policy.
 * Higher authority policies (e.g. /super-admin) are evaluated first.
 */
export const ROUTE_PERMISSION_RULES: RoutePermissionRule[] = [
  {
    pattern: "/super-admin",
    allowedRoles: ["SUPER_ADMIN"],
  },
  {
    pattern: "/admin",
    allowedRoles: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    pattern: "/user",
    allowedRoles: ["USER", "ADMIN", "SUPER_ADMIN"],
  },
  {
    pattern: "/device-limit",
    allowedRoles: ["USER", "ADMIN", "SUPER_ADMIN"],
  },
];

/**
 * Normalize role string to match Role enum strictly.
 */
export function normalizeRole(rawRole?: string | null): Role {
  if (!rawRole) return "USER";
  const cleaned = rawRole.toString().trim().toUpperCase().replace(/[-_]/g, "");
  if (cleaned === "SUPERADMIN") return "SUPER_ADMIN";
  if (cleaned === "ADMIN") return "ADMIN";
  return "USER";
}

/**
 * Determine the user's default dashboard route based on their role.
 */
export function getDashboardRoute(rawRole?: string | null): string {
  const role = normalizeRole(rawRole);
  if (role === "SUPER_ADMIN") return "/super-admin";
  if (role === "ADMIN") return "/admin";
  return "/user";
}

/**
 * Check if a path matches a protected route prefix.
 */
export function findMatchingRouteRule(pathname: string): RoutePermissionRule | undefined {
  // Clean trailing slashes & normalize path
  const normalizedPath = pathname.toLowerCase();
  
  return ROUTE_PERMISSION_RULES.find((rule) => {
    const pattern = rule.pattern.toLowerCase();
    return normalizedPath === pattern || normalizedPath.startsWith(`${pattern}/`);
  });
}

/**
 * Authoritative single evaluation function for route access control.
 */
export function authorizeRoute(
  pathname: string,
  isAuthenticated: boolean,
  rawRole?: string | null,
  requiresDeviceManagement?: boolean,
  callbackUrlParam?: string | null
): AuthorizationResult {
  const role = normalizeRole(rawRole);
  const isAuthPage = AUTH_PAGE_ROUTES.some(
    (page) => pathname === page || pathname.startsWith(`${page}/`)
  );

  // 1. Device Limit Enforcement
  if (isAuthenticated && requiresDeviceManagement === true) {
    if (pathname !== "/device-limit" && !isAuthPage) {
      return {
        decision: "REDIRECT_DEVICE_MGMT",
        targetUrl: "/device-limit",
        reason: "Device limit threshold exceeded",
      };
    }
  }

  if (isAuthenticated && requiresDeviceManagement === false && pathname === "/device-limit") {
    return {
      decision: "REDIRECT_DASHBOARD",
      targetUrl: getDashboardRoute(role),
      reason: "Device management not required",
    };
  }

  // 2. Auth Page Access Control for Logged-In Users
  if (isAuthPage) {
    if (isAuthenticated) {
      // If a safe callback URL was specified, navigate there instead of default dashboard
      const safeCallback = getSafeCallbackUrl(callbackUrlParam, getDashboardRoute(role));
      return {
        decision: "REDIRECT_DASHBOARD",
        targetUrl: safeCallback,
        reason: "User already authenticated",
      };
    }
    return { decision: "ALLOW" };
  }

  // 3. Protected Route Evaluation
  const matchingRule = findMatchingRouteRule(pathname);

  if (matchingRule) {
    if (!isAuthenticated) {
      const loginUrl = `/login?callbackUrl=${encodeURIComponent(pathname)}`;
      return {
        decision: "REDIRECT_LOGIN",
        targetUrl: loginUrl,
        reason: "Unauthenticated request to protected route",
      };
    }

    const isAllowed = matchingRule.allowedRoles.includes(role);
    if (!isAllowed) {
      return {
        decision: "REDIRECT_403",
        targetUrl: "/403",
        reason: `Role '${role}' not authorized for path '${pathname}'`,
      };
    }

    return { decision: "ALLOW" };
  }

  // 4. Public Route Access
  return { decision: "ALLOW" };
}
