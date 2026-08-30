# Authorization & Access Control Architecture

This document provides the authoritative specification for authentication, route protection, role-based access control (RBAC), and session security in the **VOYΛGE** Next.js application.

---

## 1. Authentication Architecture & Session Verification

- **Auth Framework**: [Better Auth](https://www.better-auth.com/) (`better-auth/react`).
- **Session Tokens**: Stored as HttpOnly cookies (`better-auth.session_token` / `better-auth.session_token.sig`).
- **Middleware Proxy Layer**: Centralized request interception executed via `src/middleware.ts`.
- **Session Resolution**: Middleware validates session cookies on every request against the backend auth service (`/api/v1/auth/get-session`), retrieving authenticated user details and assigned `role`.

---

## 2. Role Hierarchy & Permission Matrix

| Role | Role Code | Accessible Route Prefixes | Access Restrictions |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `SUPER_ADMIN` | `/super-admin/**`<br>`/admin/**`<br>`/user/**` | Full platform administrative access. |
| **Admin** | `ADMIN` | `/admin/**`<br>`/user/**` | Strictly **blocked** from `/super-admin/**` (Redirects to `/403`). |
| **Customer** | `USER` | `/user/**` | Strictly **blocked** from `/admin/**` and `/super-admin/**` (Redirects to `/403`). |
| **Unauthenticated** | `null` | Public storefront routes | **Blocked** from `/user/**`, `/admin/**`, `/super-admin/**` (Redirects to `/login`). |

---

## 3. Centralized Route Authorization Policy

All route permission policies are centrally declared in [`src/lib/auth/route-policy.ts`](file:///home/dictatorprem/Downloads/Programming/Voyger-Frontend/src/lib/auth/route-policy.ts).

### Public Routes
The following routes are accessible without an active session:
- `/`, `/products/**`, `/product/**`, `/cart`, `/checkout`, `/contact`, `/faq`, `/find-store`
- `/privacy-policy`, `/terms-of-service`, `/refund-policy`, `/shipping-policy`, `/shop/**`, `/search`

### Authentication Pages
- `/login`, `/register`
- **Authenticated Access Control**: If an authenticated user attempts to visit `/login` or `/register`, they are automatically redirected to their role's default dashboard (or a sanitized `callbackUrl`).

---

## 4. 401 Unauthorized vs 403 Forbidden Behavior

### 401 Unauthorized
- **Trigger**: An unauthenticated user attempts to visit a protected route (`/user/**`, `/admin/**`, `/super-admin/**`).
- **Action**: Intercepted at proxy layer (`src/middleware.ts`) and redirected to `/login?callbackUrl=<safe_requested_path>`.

### 403 Forbidden
- **Trigger**: An authenticated user attempts to visit a route outside their authorized role scope (e.g. `USER` visiting `/admin` or `ADMIN` visiting `/super-admin`).
- **Action**: Intercepted at proxy layer (`src/middleware.ts`) and redirected to the dedicated [`/403`](file:///home/dictatorprem/Downloads/Programming/Voyger-Frontend/src/app/403/page.tsx) Forbidden page.

---

## 5. Callback URL Security & Open Redirect Prevention

All post-login callbacks are validated via [`src/lib/security/safe-redirect.ts`](file:///home/dictatorprem/Downloads/Programming/Voyger-Frontend/src/lib/security/safe-redirect.ts) (`getSafeCallbackUrl`):
- Accepts **only relative paths** starting with `/`.
- Prohibits protocol-relative URLs (`//attacker.com`), backslashes (`/\`), CRLF injection, and absolute external domains.
- Malicious candidates automatically fallback to the user's default role dashboard.

---

## 6. Resource Ownership & Backend Security Boundaries

> [!IMPORTANT]
> The frontend proxy enforces **Route-Level Authorization** (ensuring customers cannot reach admin panels).
> **Resource-Level Ownership** (e.g., verifying User A cannot view User B's order at `/user/orders/123`) is strictly enforced at the backend API layer.
>
> All frontend API requests issued via [`fetchApi`](file:///home/dictatorprem/Downloads/Programming/Voyger-Frontend/src/lib/api.ts) automatically include credentials (`credentials: 'include'`). The backend verifies session user ownership before returning individual resource records.

---

## 7. Operational Guides

### How to Add a New Protected Route
1. Open [`src/lib/auth/route-policy.ts`](file:///home/dictatorprem/Downloads/Programming/Voyger-Frontend/src/lib/auth/route-policy.ts).
2. Add a new rule entry to `ROUTE_PERMISSION_RULES`:
   ```ts
   {
     pattern: "/vendor",
     allowedRoles: ["ADMIN", "SUPER_ADMIN"],
   }
   ```

### How to Add a New Role
1. Update `Role` type in [`src/lib/auth/types.ts`](file:///home/dictatorprem/Downloads/Programming/Voyger-Frontend/src/lib/auth/types.ts).
2. Update `normalizeRole()` and `getDashboardRoute()` in [`src/lib/auth/route-policy.ts`](file:///home/dictatorprem/Downloads/Programming/Voyger-Frontend/src/lib/auth/route-policy.ts).
3. Assign allowed route prefixes in `ROUTE_PERMISSION_RULES`.
