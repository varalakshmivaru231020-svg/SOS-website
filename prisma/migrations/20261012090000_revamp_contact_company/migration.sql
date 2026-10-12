-- Site revamp: the enquiry form now asks for a phone number and records the
-- page the visitor came from; company details (CIN, GST, business hours) are
-- editable in Admin → Brand & contact.

-- AlterTable
ALTER TABLE "ContactSubmission" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "source" TEXT;

-- AlterTable
ALTER TABLE "SiteSettings" ADD COLUMN     "businessHours" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "cin" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "gst" TEXT NOT NULL DEFAULT '';

-- The compliance line seeded from the original site template claimed
-- certifications that have not been confirmed. Clear it only if it is still
-- the untouched template text; anything an admin wrote stays.
UPDATE "SiteSettings" SET "footerNote" = '' WHERE "footerNote" = 'SOC 2 Type II · ISO 27001 · GDPR';
