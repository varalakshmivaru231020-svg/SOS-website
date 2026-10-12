import { z } from "zod";
import { INTEREST_LABELS } from "@/content";

const INTEREST_VALUES = Object.keys(INTEREST_LABELS) as [string, ...string[]];
const optional = (s: z.ZodString) => s.optional().or(z.literal(""));

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please give us your name.").max(100),
  email: z.string().trim().email("That email doesn't look right.").max(200),
  phone: optional(
    z
      .string()
      .trim()
      .regex(/^\+?[\d\s().-]{7,20}$/, "That phone number doesn't look right."),
  ),
  company: optional(z.string().trim().max(120)),
  interest: z.enum(INTEREST_VALUES, { message: "Pick what you're interested in." }),
  message: optional(z.string().trim().max(2000, "Please keep your message under 2,000 characters.")),
  // The page the visitor was on before the form — filled in by the browser.
  source: optional(z.string().trim().max(200)),
  // Honeypot: humans never see this field; bots fill it.
  website: z.string().max(0).optional().or(z.literal("")),
  // Time-trap: render timestamp, rejected when submitted too fast.
  ts: z.coerce.number().int().positive(),
});

export type ContactInput = z.infer<typeof contactSchema>;
