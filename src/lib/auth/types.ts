export type Role = "USER" | "ADMIN" | "SUPER_ADMIN";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role?: Role | string;
  requiresDeviceManagement?: boolean;
  image?: string | null;
}

export interface SessionData {
  user?: AuthUser;
  session?: Record<string, unknown>;
}

export type AuthorizationDecision = "ALLOW" | "REDIRECT_LOGIN" | "REDIRECT_403" | "REDIRECT_DEVICE_MGMT" | "REDIRECT_DASHBOARD";

export interface AuthorizationResult {
  decision: AuthorizationDecision;
  targetUrl?: string;
  reason?: string;
}

export interface RoutePermissionRule {
  pattern: string; // e.g. "/super-admin" or "/admin" or "/user"
  allowedRoles: Role[];
  exact?: boolean;
}
