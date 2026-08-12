import { db } from "@/lib/db";
import { asStringArray, asMetrics } from "@/lib/content";
import { saveCaseStudy, deleteCaseStudy } from "@/lib/actions/admin/work";

// Case-study CRUD: a <details> editor per row, plain server-action forms,
// no client JS. Position numbers control order.
export default async function WorkAdminPage() {
  const studies = await db.caseStudy.findMany({ orderBy: { position: "asc" } });

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="serif">Case studies</h1>
          <p className="sub">The three client stories on the Work page. Position controls order.</p>
        </div>
      </div>

      <div className="admin-grid">
        <details className="admin-editor admin-add">
          <summary>Add a new case study</summary>
          <div className="editor-body">
            <form action={saveCaseStudy} className="admin-form">
              <div className="row">
                <label>
                  Position
                  <input name="position" type="number" defaultValue={studies.length + 1} min={1} />
                </label>
                <label>
                  Client
                  <input name="client" required />
                </label>
                <label>
                  Slug
                  <input name="slug" required />
                </label>
              </div>
              <label>
                Copy
                <textarea name="copy" rows={4} />
              </label>
              <div className="row">
                <label>
                  Tags (one per line)
                  <textarea name="tags" rows={3} />
                </label>
                <label>
                  Metrics (one per line, &quot;value | label&quot;)
                  <textarea name="metrics" rows={3} placeholder={"3.2x | Faster deploys"} />
                </label>
              </div>
              <span className="inline">
                <input id="pub-new" name="published" type="checkbox" defaultChecked />
                <label htmlFor="pub-new" style={{ display: "inline" }}>
                  Published
                </label>
              </span>
              <div>
                <button type="submit" className="btn-admin">
                  Create case study
                </button>
              </div>
            </form>
          </div>
        </details>

        {studies.map((c) => (
          <details key={c.id} className="admin-editor">
            <summary>
              {c.client}
              <span className="muted">
                {asStringArray(c.tags).length} tags · {asMetrics(c.metrics).length} metrics ·{" "}
                {c.published ? "published" : "hidden"}
              </span>
            </summary>
            <div className="editor-body">
              <form action={saveCaseStudy} className="admin-form">
                <input type="hidden" name="id" value={c.id} />
                <div className="row">
                  <label>
                    Position
                    <input name="position" type="number" defaultValue={c.position} min={1} />
                  </label>
                  <label>
                    Client
                    <input name="client" defaultValue={c.client} required />
                  </label>
                  <label>
                    Slug
                    <input name="slug" defaultValue={c.slug} required />
                  </label>
                </div>
                <label>
                  Copy
                  <textarea name="copy" rows={4} defaultValue={c.copy} />
                </label>
                <div className="row">
                  <label>
                    Tags (one per line)
                    <textarea name="tags" rows={4} defaultValue={asStringArray(c.tags).join("\n")} />
                  </label>
                  <label>
                    Metrics (one per line, &quot;value | label&quot;)
                    <textarea
                      name="metrics"
                      rows={4}
                      defaultValue={asMetrics(c.metrics)
                        .map((m) => `${m.value} | ${m.label}`)
                        .join("\n")}
                    />
                  </label>
                </div>
                <span className="inline">
                  <input id={`pub-${c.id}`} name="published" type="checkbox" defaultChecked={c.published} />
                  <label htmlFor={`pub-${c.id}`} style={{ display: "inline" }}>
                    Published
                  </label>
                </span>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="submit" className="btn-admin">
                    Save case study
                  </button>
                </div>
              </form>

              <form action={deleteCaseStudy} style={{ marginTop: 16 }}>
                <input type="hidden" name="id" value={c.id} />
                <button type="submit" className="btn-admin danger small">
                  Delete this case study
                </button>
              </form>
            </div>
          </details>
        ))}

      </div>
    </>
  );
}
