-- AlterTable
ALTER TABLE "SiteSettings" ADD COLUMN     "callEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "faviconData" TEXT,
ADD COLUMN     "floatingScope" TEXT NOT NULL DEFAULT 'mobile',
ADD COLUMN     "logoAlt" TEXT,
ADD COLUMN     "logoData" TEXT,
ADD COLUMN     "partnersEmail" TEXT NOT NULL DEFAULT 'partners@northmark.io',
ADD COLUMN     "phone" TEXT NOT NULL DEFAULT '+91 20 4890 2200',
ADD COLUMN     "supportEmail" TEXT NOT NULL DEFAULT 'support@northmark.io',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "whatsappEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "whatsappMessage" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "whatsappNumber" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "wordmark" TEXT NOT NULL DEFAULT 'Northmark';
