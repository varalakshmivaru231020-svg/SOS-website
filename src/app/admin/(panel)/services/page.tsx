import { db } from "@/lib/db";
import { asStringArray } from "@/lib/content";
import { saveService, deleteService, saveServiceFeature, deleteServiceFeature } from "@/lib/actions/admin/services";

// Pattern screen for content CRUD: a <details> editor per row, plain server-action
// forms, no client JS. Position numbers control order.
export default async function ServicesAdminPage() {
  const services = await db.service.findMany({
    orderBy: { position: "asc" },
    include: { features: { orderBy: { position: "asc" } } },
  });

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="serif">Services</h1>
          <p className="sub">The five discipline blocks on the Services page. Position controls order.</p>
        </div>
      </div>

      <div className="admin-grid">
        <details className="admin-editor admin-add">
          <summary>Add a new service</summary>
          <div className="editor-body">
            <form action={saveService} className="admin-form">
              <div className="row">
                <label>
                  Position
                  <input name="position" type="number" defaultValue={services.length + 1} min={1} />
                </label>
                <label>
                  Number
                  <input name="number" placeholder="06" />
                </label>
                <label>
                  Title
                  <input name="title" required />
                </label>
                <label>
                  Slug
                  <input name="slug" required />
                </label>
              </div>
              <label>
                Copy
                <textarea name="copy" rows={3} />
              </label>
              <div className="row">
                <label>
                  Tech tags (one per line)
                  <textarea name="techTags" rows={3} />
                </label>
                <div className="admin-form" style={{ alignContent: "start" }}>
                  <label>
                    Timeline
                    <input name="timeline" />
                  </label>
                  <label>
                    Price (₹)
                    <input name="priceInr" />
                  </label>
                  <label>
                    Price ($)
                    <input name="priceUsd" />
                  </label>
                </div>
              </div>
              <span className="inline">
                <input id="pub-new" name="published" type="checkbox" defaultChecked />
                <label htmlFor="pub-new" style={{ display: "inline" }}>
                  Published
                </label>
              </span>
              <div>
                <button type="submit" className="btn-admin">
                  Create service
                </button>
              </div>
            </form>
          </div>
        </details>

        {services.map((s) => (
          <details key={s.id} className="admin-editor">
            <summary>
              {s.number} — {s.title}
              <span className="muted">
                {asStringArray(s.techTags).length} tags · {s.features.length} features ·{" "}
                {s.published ? "published" : "hidden"}
              </span>
            </summary>
            <div className="editor-body">
              <form action={saveService} className="admin-form">
                <input type="hidden" name="id" value={s.id} />
                <div className="row">
                  <label>
                    Position
                    <input name="position" type="number" defaultValue={s.position} min={1} />
                  </label>
                  <label>
                    Number
                    <input name="number" defaultValue={s.number} />
                  </label>
                  <label>
                    Title
                    <input name="title" defaultValue={s.title} required />
                  </label>
                  <label>
                    Slug
                    <input name="slug" defaultValue={s.slug} required />
                  </label>
                </div>
                <label>
                  Copy
                  <textarea name="copy" rows={3} defaultValue={s.copy} />
                </label>
                <div className="row">
                  <label>
                    Tech tags (one per line)
                    <textarea name="techTags" rows={4} defaultValue={asStringArray(s.techTags).join("\n")} />
                  </label>
                  <div className="admin-form" style={{ alignContent: "start" }}>
                    <label>
                      Timeline
                      <input name="timeline" defaultValue={s.timeline} />
                    </label>
                    <label>
                      Price (₹)
                      <input name="priceInr" defaultValue={s.priceInr} />
                    </label>
                    <label>
                      Price ($)
                      <input name="priceUsd" defaultValue={s.priceUsd} />
                    </label>
                  </div>
                </div>
                <span className="inline">
                  <input id={`pub-${s.id}`} name="published" type="checkbox" defaultChecked={s.published} />
                  <label htmlFor={`pub-${s.id}`} style={{ display: "inline" }}>
                    Published
                  </label>
                </span>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="submit" className="btn-admin">
                    Save service
                  </button>
                </div>
              </form>

              <h3 style={{ fontSize: 13, margin: "20px 0 10px", color: "var(--muted)" }}>Feature rows</h3>
              <div className="admin-grid">
                {s.features.map((f) => (
                  <form key={f.id} action={saveServiceFeature} className="admin-form admin-card" style={{ marginBottom: 0 }}>
                    <input type="hidden" name="id" value={f.id} />
                    <div className="row">
                      <label>
                        Position
                        <input name="position" type="number" defaultValue={f.position} min={1} style={{ maxWidth: 90 }} />
                      </label>
                      <label>
                        Title
                        <input name="title" defaultValue={f.title} required />
                      </label>
                    </div>
                    <label>
                      Copy
                      <input name="copy" defaultValue={f.copy} />
                    </label>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button type="submit" className="btn-admin small">
                        Save
                      </button>
                      <button type="submit" className="btn-admin danger small" formAction={deleteServiceFeature}>
                        Delete
                      </button>
                    </div>
                  </form>
                ))}
                <form action={saveServiceFeature} className="admin-form admin-card" style={{ marginBottom: 0 }}>
                  <input type="hidden" name="serviceId" value={s.id} />
                  <div className="row">
                    <label>
                      Position
                      <input name="position" type="number" defaultValue={s.features.length + 1} min={1} style={{ maxWidth: 90 }} />
                    </label>
                    <label>
                      Title
                      <input name="title" placeholder="New feature title" required />
                    </label>
                  </div>
                  <label>
                    Copy
                    <input name="copy" placeholder="One-line description" />
                  </label>
                  <div>
                    <button type="submit" className="btn-admin ghost small">
                      + Add feature
                    </button>
                  </div>
                </form>
              </div>

              <form action={deleteService} style={{ marginTop: 16 }}>
                <input type="hidden" name="id" value={s.id} />
                <button type="submit" className="btn-admin danger small">
                  Delete this service
                </button>
              </form>
            </div>
          </details>
        ))}

      </div>
    </>
  );
}
