import { NextResponse } from "next/server";

/**
 * Local / dev-only helper so teammates can call protected APIs from Postman
 * without copying browser cookies.
 *
 * Never set DEV_POSTMAN_API_KEY in production. Requires NODE_ENV === "development".
 */
const MIN_KEY_LENGTH = 32;

const DEV_IMPERSONATE_HINT =
  "DEV Postman: add header x-impersonate-user-id with your Clerk user id (user_...).";

export function isDevPostmanBypassRequest(req: Request): boolean {
  if (process.env.NODE_ENV !== "development") {
    return false;
  }
  const key = process.env.DEV_POSTMAN_API_KEY;
  if (!key || key.length < MIN_KEY_LENGTH) {
    return false;
  }
  return req.headers.get("x-postman-secret") === key;
}

/** Clerk user id, e.g. user_2abc... */
export function getDevImpersonatedUserId(req: Request): string | null {
  const raw = req.headers.get("x-impersonate-user-id")?.trim();
  if (!raw || !raw.startsWith("user_")) {
    return null;
  }
  return raw;
}

/** Use when `getClerkUserIdFromRequest` (or similar) returned null. */
export function unauthorizedApiResponse(req: Request): NextResponse {
  if (isDevPostmanBypassRequest(req) && !getDevImpersonatedUserId(req)) {
    return NextResponse.json({ message: DEV_IMPERSONATE_HINT }, { status: 400 });
  }
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}
