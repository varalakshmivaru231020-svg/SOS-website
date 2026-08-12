"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signSession, sessionCookieOptions, SESSION_COOKIE } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  if (!rateLimit(`login:${ip}`, 5, 15 * 60 * 1000)) {
    return { error: "Too many attempts — try again in 15 minutes." };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/admin");

  if (!email || !password) return { error: "Email and password are required." };

  const user = await db.user.findUnique({ where: { email } });
  // Always compare against something to keep timing uniform.
  const hash = user?.passwordHash ?? "$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinv";
  const valid = await bcrypt.compare(password, hash);
  if (!user || !valid || user.disabled) {
    return { error: "Wrong email or password." };
  }

  const token = await signSession({ sub: user.id, email: user.email, name: user.name, role: user.role });
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, sessionCookieOptions());
  await db.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

  redirect(from.startsWith("/admin") ? from : "/admin");
}

export async function logout(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
