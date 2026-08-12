import { db } from "@/lib/db";
import { saveFaqGroup, saveFaqItem, deleteFaqItem } from "@/lib/actions/admin/faqs";

// FAQ groups are fixed (home / services / contact) — a <details> editor per
// group, plain server-action forms, no client JS. Position numbers control order.
export default async function FaqsAdminPage() {
  const groups = await db.faqGroup.findMany({
    orderBy: { position: "asc" },
    include: { items: { orderBy: { position: "asc" } } },
  });

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="serif">FAQs</h1>
          <p className="sub">
            One group per page (home, services, contact). Groups are fixed — edit their title and item lists. Position
            controls order.
          </p>
        </div>
      </div>

      <div className="admin-grid">
        {groups.map((g) => (
          <details key={g.id} className="admin-editor">
            <summary>
              {g.title}
              <span className="muted">
                {g.key} · {g.items.length} items · {g.items.filter((i) => i.published).length} published
              </span>
            </summary>
            <div className="editor-body">
              <form action={saveFaqGroup} className="admin-form">
                <input type="hidden" name="id" value={g.id} />
                <div className="row">
                  <label>
                    Position
                    <input name="position" type="number" defaultValue={g.position} min={1} style={{ maxWidth: 90 }} />
                  </label>
                  <label>
                    Key (fixed)
                    <input value={g.key} readOnly disabled />
                  </label>
                  <label>
                    Title
                    <input name="title" defaultValue={g.title} required />
                  </label>
                </div>
                <div>
                  <button type="submit" className="btn-admin">
                    Save group
                  </button>
                </div>
              </form>

              <h3 style={{ fontSize: 13, margin: "20px 0 10px", color: "var(--muted)" }}>Questions</h3>
              <div className="admin-grid">
                <details className="admin-editor admin-add">
                  <summary>Add a question</summary>
                  <div className="editor-body">
                    <form action={saveFaqItem} className="admin-form">
                      <input type="hidden" name="groupId" value={g.id} />
                      <div className="row">
                        <label>
                          Position
                          <input
                            name="position"
                            type="number"
                            defaultValue={g.items.length + 1}
                            min={1}
                            style={{ maxWidth: 90 }}
                          />
                        </label>
                        <label>
                          Question
                          <input name="question" placeholder="New question" required />
                        </label>
                      </div>
                      <label>
                        Answer
                        <textarea name="answer" rows={3} placeholder="Answer copy" />
                      </label>
                      <span className="inline">
                        <input id={`pub-new-${g.id}`} name="published" type="checkbox" defaultChecked />
                        <label htmlFor={`pub-new-${g.id}`} style={{ display: "inline" }}>
                          Published
                        </label>
                      </span>
                      <div>
                        <button type="submit" className="btn-admin">
                          Create question
                        </button>
                      </div>
                    </form>
                  </div>
                </details>

                {g.items.map((item) => (
                  <form key={item.id} action={saveFaqItem} className="admin-form admin-card" style={{ marginBottom: 0 }}>
                    <input type="hidden" name="id" value={item.id} />
                    <div className="row">
                      <label>
                        Position
                        <input
                          name="position"
                          type="number"
                          defaultValue={item.position}
                          min={1}
                          style={{ maxWidth: 90 }}
                        />
                      </label>
                      <label>
                        Question
                        <input name="question" defaultValue={item.question} required />
                      </label>
                    </div>
                    <label>
                      Answer
                      <textarea name="answer" rows={3} defaultValue={item.answer} />
                    </label>
                    <span className="inline">
                      <input
                        id={`pub-${item.id}`}
                        name="published"
                        type="checkbox"
                        defaultChecked={item.published}
                      />
                      <label htmlFor={`pub-${item.id}`} style={{ display: "inline" }}>
                        Published
                      </label>
                    </span>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button type="submit" className="btn-admin small">
                        Save
                      </button>
                      <button type="submit" className="btn-admin danger small" formAction={deleteFaqItem}>
                        Delete
                      </button>
                    </div>
                  </form>
                ))}

              </div>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
