/**
 * Security utility to sanitize redirect URLs and prevent Open Redirect vulnerabilities.
 */

/**
 * Validates whether a target URL string is a safe relative path.
 * Disallows absolute URLs, scheme-relative URLs (e.g. //attacker.com), backslashes,
 * and external domains.
 */
export function isSafeRelativeUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== "string") {
    return false;
  }

  const trimmed = url.trim();

  // Must start with a single slash '/'
  if (!trimmed.startsWith("/")) {
    return false;
  }

  // Must NOT start with '//' (protocol relative URL) or '/\'
  if (trimmed.startsWith("//") || trimmed.startsWith("/\\") || trimmed.startsWith("/%5C")) {
    return false;
  }

  // Prohibit control characters, CRLF injection
  if (/[\r\n\0]/.test(trimmed)) {
    return false;
  }

  // Try parsing URL relative to dummy origin to ensure pathname remains strictly relative
  try {
    const dummyOrigin = "http://localhost:3000";
    const parsed = new URL(trimmed, dummyOrigin);
    // If the parsed origin does not match dummy origin, it attempted an absolute redirect
    if (parsed.origin !== dummyOrigin) {
      return false;
    }
  } catch {
    return false;
  }

  return true;
}

/**
 * Sanitizes and returns a safe callback URL. If the provided candidate URL
 * is invalid or an open redirect attempt, returns fallback.
 */
export function getSafeCallbackUrl(candidateUrl?: string | null, fallback = "/"): string {
  if (candidateUrl && isSafeRelativeUrl(candidateUrl)) {
    return candidateUrl.trim();
  }
  return fallback;
}
