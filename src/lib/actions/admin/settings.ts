"use server";

// Admin-only singleton + per-route settings actions:
//   requireSession("ADMIN") → coerce form data → prisma write → revalidateTag + admin path.
import { revalidatePath, updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { TAGS } from "@/lib/content";

// Keep in sync with the swatches on /admin/appearance ("use server" files may
// only export async functions, so this stays module-private).
const ACCENT_PRESETS: Record<string, string> = {
  terracotta: "#b8502a",
  moss: "#1c7d55",
  indigo: "#2b3a8f",
  plum: "#7a3ea8",
};

function normalizeHex(v: FormDataEntryValue | null): string | null {
  const raw = String(v ?? "").trim();
  if (!raw) return null;
  const hex = raw.startsWith("#") ? raw : `#${raw}`;
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex) ? hex.toLowerCase() : null;
}

export async function updateSiteSettings(formData: FormData): Promise<void> {
  await requireSession("ADMIN");

  const preset = String(formData.get("accentPreset") ?? "terracotta");
  const custom = normalizeHex(formData.get("accentCustom"));
  const accentPreset = custom ? "custom" : preset in ACCENT_PRESETS ? preset : "terracotta";
  const accentColor = custom ?? ACCENT_PRESETS[accentPreset] ?? ACCENT_PRESETS.terracotta;

  const rawMotion = Number(formData.get("motionIntensity"));
  const motionIntensity = Number.isFinite(rawMotion) ? Math.min(1.6, Math.max(0, rawMotion)) : 1;

  const data = {
    accentPreset,
    accentColor,
    motionIntensity,
    cursorEffects: formData.get("cursorEffects") === "on",
    orgName: String(formData.get("orgName") ?? "").trim() || "Supreme One Software Pvt Ltd",
    tagline: String(formData.get("tagline") ?? "").trim(),
    contactEmail: String(formData.get("contactEmail") ?? "").trim(),
    footerNote: String(formData.get("footerNote") ?? "").trim(),
  };

  await db.siteSettings.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  updateTag(TAGS.settings);
  revalidatePath("/admin/appearance");
}

export async function savePageSeo(formData: FormData): Promise<void> {
  await requireSession("ADMIN");

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const data = {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    ogTitle: String(formData.get("ogTitle") ?? "").trim() || null,
    ogDescription: String(formData.get("ogDescription") ?? "").trim() || null,
    noindex: formData.get("noindex") === "on",
  };

  await db.pageSeo.update({ where: { id }, data });

  updateTag(TAGS.seo);
  revalidatePath("/admin/seo");
}
