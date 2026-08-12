import "server-only";

type EnquiryEmail = {
  name: string;
  email: string;
  company?: string | null;
  need: string;
  brief: string;
};

/**
 * Sends the enquiry notification via Resend's REST API when RESEND_API_KEY is
 * configured; otherwise logs and returns. Never throws — the submission is
 * already stored before this runs, so email failure must not fail the request.
 */
export async function sendEnquiryNotification(to: string, enquiry: EnquiryEmail): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "Supreme One Software <onboarding@resend.dev>";
  if (!key) {
    console.log("[email] RESEND_API_KEY not set — enquiry stored, notification skipped:", enquiry.email);
    return;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: enquiry.email,
        subject: `New project brief — ${enquiry.name}${enquiry.company ? ` (${enquiry.company})` : ""}`,
        text: [
          `Name: ${enquiry.name}`,
          `Email: ${enquiry.email}`,
          `Company: ${enquiry.company ?? "—"}`,
          `Need: ${enquiry.need}`,
          "",
          enquiry.brief,
        ].join("\n"),
      }),
    });
    if (!res.ok) console.error("[email] Resend responded", res.status, await res.text());
  } catch (err) {
    console.error("[email] send failed (submission already stored):", err);
  }
}
