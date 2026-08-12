import Link from "next/link";
import type { PricingSet } from "@prisma/client";
import { db } from "@/lib/db";
import { asStringArray } from "@/lib/content";
import { savePricingTier, deletePricingTier } from "@/lib/actions/admin/pricing";

const TABS: { set: PricingSet; label: string }[] = [
  { set: "ENGAGEMENT", label: "Engagement" },
  { set: "PLATFORM", label: "Platform plans" },
];

export default async function PricingAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ set?: string }>;
}) {
  const { set } = await searchParams;
  const active: PricingSet = set === "PLATFORM" ? "PLATFORM" : "ENGAGEMENT";

  const tiers = await db.pricingTier.findMany({
    where: { set: active },
    orderBy: { position: "asc" },
  });

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="serif">Pricing</h1>
          <p className="sub">Tiers for the Pricing page, split into two sets. Position controls order.</p>
        </div>
      </div>

      <nav className="admin-tabs">
        {TABS.map((t) => (
          <Link key={t.set} href={`/admin/pricing?set=${t.set}`} className={t.set === active ? "active" : undefined}>
            {t.label}
          </Link>
        ))}
      </nav>

      <div className="admin-grid">
        <details className="admin-editor admin-add">
          <summary>Add a new tier</summary>
          <div className="editor-body">
            <form action={savePricingTier} className="admin-form">
              <input type="hidden" name="set" value={active} />
              <div className="row">
                <label>
                  Position
                  <input name="position" type="number" defaultValue={tiers.length + 1} min={1} />
                </label>
                <label>
                  Name
                  <input name="name" required />
                </label>
                <label>
                  Price
                  <input name="price" />
                </label>
                <label>
                  Price note
                  <input name="priceNote" placeholder="e.g. per month" />
                </label>
              </div>
              <label>
                Blurb
                <textarea name="blurb" rows={3} />
              </label>
              <div className="row">
                <label>
                  Features (one per line)
                  <textarea name="features" rows={4} />
                </label>
                <div className="admin-form" style={{ alignContent: "start" }}>
                  <label>
                    CTA label
                    <input name="ctaLabel" placeholder="e.g. Start a project" />
                  </label>
                  <span className="inline">
                    <input id="hl-new" name="highlighted" type="checkbox" />
                    <label htmlFor="hl-new" style={{ display: "inline" }}>
                      Highlighted
                    </label>
                  </span>
                  <span className="inline">
                    <input id="pub-new" name="published" type="checkbox" defaultChecked />
                    <label htmlFor="pub-new" style={{ display: "inline" }}>
                      Published
                    </label>
                  </span>
                </div>
              </div>
              <div>
                <button type="submit" className="btn-admin">
                  Create tier
                </button>
              </div>
            </form>
          </div>
        </details>

        {tiers.map((t) => (
          <details key={t.id} className="admin-editor">
            <summary>
              {t.name} — {t.price}
              <span className="muted">
                {asStringArray(t.features).length} features ·{" "}
                {t.highlighted ? "highlighted · " : ""}
                {t.published ? "published" : "hidden"}
              </span>
            </summary>
            <div className="editor-body">
              <form action={savePricingTier} className="admin-form">
                <input type="hidden" name="id" value={t.id} />
                <input type="hidden" name="set" value={t.set} />
                <div className="row">
                  <label>
                    Position
                    <input name="position" type="number" defaultValue={t.position} min={1} />
                  </label>
                  <label>
                    Name
                    <input name="name" defaultValue={t.name} required />
                  </label>
                  <label>
                    Price
                    <input name="price" defaultValue={t.price} />
                  </label>
                  <label>
                    Price note
                    <input name="priceNote" defaultValue={t.priceNote ?? ""} placeholder="e.g. per month" />
                  </label>
                </div>
                <label>
                  Blurb
                  <textarea name="blurb" rows={3} defaultValue={t.blurb} />
                </label>
                <div className="row">
                  <label>
                    Features (one per line)
                    <textarea name="features" rows={5} defaultValue={asStringArray(t.features).join("\n")} />
                  </label>
                  <div className="admin-form" style={{ alignContent: "start" }}>
                    <label>
                      CTA label
                      <input name="ctaLabel" defaultValue={t.ctaLabel} />
                    </label>
                    <span className="inline">
                      <input id={`hl-${t.id}`} name="highlighted" type="checkbox" defaultChecked={t.highlighted} />
                      <label htmlFor={`hl-${t.id}`} style={{ display: "inline" }}>
                        Highlighted
                      </label>
                    </span>
                    <span className="inline">
                      <input id={`pub-${t.id}`} name="published" type="checkbox" defaultChecked={t.published} />
                      <label htmlFor={`pub-${t.id}`} style={{ display: "inline" }}>
                        Published
                      </label>
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="submit" className="btn-admin">
                    Save tier
                  </button>
                </div>
              </form>

              <form action={deletePricingTier} style={{ marginTop: 16 }}>
                <input type="hidden" name="id" value={t.id} />
                <button type="submit" className="btn-admin danger small">
                  Delete this tier
                </button>
              </form>
            </div>
          </details>
        ))}

      </div>
    </>
  );
}
