"use server";

// Admin actions for the Pricing screen:
//   requireSession() → coerce form data → prisma write → revalidateTag + admin path.
import { revalidatePath, updateTag } from "next/cache";
import type { PricingSet } from "@prisma/client";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { TAGS } from "@/lib/content";

const SETS = ["ENGAGEMENT", "PLATFORM"] as const;

function splitLines(v: FormDataEntryValue | null): string[] {
  return String(v ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function refresh() {
  updateTag(TAGS.pricing);
  revalidatePath("/admin/pricing");
}

export async function savePricingTier(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const rawSet = String(formData.get("set") ?? "");
  if (!(SETS as readonly string[]).includes(rawSet)) return;
  const set = rawSet as PricingSet;

  const data = {
    set,
    position: Number(formData.get("position") ?? 1),
    name: String(formData.get("name") ?? "").trim(),
    price: String(formData.get("price") ?? "").trim(),
    priceNote: String(formData.get("priceNote") ?? "").trim() || null,
    blurb: String(formData.get("blurb") ?? "").trim(),
    features: splitLines(formData.get("features")),
    ctaLabel: String(formData.get("ctaLabel") ?? "").trim(),
    highlighted: formData.get("highlighted") === "on",
    published: formData.get("published") === "on",
  };
  if (!data.name) return;

  if (id) {
    await db.pricingTier.update({ where: { id }, data });
  } else {
    await db.pricingTier.create({ data });
  }
  refresh();
}

export async function deletePricingTier(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.pricingTier.delete({ where: { id } });
  refresh();
}
