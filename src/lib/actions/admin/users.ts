"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";

function refresh() {
  revalidatePath("/admin/users");
}

/** True when the target is the last enabled admin — never lock the panel. */
async function isLastAdmin(targetId: string): Promise<boolean> {
  const target = await db.user.findUnique({ where: { id: targetId } });
  if (!target || target.role !== "ADMIN" || target.disabled) return false;
  const admins = await db.user.count({ where: { role: "ADMIN", disabled: false } });
  return admins <= 1;
}

export async function createUser(formData: FormData): Promise<void> {
  await requireSession("ADMIN");
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const role = formData.get("role") === "ADMIN" ? "ADMIN" : "EDITOR";
  if (!email || !name || password.length < 8) return;
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return;
  await db.user.create({ data: { email, name, passwordHash: await bcrypt.hash(password, 12), role } });
  refresh();
}

export async function setUserRole(formData: FormData): Promise<void> {
  const session = await requireSession("ADMIN");
  const id = String(formData.get("id") ?? "");
  const role = formData.get("role") === "ADMIN" ? "ADMIN" : "EDITOR";
  if (!id || id === session.sub) return; // never change your own role
  if (role === "EDITOR" && (await isLastAdmin(id))) return;
  await db.user.update({ where: { id }, data: { role } });
  refresh();
}

export async function setUserDisabled(formData: FormData): Promise<void> {
  const session = await requireSession("ADMIN");
  const id = String(formData.get("id") ?? "");
  const disabled = formData.get("disabled") === "true";
  if (!id || id === session.sub) return; // never disable yourself
  if (disabled && (await isLastAdmin(id))) return;
  await db.user.update({ where: { id }, data: { disabled } });
  refresh();
}

export async function resetPassword(formData: FormData): Promise<void> {
  await requireSession("ADMIN");
  const id = String(formData.get("id") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!id || password.length < 8) return;
  await db.user.update({ where: { id }, data: { passwordHash: await bcrypt.hash(password, 12) } });
  refresh();
}

export async function deleteUser(formData: FormData): Promise<void> {
  const session = await requireSession("ADMIN");
  const id = String(formData.get("id") ?? "");
  if (!id || id === session.sub) return; // never delete yourself
  if (await isLastAdmin(id)) return;
  await db.user.delete({ where: { id } });
  refresh();
}
