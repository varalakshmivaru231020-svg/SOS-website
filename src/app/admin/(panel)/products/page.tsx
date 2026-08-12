import { db } from "@/lib/db";
import { asStringArray, asMetrics } from "@/lib/content";
import { saveProduct, deleteProduct } from "@/lib/actions/admin/products";

const VISUAL_KEYS = ["whatsapp", "sms", "rcs", "telephony", "omnichannel", "ivr"] as const;
const BADGES = ["Live", "New"] as const;

export default async function ProductsAdminPage() {
  const products = await db.product.findMany({ orderBy: { position: "asc" } });

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="serif">Products</h1>
          <p className="sub">The product cards on the Products page. Position controls order.</p>
        </div>
      </div>

      <div className="admin-grid">
        <details className="admin-editor admin-add">
          <summary>Add a new product</summary>
          <div className="editor-body">
            <form action={saveProduct} className="admin-form">
              <div className="row">
                <label>
                  Position
                  <input name="position" type="number" defaultValue={products.length + 1} min={1} />
                </label>
                <label>
                  Title
                  <input name="title" required />
                </label>
                <label>
                  Slug
                  <input name="slug" required />
                </label>
                <label>
                  Badge
                  <select name="badge" defaultValue="">
                    <option value="">None</option>
                    {BADGES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                Copy
                <textarea name="copy" rows={3} />
              </label>
              <div className="row">
                <label>
                  Bullets (one per line)
                  <textarea name="bullets" rows={3} />
                </label>
                <label>
                  Metrics (one per line, &quot;value | label&quot;)
                  <textarea name="metrics" rows={3} />
                </label>
              </div>
              <label>
                Visual key
                <select name="visualKey" defaultValue="whatsapp">
                  {VISUAL_KEYS.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </label>
              <span className="inline">
                <input id="pub-new" name="published" type="checkbox" defaultChecked />
                <label htmlFor="pub-new" style={{ display: "inline" }}>
                  Published
                </label>
              </span>
              <div>
                <button type="submit" className="btn-admin">
                  Create product
                </button>
              </div>
            </form>
          </div>
        </details>

        {products.map((p) => (
          <details key={p.id} className="admin-editor">
            <summary>
              {String(p.position).padStart(2, "0")} — {p.title}
              <span className="muted">
                {p.badge ?? "no badge"} · {p.published ? "published" : "hidden"}
              </span>
            </summary>
            <div className="editor-body">
              <form action={saveProduct} className="admin-form">
                <input type="hidden" name="id" value={p.id} />
                <div className="row">
                  <label>
                    Position
                    <input name="position" type="number" defaultValue={p.position} min={1} />
                  </label>
                  <label>
                    Title
                    <input name="title" defaultValue={p.title} required />
                  </label>
                  <label>
                    Slug
                    <input name="slug" defaultValue={p.slug} required />
                  </label>
                  <label>
                    Badge
                    <select name="badge" defaultValue={p.badge ?? ""}>
                      <option value="">None</option>
                      {BADGES.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label>
                  Copy
                  <textarea name="copy" rows={3} defaultValue={p.copy} />
                </label>
                <div className="row">
                  <label>
                    Bullets (one per line)
                    <textarea name="bullets" rows={4} defaultValue={asStringArray(p.bullets).join("\n")} />
                  </label>
                  <label>
                    Metrics (one per line, &quot;value | label&quot;)
                    <textarea
                      name="metrics"
                      rows={4}
                      defaultValue={asMetrics(p.metrics)
                        .map((m) => `${m.value} | ${m.label}`)
                        .join("\n")}
                    />
                  </label>
                </div>
                <label>
                  Visual key
                  <select name="visualKey" defaultValue={p.visualKey}>
                    {VISUAL_KEYS.map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </label>
                <span className="inline">
                  <input id={`pub-${p.id}`} name="published" type="checkbox" defaultChecked={p.published} />
                  <label htmlFor={`pub-${p.id}`} style={{ display: "inline" }}>
                    Published
                  </label>
                </span>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="submit" className="btn-admin">
                    Save product
                  </button>
                </div>
              </form>

              <form action={deleteProduct} style={{ marginTop: 16 }}>
                <input type="hidden" name="id" value={p.id} />
                <button type="submit" className="btn-admin danger small">
                  Delete this product
                </button>
              </form>
            </div>
          </details>
        ))}

      </div>
    </>
  );
}
