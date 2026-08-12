import Link from "next/link";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const [unread, total, services, products, cases, faqs, latest] = await Promise.all([
    db.contactSubmission.count({ where: { status: "NEW" } }),
    db.contactSubmission.count(),
    db.service.count(),
    db.product.count(),
    db.caseStudy.count(),
    db.faqItem.count(),
    db.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="serif">Dashboard</h1>
          <p className="sub">Everything on the site is editable from here — changes go live in seconds.</p>
        </div>
        <Link href="/admin/inbox" className="btn-admin">
          Open inbox {unread > 0 ? `(${unread} new)` : ""}
        </Link>
      </div>

      <div className="admin-grid cols" style={{ marginBottom: 20 }}>
        {[
          { v: unread, l: "Unread enquiries", href: "/admin/inbox" },
          { v: total, l: "Total enquiries", href: "/admin/inbox" },
          { v: services, l: "Services", href: "/admin/services" },
          { v: products, l: "Products", href: "/admin/products" },
          { v: cases, l: "Case studies", href: "/admin/work" },
          { v: faqs, l: "FAQ items", href: "/admin/faqs" },
        ].map((s) => (
          <Link key={s.l} href={s.href} className="admin-card stat-tile" style={{ marginBottom: 0 }}>
            <span className="v">{s.v}</span>
            <span className="l">{s.l}</span>
          </Link>
        ))}
      </div>

      <div className="admin-card">
        <h2 style={{ fontSize: 16, marginBottom: 12 }}>Latest enquiries</h2>
        {latest.length === 0 ? (
          <p style={{ color: "var(--muted)", fontSize: 14 }}>Nothing yet — enquiries from the contact form land here.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Need</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {latest.map((s) => (
                  <tr key={s.id} className={s.status === "NEW" ? "unread" : undefined}>
                    <td>{s.createdAt.toISOString().slice(0, 10)}</td>
                    <td>{s.name}</td>
                    <td>{s.company ?? "—"}</td>
                    <td>{s.need}</td>
                    <td>
                      <span className={`chip-admin ${s.status === "NEW" ? "new" : ""}`}>{s.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
