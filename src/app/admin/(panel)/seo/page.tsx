import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { savePageSeo } from "@/lib/actions/admin/settings";

// Admin-only per-route metadata editor. Rows are fixed per route — no create/delete.
export default async function SeoAdminPage() {
  await requireSession("ADMIN");

  const pages = await db.pageSeo.findMany({ orderBy: { path: "asc" } });

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="serif">SEO</h1>
          <p className="sub">Per-route titles, descriptions, and Open Graph overrides. One row per public page.</p>
        </div>
      </div>

      <div className="admin-grid">
        {pages.map((p) => (
          <details key={p.id} className="admin-editor">
            <summary>
              {p.path}
              <span className="muted">
                {p.title}
                {p.noindex ? " · noindex" : ""}
              </span>
            </summary>
            <div className="editor-body">
              <form action={savePageSeo} className="admin-form">
                <input type="hidden" name="id" value={p.id} />
                <label>
                  Title <span className="muted">(≈60 chars)</span>
                  <input name="title" defaultValue={p.title} required />
                </label>
                <label>
                  Description <span className="muted">(≈155 chars)</span>
                  <textarea name="description" rows={3} defaultValue={p.description} />
                </label>
                <div className="row">
                  <label>
                    OG title (optional override)
                    <input name="ogTitle" defaultValue={p.ogTitle ?? ""} />
                  </label>
                  <label>
                    OG description (optional override)
                    <input name="ogDescription" defaultValue={p.ogDescription ?? ""} />
                  </label>
                </div>
                <span className="inline">
                  <input id={`noindex-${p.id}`} name="noindex" type="checkbox" defaultChecked={p.noindex} />
                  <label htmlFor={`noindex-${p.id}`} style={{ display: "inline" }}>
                    Noindex (hide this page from search engines)
                  </label>
                </span>
                <div>
                  <button type="submit" className="btn-admin">
                    Save SEO
                  </button>
                </div>
              </form>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
