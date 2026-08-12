"use server";

import { revalidatePath, updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { TAGS } from "@/lib/content";

const MAX_BYTES = 512 * 1024; // 512 KB — plenty for a logo or icon
const ALLOWED = ["image/png", "image/jpeg", "image/svg+xml", "image/webp", "image/x-icon", "image/vnd.microsoft.icon"];

/**
 * Turns an uploaded image into a data URI for storage on SiteSettings.
 * Returns undefined when no new file was chosen (leave the current one alone)
 * and null when the field should be cleared.
 */
async function fileToDataUri(file: FormDataEntryValue | null): Promise<string | null | undefined> {
  if (!(file instanceof File) || file.size === 0) return undefined;
  if (file.size > MAX_BYTES) return undefined;
  if (!ALLOWED.includes(file.type)) return undefined;
  const buffer = Buffer.from(await file.arrayBuffer());
  return `data:${file.type};base64,${buffer.toString("base64")}`;
}

export async function updateBrand(formData: FormData): Promise<void> {
  await requireSession("ADMIN");

  const logoUpload = await fileToDataUri(formData.get("logo"));
  const faviconUpload = await fileToDataUri(formData.get("favicon"));
  const scope = String(formData.get("floatingScope") ?? "mobile");

  const data = {
    wordmark: String(formData.get("wordmark") ?? "").trim() || "Supreme One Software",
    logoAlt: String(formData.get("logoAlt") ?? "").trim() || null,
    contactEmail: String(formData.get("contactEmail") ?? "").trim(),
    supportEmail: String(formData.get("supportEmail") ?? "").trim(),
    partnersEmail: String(formData.get("partnersEmail") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    whatsappNumber: String(formData.get("whatsappNumber") ?? "").trim(),
    whatsappMessage: String(formData.get("whatsappMessage") ?? "").trim(),
    whatsappEnabled: formData.get("whatsappEnabled") === "on",
    callEnabled: formData.get("callEnabled") === "on",
    floatingScope: ["all", "mobile", "off"].includes(scope) ? scope : "mobile",
    // A checked "remove" box wins over an upload in the same submission.
    ...(formData.get("removeLogo") === "on"
      ? { logoData: null }
      : logoUpload !== undefined
        ? { logoData: logoUpload }
        : {}),
    ...(formData.get("removeFavicon") === "on"
      ? { faviconData: null }
      : faviconUpload !== undefined
        ? { faviconData: faviconUpload }
        : {}),
  };

  await db.siteSettings.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  updateTag(TAGS.settings);
  revalidatePath("/admin/brand");
  revalidatePath("/", "layout");
}
