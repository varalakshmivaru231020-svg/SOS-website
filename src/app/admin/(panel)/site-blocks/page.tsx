import Link from "next/link";
import { db } from "@/lib/db";
import {
  saveHeroStat,
  deleteHeroStat,
  saveClientLogo,
  deleteClientLogo,
  saveIndustry,
  deleteIndustry,
  saveUseCase,
  deleteUseCase,
  saveComparisonRow,
  deleteComparisonRow,
  saveTrustBadge,
  deleteTrustBadge,
  saveTestimonial,
  saveTechStackItem,
  deleteTechStackItem,
  saveQualityGate,
  deleteQualityGate,
} from "@/lib/actions/admin/blocks";

const TABS = [
  { key: "stats", label: "Hero stats" },
  { key: "logos", label: "Client logos" },
  { key: "industries", label: "Industries" },
  { key: "usecases", label: "Use cases" },
  { key: "comparison", label: "Comparison" },
  { key: "badges", label: "Trust badges" },
  { key: "testimonial", label: "Testimonial" },
  { key: "stack", label: "Tech stack" },
  { key: "quality", label: "Quality gates" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

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
          <p className="sub">Small shared collections used across the home page and site. Position controls order.</p>
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

      {active === "stats" && <StatsTab />}
      {active === "logos" && <LogosTab />}
      {active === "industries" && <IndustriesTab />}
      {active === "usecases" && <UseCasesTab />}
      {active === "comparison" && <ComparisonTab />}
      {active === "badges" && <BadgesTab />}
      {active === "testimonial" && <TestimonialTab />}
      {active === "stack" && <StackTab />}
      {active === "quality" && <QualityTab />}
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
            <input name="value" placeholder="e.g. 120+" required />
          </label>
          <label>
            Label
            <input name="label" placeholder="e.g. Projects shipped" required />
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

async function IndustriesTab() {
  const rows = await db.industry.findMany({ orderBy: { position: "asc" } });
  return (
    <div className="admin-grid">
      {rows.map((r) => (
        <form key={r.id} action={saveIndustry} className="admin-form admin-card" style={{ marginBottom: 0 }}>
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
          <label>
            Blurb
            <input name="blurb" defaultValue={r.blurb ?? ""} placeholder="Optional one-liner" />
          </label>
          <span className="inline">
            <input id={`home-${r.id}`} name="showOnHome" type="checkbox" defaultChecked={r.showOnHome} />
            <label htmlFor={`home-${r.id}`} style={{ display: "inline" }}>
              Show on home
            </label>
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" className="btn-admin small">
              Save
            </button>
            <button type="submit" className="btn-admin danger small" formAction={deleteIndustry}>
              Delete
            </button>
          </div>
        </form>
      ))}
      <form action={saveIndustry} className="admin-form admin-card" style={{ marginBottom: 0 }}>
        <div className="row">
          <label>
            Position
            <input name="position" type="number" defaultValue={rows.length + 1} min={1} style={{ maxWidth: 90 }} />
          </label>
          <label>
            Name
            <input name="name" placeholder="New industry" required />
          </label>
        </div>
        <label>
          Blurb
          <input name="blurb" placeholder="Optional one-liner" />
        </label>
        <span className="inline">
          <input id="home-new" name="showOnHome" type="checkbox" defaultChecked />
          <label htmlFor="home-new" style={{ display: "inline" }}>
            Show on home
          </label>
        </span>
        <div>
          <button type="submit" className="btn-admin ghost small">
            + Add industry
          </button>
        </div>
      </form>
    </div>
  );
}

async function UseCasesTab() {
  const rows = await db.useCase.findMany({ orderBy: { position: "asc" } });
  return (
    <div className="admin-grid">
      {rows.map((r) => (
        <form key={r.id} action={saveUseCase} className="admin-form admin-card" style={{ marginBottom: 0 }}>
          <input type="hidden" name="id" value={r.id} />
          <div className="row">
            <label>
              Position
              <input name="position" type="number" defaultValue={r.position} min={1} style={{ maxWidth: 90 }} />
            </label>
            <label>
              Title
              <input name="title" defaultValue={r.title} required />
            </label>
          </div>
          <label>
            Copy
            <textarea name="copy" rows={2} defaultValue={r.copy} />
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" className="btn-admin small">
              Save
            </button>
            <button type="submit" className="btn-admin danger small" formAction={deleteUseCase}>
              Delete
            </button>
          </div>
        </form>
      ))}
      <form action={saveUseCase} className="admin-form admin-card" style={{ marginBottom: 0 }}>
        <div className="row">
          <label>
            Position
            <input name="position" type="number" defaultValue={rows.length + 1} min={1} style={{ maxWidth: 90 }} />
          </label>
          <label>
            Title
            <input name="title" placeholder="New use case" required />
          </label>
        </div>
        <label>
          Copy
          <textarea name="copy" rows={2} placeholder="Short description" />
        </label>
        <div>
          <button type="submit" className="btn-admin ghost small">
            + Add use case
          </button>
        </div>
      </form>
    </div>
  );
}

async function ComparisonTab() {
  const rows = await db.comparisonRow.findMany({ orderBy: { position: "asc" } });
  return (
    <div className="admin-grid">
      {rows.map((r) => (
        <form key={r.id} action={saveComparisonRow} className="admin-form admin-card" style={{ marginBottom: 0 }}>
          <input type="hidden" name="id" value={r.id} />
          <div className="row">
            <label>
              Position
              <input name="position" type="number" defaultValue={r.position} min={1} style={{ maxWidth: 90 }} />
            </label>
            <label>
              Feature
              <input name="feature" defaultValue={r.feature} required />
            </label>
          </div>
          <div className="row">
            <label>
              Supreme One Software
              <input name="northmark" defaultValue={r.northmark} />
            </label>
            <label>
              Typical agency
              <input name="typical" defaultValue={r.typical} />
            </label>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" className="btn-admin small">
              Save
            </button>
            <button type="submit" className="btn-admin danger small" formAction={deleteComparisonRow}>
              Delete
            </button>
          </div>
        </form>
      ))}
      <form action={saveComparisonRow} className="admin-form admin-card" style={{ marginBottom: 0 }}>
        <div className="row">
          <label>
            Position
            <input name="position" type="number" defaultValue={rows.length + 1} min={1} style={{ maxWidth: 90 }} />
          </label>
          <label>
            Feature
            <input name="feature" placeholder="New comparison row" required />
          </label>
        </div>
        <div className="row">
          <label>
            Supreme One Software
            <input name="northmark" placeholder="How we do it" />
          </label>
          <label>
            Typical agency
            <input name="typical" placeholder="How it usually goes" />
          </label>
        </div>
        <div>
          <button type="submit" className="btn-admin ghost small">
            + Add row
          </button>
        </div>
      </form>
    </div>
  );
}

async function BadgesTab() {
  const rows = await db.trustBadge.findMany({ orderBy: { position: "asc" } });
  return (
    <div className="admin-grid">
      {rows.map((r) => (
        <form key={r.id} action={saveTrustBadge} className="admin-form admin-card" style={{ marginBottom: 0 }}>
          <input type="hidden" name="id" value={r.id} />
          <div className="row">
            <label>
              Position
              <input name="position" type="number" defaultValue={r.position} min={1} style={{ maxWidth: 90 }} />
            </label>
            <label>
              Label
              <input name="label" defaultValue={r.label} required />
            </label>
            <label>
              Sublabel
              <input name="sublabel" defaultValue={r.sublabel ?? ""} placeholder="Optional" />
            </label>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" className="btn-admin small">
              Save
            </button>
            <button type="submit" className="btn-admin danger small" formAction={deleteTrustBadge}>
              Delete
            </button>
          </div>
        </form>
      ))}
      <form action={saveTrustBadge} className="admin-form admin-card" style={{ marginBottom: 0 }}>
        <div className="row">
          <label>
            Position
            <input name="position" type="number" defaultValue={rows.length + 1} min={1} style={{ maxWidth: 90 }} />
          </label>
          <label>
            Label
            <input name="label" placeholder="New badge" required />
          </label>
          <label>
            Sublabel
            <input name="sublabel" placeholder="Optional" />
          </label>
        </div>
        <div>
          <button type="submit" className="btn-admin ghost small">
            + Add badge
          </button>
        </div>
      </form>
    </div>
  );
}

async function TestimonialTab() {
  const t = await db.testimonial.findFirst({ where: { featured: true } });
  return (
    <div className="admin-grid">
      <form action={saveTestimonial} className="admin-form admin-card" style={{ marginBottom: 0 }}>
        {t && <input type="hidden" name="id" value={t.id} />}
        <label>
          Quote
          <textarea name="quote" rows={4} defaultValue={t?.quote ?? ""} required />
        </label>
        <div className="row">
          <label>
            Author
            <input name="author" defaultValue={t?.author ?? ""} required />
          </label>
          <label>
            Role
            <input name="role" defaultValue={t?.role ?? ""} />
          </label>
          <label>
            Company
            <input name="company" defaultValue={t?.company ?? ""} />
          </label>
        </div>
        <div>
          <button type="submit" className="btn-admin">
            Save testimonial
          </button>
        </div>
      </form>
    </div>
  );
}

async function StackTab() {
  const rows = await db.techStackItem.findMany({ orderBy: { position: "asc" } });
  return (
    <div className="admin-grid">
      {rows.map((r) => (
        <form key={r.id} action={saveTechStackItem} className="admin-form admin-card" style={{ marginBottom: 0 }}>
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
          <label>
            Blurb
            <input name="blurb" defaultValue={r.blurb} />
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" className="btn-admin small">
              Save
            </button>
            <button type="submit" className="btn-admin danger small" formAction={deleteTechStackItem}>
              Delete
            </button>
          </div>
        </form>
      ))}
      <form action={saveTechStackItem} className="admin-form admin-card" style={{ marginBottom: 0 }}>
        <div className="row">
          <label>
            Position
            <input name="position" type="number" defaultValue={rows.length + 1} min={1} style={{ maxWidth: 90 }} />
          </label>
          <label>
            Name
            <input name="name" placeholder="New stack item" required />
          </label>
        </div>
        <label>
          Blurb
          <input name="blurb" placeholder="One-line description" />
        </label>
        <div>
          <button type="submit" className="btn-admin ghost small">
            + Add stack item
          </button>
        </div>
      </form>
    </div>
  );
}

async function QualityTab() {
  const rows = await db.qualityGate.findMany({ orderBy: { position: "asc" } });
  return (
    <div className="admin-grid">
      {rows.map((r) => (
        <form key={r.id} action={saveQualityGate} className="admin-form admin-card" style={{ marginBottom: 0 }}>
          <input type="hidden" name="id" value={r.id} />
          <div className="row">
            <label>
              Position
              <input name="position" type="number" defaultValue={r.position} min={1} style={{ maxWidth: 90 }} />
            </label>
            <label>
              Title
              <input name="title" defaultValue={r.title} required />
            </label>
          </div>
          <label>
            Copy
            <textarea name="copy" rows={2} defaultValue={r.copy} />
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" className="btn-admin small">
              Save
            </button>
            <button type="submit" className="btn-admin danger small" formAction={deleteQualityGate}>
              Delete
            </button>
          </div>
        </form>
      ))}
      <form action={saveQualityGate} className="admin-form admin-card" style={{ marginBottom: 0 }}>
        <div className="row">
          <label>
            Position
            <input name="position" type="number" defaultValue={rows.length + 1} min={1} style={{ maxWidth: 90 }} />
          </label>
          <label>
            Title
            <input name="title" placeholder="New quality gate" required />
          </label>
        </div>
        <label>
          Copy
          <textarea name="copy" rows={2} placeholder="Short description" />
        </label>
        <div>
          <button type="submit" className="btn-admin ghost small">
            + Add quality gate
          </button>
        </div>
      </form>
    </div>
  );
}
