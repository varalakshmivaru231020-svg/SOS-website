import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";

export const SESSION_COOKIE = "nm_session";
const SESSION_DAYS = 7;

export type SessionUser = {
  sub: string;
  email: string;
  name: string;
  role: "ADMIN" | "EDITOR";
};

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(s);
}

export async function signSession(user: SessionUser): Promise<string> {
  return new SignJWT({ email: user.email, name: user.name, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secret());
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    if (!payload.sub || !payload.email) return null;
    return {
      sub: payload.sub,
      email: payload.email as string,
      name: (payload.name as string) ?? "",
      role: (payload.role as "ADMIN" | "EDITOR") ?? "EDITOR",
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/** Guard for server actions and admin pages. Redirects to login when absent. */
export async function requireSession(role?: "ADMIN"): Promise<SessionUser> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  if (role === "ADMIN" && session.role !== "ADMIN") redirect("/admin");
  return session;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  };
}
