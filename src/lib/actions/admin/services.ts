"use server";

// Pattern for all admin content actions:
//   requireSession() → coerce form data → prisma write → revalidateTag + admin path.
import { revalidatePath, updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { TAGS } from "@/lib/content";

function splitLines(v: FormDataEntryValue | null): string[] {
  return String(v ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function refresh() {
  updateTag(TAGS.services);
  revalidatePath("/admin/services");
}

export async function saveService(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const data = {
    position: Number(formData.get("position") ?? 1),
    number: String(formData.get("number") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim().toLowerCase().replace(/\s+/g, "-"),
    copy: String(formData.get("copy") ?? "").trim(),
    techTags: splitLines(formData.get("techTags")),
    timeline: String(formData.get("timeline") ?? "").trim(),
    priceInr: String(formData.get("priceInr") ?? "").trim(),
    priceUsd: String(formData.get("priceUsd") ?? "").trim(),
    published: formData.get("published") === "on",
  };
  if (!data.title || !data.slug) return;

  if (id) {
    await db.service.update({ where: { id }, data });
  } else {
    await db.service.create({ data });
  }
  refresh();
}

export async function deleteService(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.service.delete({ where: { id } });
  refresh();
}

export async function saveServiceFeature(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const serviceId = String(formData.get("serviceId") ?? "");
  const data = {
    position: Number(formData.get("position") ?? 1),
    title: String(formData.get("title") ?? "").trim(),
    copy: String(formData.get("copy") ?? "").trim(),
  };
  if (!data.title) return;
  if (id) {
    await db.serviceFeature.update({ where: { id }, data });
  } else if (serviceId) {
    await db.serviceFeature.create({ data: { ...data, serviceId } });
  }
  refresh();
}

export async function deleteServiceFeature(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.serviceFeature.delete({ where: { id } });
  refresh();
}
