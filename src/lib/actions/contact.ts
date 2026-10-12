"use server";

import { headers } from "next/headers";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { sendEnquiryNotification } from "@/lib/email";
import { getSettings } from "@/lib/content";
import { INTEREST_LABELS } from "@/content";

export type ContactField = "name" | "email" | "phone" | "company" | "interest" | "message" | "form";
export type ContactState = {
  ok: boolean | null;
  errors?: Partial<Record<ContactField, string>>;
  /** Echoed back on error: React resets the form after an action, and the
   *  fields re-fill from these defaults instead of coming back empty. */
  values?: Partial<Record<(typeof ECHO)[number], string>>;
};

const ECHO = ["name", "email", "phone", "company", "interest", "message"] as const;

const MIN_FILL_MS = 2500;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  const userAgent = h.get("user-agent") ?? undefined;

  const field = (k: string) => formData.get(k) ?? undefined;
  const values = Object.fromEntries(ECHO.map((k) => [k, String(formData.get(k) ?? "")]));

  if (!rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000)) {
    return { ok: false, values, errors: { form: "Too many messages from this connection — please try again in an hour." } };
  }

  const parsed = contactSchema.safeParse({
    name: field("name"),
    email: field("email"),
    phone: field("phone"),
    company: field("company"),
    interest: field("interest"),
    message: field("message"),
    source: field("source"),
    website: field("website"),
    ts: field("ts"),
  });

  if (!parsed.success) {
    // Honeypot tripped — pretend success, store nothing.
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return { ok: true };
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      // A missing time stamp means the page script never ran; there is no
      // field to point at, so it surfaces as a form-level message.
      const key = (issue.path[0] === "ts" ? "form" : issue.path[0]) as ContactField;
      const message = key === "form" ? "Something went wrong — please reload the page and try again." : issue.message;
      if (key && !errors[key]) errors[key] = message;
    }
    return { ok: false, values, errors };
  }

  const { name, email, phone, company, interest, message, source, website, ts } = parsed.data;

  // Honeypot filled or form submitted inhumanly fast → drop silently.
  if (website || Date.now() - ts < MIN_FILL_MS) {
    return { ok: true };
  }

  const need = INTEREST_LABELS[interest] ?? interest;
  await db.contactSubmission.create({
    data: {
      name,
      email,
      phone: phone || null,
      company: company || null,
      need,
      brief: message ?? "",
      source: source || null,
      ip,
      userAgent,
    },
  });

  // Never fails the request — the enquiry is already stored.
  const settings = await getSettings();
  await sendEnquiryNotification(settings.contactEmail, {
    name,
    email,
    phone,
    company,
    need,
    brief: message ?? "",
    source,
  });

  return { ok: true };
}
