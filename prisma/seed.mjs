// Seeds the database-managed content of the revamped Supreme One Software site
// from seed-data.json: proof-strip figures, FAQ groups, the office, hidden
// draft pricing and per-page SEO. Product, service and industry page copy is
// not here — it lives in src/content.
//
// Content tables are wiped and re-seeded (idempotent), including the tables
// the previous site used that nothing reads any more. Users, enquiries and
// Brand & contact settings are preserved — settings are only created when
// missing. Also creates the first admin from ADMIN_EMAIL / ADMIN_PASSWORD.
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

try {
  process.loadEnvFile();
} catch {}

const data = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), "seed-data.json"), "utf8"));
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

async function resetAndSeed() {
  await db.$transaction([
    db.faqItem.deleteMany(),
    db.faqGroup.deleteMany(),
    db.pricingTier.deleteMany(),
    db.heroStat.deleteMany(),
    db.clientLogo.deleteMany(),
    db.testimonial.deleteMany(),
    db.caseStudy.deleteMany(),
    db.teamMember.deleteMany(),
    db.office.deleteMany(),
    db.timelineEntry.deleteMany(),
    db.pageSeo.deleteMany(),
    // Retired with the revamp — product, service and industry content moved
    // to src/content. Cleared so no stale template copy lingers in the DB.
    db.serviceFeature.deleteMany(),
    db.service.deleteMany(),
    db.product.deleteMany(),
    db.techStackItem.deleteMany(),
    db.qualityGate.deleteMany(),
    db.industry.deleteMany(),
    db.useCase.deleteMany(),
    db.comparisonRow.deleteMany(),
    db.trustBadge.deleteMany(),
  ]);

  await db.heroStat.createMany({ data: data.heroStats.map((s) => ({ position: s.position, value: s.value, label: s.label })) });

  for (const [g, group] of data.faqGroups.entries()) {
    await db.faqGroup.create({
      data: {
        key: group.key,
        title: group.title,
        position: g + 1,
        items: {
          create: group.items.map((item, i) => ({
            position: i + 1,
            question: item.question,
            answer: item.answer,
            published: item.published ?? true,
          })),
        },
      },
    });
  }

  const tiers = [
    ...data.engagementTiers.map((t) => ({ ...t, set: "ENGAGEMENT" })),
    ...data.platformTiers.map((t) => ({ ...t, set: "PLATFORM" })),
  ];
  await db.pricingTier.createMany({
    data: tiers.map((t) => ({
      set: t.set,
      position: t.position,
      name: t.name,
      price: t.price,
      priceNote: t.priceNote,
      blurb: t.blurb,
      features: t.features ?? [],
      ctaLabel: t.ctaLabel ?? "",
      highlighted: !!t.highlighted,
      published: t.published ?? true,
    })),
  });

  await db.office.createMany({
    data: data.offices.map((o) => ({ position: o.position, city: o.city, country: o.country, addressLines: o.addressLines, tag: o.tag })),
  });
  await db.caseStudy.createMany({
    data: data.caseStudies.map((c) => ({ position: c.position, slug: c.slug, client: c.client, tags: c.tags, copy: c.copy, metrics: c.metrics })),
  });
  await db.teamMember.createMany({
    data: data.teamMembers.map((t) => ({ position: t.position, name: t.name, role: t.role, bio: t.bio ?? "" })),
  });
  await db.timelineEntry.createMany({
    data: data.timelineEntries.map((t) => ({ position: t.position, year: t.year, title: t.title ?? "", copy: t.copy })),
  });
  await db.testimonial.createMany({
    data: data.testimonials.map((t) => ({ quote: t.quote, author: t.author, role: t.role ?? "", company: t.company ?? "", featured: !!t.featured })),
  });
  await db.clientLogo.createMany({ data: data.clientLogos.map((name, i) => ({ position: i + 1, name })) });
  await db.pageSeo.createMany({ data: data.pageSeo });

  await db.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      accentPreset: "brand",
      accentColor: "#ff6500",
      motionIntensity: 1,
      cursorEffects: true,
      orgName: "Supreme One Software Pvt Ltd",
      tagline: data.footerTagline,
      contactEmail: "sales@supremeonesoftware.com",
      socialLinks: [],
      footerNote: "",
      wordmark: "Supreme One Software",
      phone: "+91 91641 61611",
      supportEmail: "support@supremeonesoftware.com",
      partnersEmail: "partners@supremeonesoftware.com",
      // Floating buttons ship off — switch them on in Admin → Brand & contact
      // once the WhatsApp number is confirmed.
      whatsappNumber: "",
      whatsappMessage: "Hi Supreme One Software — I'd like to know more about the platform.",
      whatsappEnabled: false,
      callEnabled: false,
      floatingScope: "all",
    },
  });

  const email = process.env.ADMIN_EMAIL ?? "admin@northmark.local";
  const password = process.env.ADMIN_PASSWORD ?? "change-me";
  await db.user.upsert({
    where: { email },
    update: {},
    create: { email, name: "Admin", passwordHash: await bcrypt.hash(password, 12), role: "ADMIN" },
  });

  console.log("Seed complete.");
}

resetAndSeed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
