"use server";

// Admin actions for the small shared collections ("site blocks"): the home
// page proof strip, client logos and testimonials.
// Pattern: requireSession() → coerce form data → prisma write → revalidateTag + admin path.
import { revalidatePath, updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { TAGS } from "@/lib/content";

function refresh(tag: string) {
  updateTag(tag);
  revalidatePath("/admin/site-blocks");
}

// ── Proof strip (hero stats) ──────────────────────────────────────────────────────

export async function saveHeroStat(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const data = {
    position: Number(formData.get("position") ?? 1),
    value: String(formData.get("value") ?? "").trim(),
    label: String(formData.get("label") ?? "").trim(),
  };
  if (!data.value || !data.label) return;
  if (id) {
    await db.heroStat.update({ where: { id }, data });
  } else {
    await db.heroStat.create({ data });
  }
  refresh(TAGS.blocks);
}

export async function deleteHeroStat(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.heroStat.delete({ where: { id } });
  refresh(TAGS.blocks);
}

// ── Client logos ────────────────────────────────────────────────────

export async function saveClientLogo(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const data = {
    position: Number(formData.get("position") ?? 1),
    name: String(formData.get("name") ?? "").trim(),
  };
  if (!data.name) return;
  if (id) {
    await db.clientLogo.update({ where: { id }, data });
  } else {
    await db.clientLogo.create({ data });
  }
  refresh(TAGS.blocks);
}

export async function deleteClientLogo(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.clientLogo.delete({ where: { id } });
  refresh(TAGS.blocks);
}

// ── Testimonials ────────────────────────────────────────────────────
// The featured one appears on the home page; all of them on /customers.

export async function saveTestimonial(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const data = {
    quote: String(formData.get("quote") ?? "").trim(),
    author: String(formData.get("author") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    featured: formData.get("featured") === "on",
  };
  if (!data.quote || !data.author) return;
  // One featured quote at a time — featuring this one un-features the rest.
  if (data.featured) await db.testimonial.updateMany({ where: id ? { NOT: { id } } : {}, data: { featured: false } });
  if (id) {
    await db.testimonial.update({ where: { id }, data });
  } else {
    await db.testimonial.create({ data });
  }
  refresh(TAGS.blocks);
}

export async function deleteTestimonial(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.testimonial.delete({ where: { id } });
  refresh(TAGS.blocks);
}
