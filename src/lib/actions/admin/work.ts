"use server";

// Admin content actions for case studies:
//   requireSession() → coerce form data → prisma write → revalidateTag + admin path.
import { revalidatePath, updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { TAGS, type Metric } from "@/lib/content";

function splitLines(v: FormDataEntryValue | null): string[] {
  return String(v ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

// One metric per line as "value | label".
function splitMetrics(v: FormDataEntryValue | null): Metric[] {
  return splitLines(v)
    .map((line) => {
      const [value = "", ...rest] = line.split("|");
      return { value: value.trim(), label: rest.join("|").trim() };
    })
    .filter((m) => m.value && m.label);
}

function refresh() {
  updateTag(TAGS.work);
  revalidatePath("/admin/work");
}

export async function saveCaseStudy(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const data = {
    position: Number(formData.get("position") ?? 1),
    slug: String(formData.get("slug") ?? "").trim().toLowerCase().replace(/\s+/g, "-"),
    client: String(formData.get("client") ?? "").trim(),
    tags: splitLines(formData.get("tags")),
    copy: String(formData.get("copy") ?? "").trim(),
    metrics: splitMetrics(formData.get("metrics")),
    published: formData.get("published") === "on",
  };
  if (!data.client || !data.slug) return;

  if (id) {
    await db.caseStudy.update({ where: { id }, data });
  } else {
    await db.caseStudy.create({ data });
  }
  refresh();
}

export async function deleteCaseStudy(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.caseStudy.delete({ where: { id } });
  refresh();
}
