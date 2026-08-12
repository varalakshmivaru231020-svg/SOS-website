// Seeds the database with the complete content of the original Supreme One Software site,
// transcribed verbatim from `Supreme One Software Website.html` into seed-data.json.
// Also creates the first admin user from ADMIN_EMAIL / ADMIN_PASSWORD.
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
  // Content tables are wiped and re-seeded (idempotent). Operational tables
  // (User, ContactSubmission) are preserved — only upserted.
  await db.$transaction([
    db.serviceFeature.deleteMany(),
    db.service.deleteMany(),
    db.product.deleteMany(),
    db.caseStudy.deleteMany(),
    db.teamMember.deleteMany(),
    db.office.deleteMany(),
    db.timelineEntry.deleteMany(),
    db.techStackItem.deleteMany(),
    db.qualityGate.deleteMany(),
    db.faqItem.deleteMany(),
    db.faqGroup.deleteMany(),
    db.pricingTier.deleteMany(),
    db.heroStat.deleteMany(),
    db.clientLogo.deleteMany(),
    db.industry.deleteMany(),
    db.useCase.deleteMany(),
    db.comparisonRow.deleteMany(),
    db.trustBadge.deleteMany(),
    db.testimonial.deleteMany(),
    db.pageSeo.deleteMany(),
  ]);

  for (const s of data.services) {
    await db.service.create({
      data: {
        position: s.position, slug: s.slug, number: s.number, title: s.title, copy: s.copy,
        techTags: s.techTags, timeline: s.timeline, priceInr: s.priceInr, priceUsd: s.priceUsd,
        features: { create: s.features.map((f) => ({ position: f.position, title: f.title, copy: f.copy })) },
      },
    });
  }

  for (const p of data.products) {
    await db.product.create({
      data: {
        position: p.position, slug: p.slug, badge: p.badge, title: p.title, copy: p.copy,
        bullets: p.bullets, metrics: p.metrics, visualKey: p.visualKey,
      },
    });
  }

  for (const c of data.caseStudies) {
    await db.caseStudy.create({
      data: { position: c.position, slug: c.slug, client: c.client, tags: c.tags, copy: c.copy, metrics: c.metrics },
    });
  }

  await db.teamMember.createMany({ data: data.teamMembers.map((t) => ({ position: t.position, name: t.name, role: t.role, bio: t.bio ?? "" })) });
  await db.office.createMany({ data: data.offices.map((o) => ({ position: o.position, city: o.city, country: o.country, addressLines: o.addressLines, tag: o.tag })) });
  await db.timelineEntry.createMany({ data: data.timelineEntries.map((t) => ({ position: t.position, year: t.year, title: t.title ?? "", copy: t.copy })) });
  await db.techStackItem.createMany({ data: data.techStackItems.map((t) => ({ position: t.position, name: t.name, blurb: t.blurb })) });
  await db.qualityGate.createMany({ data: data.qualityGates.map((q) => ({ position: q.position, title: q.title, copy: q.copy })) });

  const faqGroups = [
    { key: "home", title: "Questions, answered", position: 1, items: data.homeFaq },
    { key: "services", title: "Questions", position: 2, items: data.servicesFaq },
    { key: "contact", title: "Before you write", position: 3, items: data.contactFaq },
  ];
  for (const g of faqGroups) {
    await db.faqGroup.create({
      data: {
        key: g.key, title: g.title, position: g.position,
        items: { create: g.items.map((i) => ({ position: i.position, question: i.question, answer: i.answer })) },
      },
    });
  }

  const tiers = [
    ...data.engagementTiers.map((t) => ({ ...t, set: "ENGAGEMENT" })),
    ...data.platformTiers.map((t) => ({ ...t, set: "PLATFORM" })),
  ];
  await db.pricingTier.createMany({
    data: tiers.map((t) => ({
      set: t.set, position: t.position, name: t.name, price: t.price, priceNote: t.priceNote,
      blurb: t.blurb, features: t.features ?? [], ctaLabel: t.ctaLabel ?? "", highlighted: !!t.highlighted,
    })),
  });

  await db.heroStat.createMany({ data: data.heroStats.map((s) => ({ position: s.position, value: s.value, label: s.label })) });
  await db.clientLogo.createMany({ data: data.clientLogos.map((n, i) => ({ position: i + 1, name: typeof n === "string" ? n : n.name })) });

  const homeSet = data.industriesHome.map((n) => n.toLowerCase().split(" ")[0]);
  await db.industry.createMany({
    data: data.industriesWork.map((n, i) => {
      const name = typeof n === "string" ? n : n.name;
      return { position: i + 1, name, blurb: typeof n === "object" ? n.blurb : null, showOnHome: homeSet.includes(name.toLowerCase().split(" ")[0]) };
    }),
  });

  await db.useCase.createMany({ data: data.useCases.map((u) => ({ position: u.position, title: u.title, copy: u.copy })) });
  await db.comparisonRow.createMany({ data: data.comparisonRows.map((r) => ({ position: r.position, feature: r.feature, northmark: r.northmark, typical: r.typical })) });
  await db.trustBadge.createMany({ data: data.trustBadges.map((b) => ({ position: b.position, label: b.label, sublabel: b.sublabel })) });
  await db.testimonial.create({ data: { ...data.testimonial, featured: true } });

  await db.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      accentPreset: "terracotta",
      accentColor: "#b8502a",
      motionIntensity: 1,
      cursorEffects: true,
      orgName: "Supreme One Software Pvt Ltd",
      tagline: data.footerTagline,
      contactEmail: "hello@supremeonesoftware.com",
      socialLinks: [],
      footerNote: data.footerCompliance,
      wordmark: "Supreme One Software",
      phone: "+91 20 4890 2200",
      supportEmail: "support@supremeonesoftware.com",
      partnersEmail: "partners@supremeonesoftware.com",
      // Floating buttons ship off — switch them on in Admin → Brand & contact
      // once a real WhatsApp number is in place.
      whatsappNumber: "",
      whatsappMessage: "Hi Supreme One Software — I'd like to talk about a project.",
      whatsappEnabled: false,
      callEnabled: false,
      floatingScope: "mobile",
    },
  });

  const seo = [
    { path: "/", title: "Supreme One Software — We build the software that speaks for your business", description: "Product studio and communication platform. Five engineering disciplines and six shipped communication products under one roof — web, mobile, custom systems, commerce and AI." },
    { path: "/services", title: "Services — Supreme One Software", description: "Senior-only engineering pods that ship weekly. Web, mobile, custom software, eCommerce and AI solution services — discovery in week one, working software in week three." },
    { path: "/products", title: "Products — Supreme One Software", description: "Six channels, one API key. WhatsApp Business API, SMS, RCS, AI cloud telephony, omnichannel suite and IVR — built and operated by Supreme One Software." },
    { path: "/platform", title: "Platform — Supreme One Software", description: "One layer under every conversation. Sub-second routing, regional data residency, drop-in SDKs — SOC 2 Type II, ISO 27001, 99.98% uptime." },
    { path: "/work", title: "Work — Supreme One Software", description: "Shipped, measured, still running. Case studies from retail, finance and healthcare — 180+ products delivered across 38 countries." },
    { path: "/about", title: "About — Supreme One Software", description: "A studio that also runs what it builds. Founded 2015 in Pune; 140 people across Pune, Dubai and Singapore." },
    { path: "/contact", title: "Contact — Supreme One Software", description: "Tell us the problem. A reply within one business day; architecture, timeline and number within 48 hours of the first call." },
    { path: "/legal/privacy", title: "Privacy Policy — Supreme One Software", description: "How Supreme One Software Pvt Ltd collects, uses and protects your data." },
    { path: "/legal/terms", title: "Terms of Service — Supreme One Software", description: "The terms that govern use of Supreme One Software's website and services." },
  ];
  await db.pageSeo.createMany({ data: seo });

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
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
