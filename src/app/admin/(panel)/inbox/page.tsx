import Link from "next/link";
import { db } from "@/lib/db";
import { setSubmissionStatus, bulkMarkRead, deleteSubmission } from "@/lib/actions/admin/inbox";

const STATUSES = ["NEW", "READ", "ARCHIVED"] as const;
type Status = (typeof STATUSES)[number];

const TABS: { label: string; href: string; value?: Status }[] = [
  { label: "All", href: "/admin/inbox" },
  { label: "New", href: "/admin/inbox?status=NEW", value: "NEW" },
  { label: "Read", href: "/admin/inbox?status=READ", value: "READ" },
  { label: "Archived", href: "/admin/inbox?status=ARCHIVED", value: "ARCHIVED" },
];

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function chipClass(status: Status): string {
  if (status === "NEW") return "chip-admin new";
  if (status === "READ") return "chip-admin ok";
  return "chip-admin";
}

export default async function InboxAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = STATUSES.find((s) => s === status);
  const submissions = await db.contactSubmission.findMany({
    where: filter ? { status: filter } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="serif">Inbox</h1>
          <p className="sub">Contact form submissions, newest first.</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <form action={bulkMarkRead}>
            <button type="submit" className="btn-admin">
              Mark all read
            </button>
          </form>
          <a href="/api/admin/inbox/export" className="btn-admin ghost">
            Export CSV
          </a>
        </div>
      </div>

      <div className="admin-tabs">
        {TABS.map((t) => (
          <Link key={t.label} href={t.href} className={t.value === filter ? "active" : undefined}>
            {t.label}
          </Link>
        ))}
      </div>

      <div className="admin-grid">
        {submissions.length === 0 && (
          <div className="admin-card">
            <p style={{ color: "var(--muted)", fontSize: 14 }}>
              No submissions{filter ? ` with status ${filter}` : " yet"}.
            </p>
          </div>
        )}

        {submissions.map((s) => (
          <details key={s.id} className="admin-editor">
            <summary>
              {dateFmt.format(s.createdAt)} — {s.name}
              <span className="muted">{[s.company, s.need].filter(Boolean).join(" · ")}</span>
              <span className={chipClass(s.status)}>{s.status}</span>
            </summary>
            <div className="editor-body">
              <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 10px" }}>
                <a href={`mailto:${s.email}`}>{s.email}</a>
                {s.company ? ` · ${s.company}` : ""} · {s.need}
              </p>
              <p style={{ whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.6, margin: "0 0 16px" }}>
                {s.brief}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <form action={setSubmissionStatus}>
                  <input type="hidden" name="id" value={s.id} />
                  <input type="hidden" name="status" value={s.status === "NEW" ? "READ" : "NEW"} />
                  <button type="submit" className="btn-admin ghost small">
                    {s.status === "NEW" ? "Mark read" : "Mark unread"}
                  </button>
                </form>
                {s.status !== "ARCHIVED" && (
                  <form action={setSubmissionStatus}>
                    <input type="hidden" name="id" value={s.id} />
                    <input type="hidden" name="status" value="ARCHIVED" />
                    <button type="submit" className="btn-admin ghost small">
                      Archive
                    </button>
                  </form>
                )}
                <form action={deleteSubmission}>
                  <input type="hidden" name="id" value={s.id} />
                  <button type="submit" className="btn-admin danger small">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
