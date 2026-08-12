import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { logout } from "@/lib/actions/auth";
import { db } from "@/lib/db";
import "../admin.css";

export const dynamic = "force-dynamic";

const NAV: { href: string; label: string; adminOnly?: boolean }[] = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/inbox", label: "Inbox" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/work", label: "Case studies" },
  { href: "/admin/pricing", label: "Pricing" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/about", label: "About page" },
  { href: "/admin/site-blocks", label: "Site blocks" },
  { href: "/admin/brand", label: "Brand & contact", adminOnly: true },
  { href: "/admin/appearance", label: "Appearance", adminOnly: true },
  { href: "/admin/seo", label: "SEO", adminOnly: true },
  { href: "/admin/users", label: "Users", adminOnly: true },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  const unread = await db.contactSubmission.count({ where: { status: "NEW" } });

  return (
    <div className="admin-root">
      <aside className="admin-side">
        <Link href="/admin" className="wordmark">
          Supreme One Software<b>.</b>
        </Link>
        <nav aria-label="Admin">
          {NAV.filter((n) => !n.adminOnly || session.role === "ADMIN").map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
              {n.href === "/admin/inbox" && unread > 0 && <span className="chip-admin new">{unread}</span>}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: "auto", display: "grid", gap: 10, paddingInline: 10 }}>
          <a href="/" target="_blank" rel="noopener" style={{ fontSize: 12.5, color: "var(--muted)" }}>
            View site ↗
          </a>
          <div style={{ fontSize: 12.5, color: "var(--muted)" }}>
            {session.name} · {session.role.toLowerCase()}
          </div>
          <form action={logout}>
            <button type="submit" className="btn-admin ghost small">
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
