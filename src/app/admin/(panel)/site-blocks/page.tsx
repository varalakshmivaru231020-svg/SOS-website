import Link from "next/link";
import { db } from "@/lib/db";
import {
  saveHeroStat,
  deleteHeroStat,
  saveClientLogo,
  deleteClientLogo,
  saveTestimonial,
  deleteTestimonial,
} from "@/lib/actions/admin/blocks";

const TABS = [
  { key: "stats", label: "Proof strip" },
  { key: "testimonials", label: "Testimonials" },
  { key: "logos", label: "Client logos" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const HELP: Record<TabKey, string> = {
  stats: "The row of figures under the home page hero. Use real, current numbers only — leave a figure out rather than guess it.",
  testimonials:
    "Real client quotes. The featured quote appears on the home page; every quote appears on the Customers page. Nothing shows until there is at least one.",
  logos: "Client names shown in the “Trusted by” row on the Customers page. Add only clients who have agreed to be named.",
};

export default async function SiteBlocksAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const active: TabKey = TABS.some((t) => t.key === tab) ? (tab as TabKey) : "stats";

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="serif">Site blocks</h1>
          <p className="sub">Small shared collections used on the home and Customers pages. Position controls order.</p>
        </div>
      </div>

      <nav className="admin-tabs">
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={`/admin/site-blocks?tab=${t.key}`}
            className={t.key === active ? "active" : undefined}
          >
            {t.label}
          </Link>
        ))}
      </nav>

      <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 16px", maxWidth: "70ch" }}>{HELP[active]}</p>

      {active === "stats" && <StatsTab />}
      {active === "testimonials" && <TestimonialsTab />}
      {active === "logos" && <LogosTab />}
    </>
  );
}

async function StatsTab() {
  const rows = await db.heroStat.findMany({ orderBy: { position: "asc" } });
  return (
    <div className="admin-grid">
      {rows.map((r) => (
        <form key={r.id} action={saveHeroStat} className="admin-form admin-card" style={{ marginBottom: 0 }}>
          <input type="hidden" name="id" value={r.id} />
          <div className="row">
            <label>
              Position
              <input name="position" type="number" defaultValue={r.position} min={1} style={{ maxWidth: 90 }} />
            </label>
            <label>
              Value
              <input name="value" defaultValue={r.value} required />
            </label>
            <label>
              Label
              <input name="label" defaultValue={r.label} required />
            </label>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" className="btn-admin small">
              Save
            </button>
            <button type="submit" className="btn-admin danger small" formAction={deleteHeroStat}>
              Delete
            </button>
          </div>
        </form>
      ))}
      <form action={saveHeroStat} className="admin-form admin-card" style={{ marginBottom: 0 }}>
        <div className="row">
          <label>
            Position
            <input name="position" type="number" defaultValue={rows.length + 1} min={1} style={{ maxWidth: 90 }} />
          </label>
          <label>
            Value
            <input name="value" placeholder="e.g. 11" required />
          </label>
          <label>
            Label
            <input name="label" placeholder="e.g. Communication products, one dashboard" required />
          </label>
        </div>
        <div>
          <button type="submit" className="btn-admin ghost small">
            + Add stat
          </button>
        </div>
      </form>
    </div>
  );
}

async function LogosTab() {
  const rows = await db.clientLogo.findMany({ orderBy: { position: "asc" } });
  return (
    <div className="admin-grid">
      {rows.map((r) => (
        <form key={r.id} action={saveClientLogo} className="admin-form admin-card" style={{ marginBottom: 0 }}>
          <input type="hidden" name="id" value={r.id} />
          <div className="row">
            <label>
              Position
              <input name="position" type="number" defaultValue={r.position} min={1} style={{ maxWidth: 90 }} />
            </label>
            <label>
              Name
              <input name="name" defaultValue={r.name} required />
            </label>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" className="btn-admin small">
              Save
            </button>
            <button type="submit" className="btn-admin danger small" formAction={deleteClientLogo}>
              Delete
            </button>
          </div>
        </form>
      ))}
      <form action={saveClientLogo} className="admin-form admin-card" style={{ marginBottom: 0 }}>
        <div className="row">
          <label>
            Position
            <input name="position" type="number" defaultValue={rows.length + 1} min={1} style={{ maxWidth: 90 }} />
          </label>
          <label>
            Name
            <input name="name" placeholder="New client name" required />
          </label>
        </div>
        <div>
          <button type="submit" className="btn-admin ghost small">
            + Add logo
          </button>
        </div>
      </form>
    </div>
  );
}

async function TestimonialsTab() {
  const rows = await db.testimonial.findMany({ orderBy: [{ featured: "desc" }, { id: "asc" }] });
  return (
    <div className="admin-grid">
      {rows.map((t) => (
        <form key={t.id} action={saveTestimonial} className="admin-form admin-card" style={{ marginBottom: 0 }}>
          <input type="hidden" name="id" value={t.id} />
          <label>
            Quote
            <textarea name="quote" rows={3} defaultValue={t.quote} required />
          </label>
          <div className="row">
            <label>
              Name
              <input name="author" defaultValue={t.author} required />
            </label>
            <label>
              Role
              <input name="role" defaultValue={t.role} />
            </label>
            <label>
              Company
              <input name="company" defaultValue={t.company} />
            </label>
          </div>
          <label className="inline">
            <input type="checkbox" name="featured" defaultChecked={t.featured} style={{ width: "auto" }} />
            Feature on the home page
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" className="btn-admin small">
              Save
            </button>
            <button type="submit" className="btn-admin danger small" formAction={deleteTestimonial}>
              Delete
            </button>
          </div>
        </form>
      ))}
      <form action={saveTestimonial} className="admin-form admin-card" style={{ marginBottom: 0 }}>
        <label>
          Quote
          <textarea name="quote" rows={3} placeholder="What the client said, in their words." required />
        </label>
        <div className="row">
          <label>
            Name
            <input name="author" required />
          </label>
          <label>
            Role
            <input name="role" />
          </label>
          <label>
            Company
            <input name="company" />
          </label>
        </div>
        <label className="inline">
          <input type="checkbox" name="featured" defaultChecked={rows.length === 0} style={{ width: "auto" }} />
          Feature on the home page
        </label>
        <div>
          <button type="submit" className="btn-admin ghost small">
            + Add testimonial
          </button>
        </div>
      </form>
    </div>
  );
}
