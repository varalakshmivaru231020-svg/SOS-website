import { z } from "zod";

export const NEED_OPTIONS = [
  "Web development",
  "Mobile app development",
  "Custom software",
  "eCommerce",
  "AI solutions",
  "Messaging & voice products",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please give us your name.").max(100),
  email: z.string().trim().email("That email doesn't look right."),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  need: z.enum(NEED_OPTIONS, { message: "Pick what you need." }),
  brief: z
    .string()
    .trim()
    .min(20, "Tell us a little more — at least a couple of sentences.")
    .max(2000, "Please keep the brief under 2,000 characters."),
  // Honeypot: humans never see this field; bots fill it.
  website: z.string().max(0).optional().or(z.literal("")),
  // Time-trap: render timestamp, rejected when submitted too fast.
  ts: z.coerce.number().int().positive(),
});

export type ContactInput = z.infer<typeof contactSchema>;
