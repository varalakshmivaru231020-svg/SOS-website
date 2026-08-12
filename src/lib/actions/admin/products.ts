"use server";

// Admin content actions for Products:
//   requireSession() → coerce form data → prisma write → revalidateTag + admin path.
import { revalidatePath, updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { TAGS } from "@/lib/content";
import type { Metric } from "@/lib/content";

function splitLines(v: FormDataEntryValue | null): string[] {
  return String(v ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseMetrics(v: FormDataEntryValue | null): Metric[] {
  return splitLines(v)
    .map((line) => {
      const [value = "", label = ""] = line.split("|").map((s) => s.trim());
      return { value, label };
    })
    .filter((m) => m.value && m.label);
}

function refresh() {
  updateTag(TAGS.products);
  revalidatePath("/admin/products");
}

export async function saveProduct(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const badge = String(formData.get("badge") ?? "").trim();
  const data = {
    position: Number(formData.get("position") ?? 1),
    slug: String(formData.get("slug") ?? "").trim().toLowerCase().replace(/\s+/g, "-"),
    badge: badge || null,
    title: String(formData.get("title") ?? "").trim(),
    copy: String(formData.get("copy") ?? "").trim(),
    bullets: splitLines(formData.get("bullets")),
    metrics: parseMetrics(formData.get("metrics")),
    visualKey: String(formData.get("visualKey") ?? "").trim(),
    published: formData.get("published") === "on",
  };
  if (!data.title || !data.slug) return;

  if (id) {
    await db.product.update({ where: { id }, data });
  } else {
    await db.product.create({ data });
  }
  refresh();
}

export async function deleteProduct(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.product.delete({ where: { id } });
  refresh();
}
