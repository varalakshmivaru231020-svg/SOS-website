-- CreateEnum
CREATE TYPE "PricingSet" AS ENUM ('ENGAGEMENT', 'PLATFORM');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('NEW', 'READ', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR');

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "copy" TEXT NOT NULL,
    "techTags" JSONB NOT NULL,
    "timeline" TEXT NOT NULL,
    "priceInr" TEXT NOT NULL,
    "priceUsd" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceFeature" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "copy" TEXT NOT NULL,

    CONSTRAINT "ServiceFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "badge" TEXT,
    "title" TEXT NOT NULL,
    "copy" TEXT NOT NULL,
    "bullets" JSONB NOT NULL,
    "metrics" JSONB NOT NULL,
    "visualKey" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseStudy" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "tags" JSONB NOT NULL,
    "copy" TEXT NOT NULL,
    "metrics" JSONB NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseStudy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "photoUrl" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Office" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "addressLines" JSONB NOT NULL,
    "tag" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Office_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimelineEntry" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "year" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "copy" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimelineEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechStackItem" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "blurb" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TechStackItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QualityGate" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "copy" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QualityGate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaqGroup" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FaqGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaqItem" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "FaqItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingTier" (
    "id" TEXT NOT NULL,
    "set" "PricingSet" NOT NULL,
    "position" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "priceNote" TEXT,
    "blurb" TEXT NOT NULL,
    "features" JSONB NOT NULL,
    "ctaLabel" TEXT NOT NULL,
    "highlighted" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingTier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroStat" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "HeroStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientLogo" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ClientLogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Industry" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "blurb" TEXT,
    "showOnHome" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Industry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UseCase" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "copy" TEXT NOT NULL,

    CONSTRAINT "UseCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComparisonRow" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "feature" TEXT NOT NULL,
    "northmark" TEXT NOT NULL,
    "typical" TEXT NOT NULL,

    CONSTRAINT "ComparisonRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrustBadge" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "sublabel" TEXT,

    CONSTRAINT "TrustBadge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "need" TEXT NOT NULL,
    "brief" TEXT NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'NEW',
    "ip" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EDITOR',
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "accentPreset" TEXT NOT NULL DEFAULT 'terracotta',
    "accentColor" TEXT NOT NULL DEFAULT '#b8502a',
    "motionIntensity" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "cursorEffects" BOOLEAN NOT NULL DEFAULT true,
    "orgName" TEXT NOT NULL DEFAULT 'Northmark Systems',
    "tagline" TEXT NOT NULL DEFAULT '',
    "contactEmail" TEXT NOT NULL DEFAULT 'hello@northmark.io',
    "socialLinks" JSONB NOT NULL DEFAULT '[]',
    "footerNote" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageSeo" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "noindex" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PageSeo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_slug_key" ON "CaseStudy"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "FaqGroup_key_key" ON "FaqGroup"("key");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PageSeo_path_key" ON "PageSeo"("path");

-- AddForeignKey
ALTER TABLE "ServiceFeature" ADD CONSTRAINT "ServiceFeature_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaqItem" ADD CONSTRAINT "FaqItem_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "FaqGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
