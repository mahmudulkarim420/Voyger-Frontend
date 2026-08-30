/**
 * Account-related route prefixes.
 * When the user is on any of these routes, the navbar switches
 * from Collection/Category links to Quick Access (account) links.
 */
export const ACCOUNT_ROUTE_PREFIXES = [
  "/profile",
  "/orders",
  "/super-admin",
  "/admin",
  "/user",
  "/account",
  "/settings",
] as const;

import { getDashboardRoute } from "./auth/route-policy";
export { getDashboardRoute };

/**
 * Check whether the current pathname belongs to the account section.
 */
export function isAccountRoute(pathname: string): boolean {
  return ACCOUNT_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export interface QuickAccessItem {
  name: string;
  href: string;
}

export const quickAccessLinks: QuickAccessItem[] = [
  { name: "Home", href: "/" },
  { name: "Sign In / Sign Up", href: "/login" },
  { name: "Profile", href: "/profile" },
  { name: "Orders", href: "/orders" },
];

