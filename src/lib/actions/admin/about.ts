"use server";

// Admin actions for the About page content: team members, offices, timeline.
// Pattern: requireSession() → coerce form data → prisma write → revalidateTag + admin path.
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

function refreshTeam() {
  updateTag(TAGS.team);
  revalidatePath("/admin/about");
}

function refreshOffices() {
  updateTag(TAGS.offices);
  revalidatePath("/admin/about");
}

function refreshTimeline() {
  updateTag(TAGS.timeline);
  revalidatePath("/admin/about");
}

// ── Team ────────────────────────────────────────────────────────────

export async function saveTeamMember(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const photoUrl = String(formData.get("photoUrl") ?? "").trim();
  const data = {
    position: Number(formData.get("position") ?? 1),
    name: String(formData.get("name") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    bio: String(formData.get("bio") ?? "").trim(),
    photoUrl: photoUrl || null,
    published: formData.get("published") === "on",
  };
  if (!data.name) return;

  if (id) {
    await db.teamMember.update({ where: { id }, data });
  } else {
    await db.teamMember.create({ data });
  }
  refreshTeam();
}

export async function deleteTeamMember(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.teamMember.delete({ where: { id } });
  refreshTeam();
}

// ── Offices ─────────────────────────────────────────────────────────

export async function saveOffice(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const tag = String(formData.get("tag") ?? "").trim();
  const data = {
    position: Number(formData.get("position") ?? 1),
    city: String(formData.get("city") ?? "").trim(),
    country: String(formData.get("country") ?? "").trim(),
    addressLines: splitLines(formData.get("addressLines")),
    tag: tag || null,
    published: formData.get("published") === "on",
  };
  if (!data.city) return;

  if (id) {
    await db.office.update({ where: { id }, data });
  } else {
    await db.office.create({ data });
  }
  refreshOffices();
}

export async function deleteOffice(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.office.delete({ where: { id } });
  refreshOffices();
}

// ── Timeline ────────────────────────────────────────────────────────

export async function saveTimelineEntry(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const data = {
    position: Number(formData.get("position") ?? 1),
    year: String(formData.get("year") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    copy: String(formData.get("copy") ?? "").trim(),
    published: formData.get("published") === "on",
  };
  if (!data.year) return;

  if (id) {
    await db.timelineEntry.update({ where: { id }, data });
  } else {
    await db.timelineEntry.create({ data });
  }
  refreshTimeline();
}

export async function deleteTimelineEntry(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.timelineEntry.delete({ where: { id } });
  refreshTimeline();
}
