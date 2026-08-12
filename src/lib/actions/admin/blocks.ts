"use server";

// Admin actions for the small home/shared collections ("site blocks").
// Pattern: requireSession() → coerce form data → prisma write → revalidateTag + admin path.
import { revalidatePath, updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { TAGS } from "@/lib/content";

function refresh(tag: string) {
  updateTag(tag);
  revalidatePath("/admin/site-blocks");
}

// ── Hero stats ──────────────────────────────────────────────────────

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

// ── Industries ──────────────────────────────────────────────────────

export async function saveIndustry(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const blurb = String(formData.get("blurb") ?? "").trim();
  const data = {
    position: Number(formData.get("position") ?? 1),
    name: String(formData.get("name") ?? "").trim(),
    blurb: blurb || null,
    showOnHome: formData.get("showOnHome") === "on",
  };
  if (!data.name) return;
  if (id) {
    await db.industry.update({ where: { id }, data });
  } else {
    await db.industry.create({ data });
  }
  refresh(TAGS.blocks);
}

export async function deleteIndustry(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.industry.delete({ where: { id } });
  refresh(TAGS.blocks);
}

// ── Use cases ───────────────────────────────────────────────────────

export async function saveUseCase(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const data = {
    position: Number(formData.get("position") ?? 1),
    title: String(formData.get("title") ?? "").trim(),
    copy: String(formData.get("copy") ?? "").trim(),
  };
  if (!data.title) return;
  if (id) {
    await db.useCase.update({ where: { id }, data });
  } else {
    await db.useCase.create({ data });
  }
  refresh(TAGS.blocks);
}

export async function deleteUseCase(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.useCase.delete({ where: { id } });
  refresh(TAGS.blocks);
}

// ── Comparison rows ─────────────────────────────────────────────────

export async function saveComparisonRow(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const data = {
    position: Number(formData.get("position") ?? 1),
    feature: String(formData.get("feature") ?? "").trim(),
    northmark: String(formData.get("northmark") ?? "").trim(),
    typical: String(formData.get("typical") ?? "").trim(),
  };
  if (!data.feature) return;
  if (id) {
    await db.comparisonRow.update({ where: { id }, data });
  } else {
    await db.comparisonRow.create({ data });
  }
  refresh(TAGS.blocks);
}

export async function deleteComparisonRow(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.comparisonRow.delete({ where: { id } });
  refresh(TAGS.blocks);
}

// ── Trust badges ────────────────────────────────────────────────────

export async function saveTrustBadge(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const sublabel = String(formData.get("sublabel") ?? "").trim();
  const data = {
    position: Number(formData.get("position") ?? 1),
    label: String(formData.get("label") ?? "").trim(),
    sublabel: sublabel || null,
  };
  if (!data.label) return;
  if (id) {
    await db.trustBadge.update({ where: { id }, data });
  } else {
    await db.trustBadge.create({ data });
  }
  refresh(TAGS.blocks);
}

export async function deleteTrustBadge(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.trustBadge.delete({ where: { id } });
  refresh(TAGS.blocks);
}

// ── Testimonial (single featured row, save only) ────────────────────

export async function saveTestimonial(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const data = {
    quote: String(formData.get("quote") ?? "").trim(),
    author: String(formData.get("author") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
  };
  if (!data.quote || !data.author) return;
  if (id) {
    await db.testimonial.update({ where: { id }, data });
  } else {
    await db.testimonial.create({ data: { ...data, featured: true } });
  }
  refresh(TAGS.blocks);
}

// ── Tech stack ──────────────────────────────────────────────────────

export async function saveTechStackItem(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const data = {
    position: Number(formData.get("position") ?? 1),
    name: String(formData.get("name") ?? "").trim(),
    blurb: String(formData.get("blurb") ?? "").trim(),
  };
  if (!data.name) return;
  if (id) {
    await db.techStackItem.update({ where: { id }, data });
  } else {
    await db.techStackItem.create({ data });
  }
  refresh(TAGS.stack);
}

export async function deleteTechStackItem(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.techStackItem.delete({ where: { id } });
  refresh(TAGS.stack);
}

// ── Quality gates ───────────────────────────────────────────────────

export async function saveQualityGate(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const data = {
    position: Number(formData.get("position") ?? 1),
    title: String(formData.get("title") ?? "").trim(),
    copy: String(formData.get("copy") ?? "").trim(),
  };
  if (!data.title) return;
  if (id) {
    await db.qualityGate.update({ where: { id }, data });
  } else {
    await db.qualityGate.create({ data });
  }
  refresh(TAGS.quality);
}

export async function deleteQualityGate(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.qualityGate.delete({ where: { id } });
  refresh(TAGS.quality);
}
