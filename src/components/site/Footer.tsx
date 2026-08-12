import Link from "next/link";
import { getServices, getProducts, getSettings } from "@/lib/content";
import Brandmark from "./Brandmark";

export default async function Footer() {
  const [services, products, settings] = await Promise.all([getServices(), getProducts(), getSettings()]);
  const year = new Date().getFullYear();
  const logoSrc = settings.logoData ? `/api/brand/logo?v=${settings.assetVersion}` : null;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="wordmark" style={{ marginBottom: 14 }}>
              <Brandmark wordmark={settings.wordmark} logoSrc={logoSrc} logoAlt={settings.logoAlt} height={logoSrc ? 46 : 28} />
            </div>
            <p style={{ color: "var(--muted)", fontSize: 14, maxWidth: "30ch" }}>{settings.tagline}</p>
            <div className="footer-contact">
              {settings.contactEmail && <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>}
              {settings.phone && <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}>{settings.phone}</a>}
            </div>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            {services.map((s) => (
              <Link key={s.id} href="/services">
                {s.title}
              </Link>
            ))}
          </div>
          <div className="footer-col">
            <h4>Products</h4>
            {products.map((p) => (
              <Link key={p.id} href="/products">
                {p.title}
              </Link>
            ))}
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link href="/platform">Platform</Link>
            <Link href="/work">Case studies</Link>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
          </div>
        </div>
        <div className="footer-meta">
          <span>
            © {year} {settings.orgName}
          </span>
          <span>{settings.footerNote}</span>
        </div>
      </div>
    </footer>
  );
}
