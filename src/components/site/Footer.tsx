import Link from "next/link";
import { getOffices, getSettings, asSocialLinks, asStringArray } from "@/lib/content";
import { getIndustry, getProduct, getService, industryHref, productHref, serviceHref } from "@/content";
import Brandmark from "./Brandmark";

// Footer columns as specified in the content guide. Company details (CIN, GST,
// socials) come from Admin → Brand & contact and only appear once filled in.
const PRODUCT_LINKS = (["whatsapp-business-api", "ivr-solutions", "no-code-chatbot", "campaigns", "unified-team-inbox"] as const)
  .map(getProduct)
  .filter((p) => p !== undefined)
  .map((p) => ({ href: productHref(p.slug), label: p.name }));

const INDUSTRY_SERVICE_LINKS = [
  ...(["retail-e-commerce", "healthcare"] as const)
    .map(getIndustry)
    .filter((i) => i !== undefined)
    .map((i) => ({ href: industryHref(i.slug), label: i.name })),
  ...(["mobile-app-development", "website-development"] as const)
    .map(getService)
    .filter((s) => s !== undefined)
    .map((s) => ({ href: serviceHref(s.slug), label: s.name })),
];

export default async function Footer() {
  const [settings, offices] = await Promise.all([getSettings(), getOffices()]);
  const year = new Date().getFullYear();
  const logoSrc = settings.logoData ? `/api/brand/logo?v=${settings.assetVersion}` : null;
  const office = offices[0];
  const socials = asSocialLinks(settings.socialLinks);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="wordmark" aria-label={`${settings.wordmark} — home`}>
              <Brandmark wordmark={settings.wordmark} logoSrc={logoSrc} logoAlt={settings.logoAlt} height={logoSrc ? 52 : 28} />
            </Link>
            {settings.tagline && <p className="footer-tagline">{settings.tagline}</p>}
            <div className="footer-contact">
              {settings.contactEmail && <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>}
              {settings.phone && <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}>{settings.phone}</a>}
              {office && (
                <address>
                  {asStringArray(office.addressLines).map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              )}
            </div>
            {socials.length > 0 && (
              <ul className="footer-social">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="footer-col">
            <h2>Products</h2>
            {PRODUCT_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
            <Link href="/products">All products →</Link>
          </div>
          <div className="footer-col">
            <h2>Industries &amp; services</h2>
            {INDUSTRY_SERVICE_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
            <Link href="/industries">All industries →</Link>
          </div>
          <div className="footer-col">
            <h2>Company</h2>
            <Link href="/about">About</Link>
            <Link href="/customers">Customers</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/partners">Partner with us</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <h2>Legal</h2>
            <Link href="/legal/privacy">Privacy Policy</Link>
            <Link href="/legal/terms">Terms &amp; Conditions</Link>
            <Link href="/legal/cookies">Cookie Policy</Link>
            <Link href="/legal/acceptable-use">Acceptable Use</Link>
          </div>
        </div>
        <div className="footer-meta">
          <span>
            © {year} {settings.orgName}. All Rights Reserved.
          </span>
          {(settings.cin || settings.gst) && (
            <span>
              {[settings.cin && `CIN ${settings.cin}`, settings.gst && `GST ${settings.gst}`].filter(Boolean).join(" · ")}
            </span>
          )}
          {settings.footerNote && <span>{settings.footerNote}</span>}
        </div>
      </div>
    </footer>
  );
}
