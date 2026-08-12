"use server";

// Admin content actions for FAQ groups + items:
//   requireSession() → coerce form data → prisma write → revalidateTag + admin path.
import { revalidatePath, updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { TAGS } from "@/lib/content";

function refresh() {
  updateTag(TAGS.faqs);
  revalidatePath("/admin/faqs");
}

// Groups are fixed (home / services / contact) — position and title only,
// no create or delete.
export async function saveFaqGroup(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const data = {
    position: Number(formData.get("position") ?? 1),
    title: String(formData.get("title") ?? "").trim(),
  };
  if (!id || !data.title) return;

  await db.faqGroup.update({ where: { id }, data });
  refresh();
}

export async function saveFaqItem(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const groupId = String(formData.get("groupId") ?? "");
  const data = {
    position: Number(formData.get("position") ?? 1),
    question: String(formData.get("question") ?? "").trim(),
    answer: String(formData.get("answer") ?? "").trim(),
    published: formData.get("published") === "on",
  };
  if (!data.question) return;

  if (id) {
    await db.faqItem.update({ where: { id }, data });
  } else if (groupId) {
    await db.faqItem.create({ data: { ...data, groupId } });
  }
  refresh();
}

export async function deleteFaqItem(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.faqItem.delete({ where: { id } });
  refresh();
}
