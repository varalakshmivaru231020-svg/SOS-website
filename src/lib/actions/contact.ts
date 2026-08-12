"use server";

import { headers } from "next/headers";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { sendEnquiryNotification } from "@/lib/email";
import { getSettings } from "@/lib/content";

export type ContactState = {
  ok: boolean | null;
  errors?: Partial<Record<"name" | "email" | "company" | "need" | "brief" | "form", string>>;
};

const MIN_FILL_MS = 2500;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  const userAgent = h.get("user-agent") ?? undefined;

  if (!rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000)) {
    return { ok: false, errors: { form: "Too many messages from this connection — please try again in an hour." } };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    need: formData.get("need"),
    brief: formData.get("brief"),
    website: formData.get("website"),
    ts: formData.get("ts"),
  });

  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactState["errors"]>;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    // Honeypot tripped — pretend success, store nothing.
    if (errors.form === undefined && parsed.error.issues.some((i) => i.path[0] === "website")) {
      return { ok: true };
    }
    return { ok: false, errors };
  }

  const { name, email, company, need, brief, website, ts } = parsed.data;

  // Honeypot filled or form submitted inhumanly fast → drop silently.
  if (website || Date.now() - ts < MIN_FILL_MS) {
    return { ok: true };
  }

  await db.contactSubmission.create({
    data: { name, email, company: company || null, need, brief, ip, userAgent },
  });

  // Fire-and-forget: never fails the request — the enquiry is already stored.
  const settings = await getSettings();
  await sendEnquiryNotification(settings.contactEmail, { name, email, company, need, brief });

  return { ok: true };
}
