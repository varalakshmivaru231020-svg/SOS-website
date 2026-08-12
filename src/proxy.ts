import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Convenience gate only — every server action and admin page re-checks the
// session itself; the proxy is never the security boundary.
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const token = req.cookies.get("nm_session")?.value;
  if (token && process.env.AUTH_SECRET) {
    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.AUTH_SECRET));
      return NextResponse.next();
    } catch {
      // invalid/expired token — fall through to redirect
    }
  }
  const login = new URL("/admin/login", req.url);
  login.searchParams.set("from", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin/:path*"],
};
