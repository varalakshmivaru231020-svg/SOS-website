"use server";

// Inbox actions: requireSession() → coerce form data → prisma write → revalidate
// the admin paths. The inbox never feeds public pages, so no revalidateTag here.
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";

type Status = "NEW" | "READ" | "ARCHIVED";

function asStatus(v: FormDataEntryValue | null): Status | null {
  const s = String(v ?? "");
  return s === "NEW" || s === "READ" || s === "ARCHIVED" ? s : null;
}

function refresh() {
  revalidatePath("/admin/inbox");
  revalidatePath("/admin");
}

export async function setSubmissionStatus(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const status = asStatus(formData.get("status"));
  if (!id || !status) return;

  await db.contactSubmission.update({ where: { id }, data: { status } });
  refresh();
}

export async function bulkMarkRead(_formData: FormData): Promise<void> {
  await requireSession();
  await db.contactSubmission.updateMany({
    where: { status: "NEW" },
    data: { status: "READ" },
  });
  refresh();
}

export async function deleteSubmission(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (id) await db.contactSubmission.delete({ where: { id } });
  refresh();
}
