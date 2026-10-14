import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import EffectsProvider from "@/components/motion/EffectsProvider";
import FloatingActions from "@/components/site/FloatingActions";
import SiteScripts from "@/components/site/SiteScripts";
import NavProgress from "@/components/site/NavProgress";
import JsonLd from "@/components/site/JsonLd";
import { getOffices, getSettings, asSocialLinks, asStringArray } from "@/lib/content";
import { buildMenu } from "@/content";
import { SITE_URL } from "@/lib/site-url";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, offices] = await Promise.all([getSettings(), getOffices()]);
  const logoSrc = settings.logoData ? `/api/brand/logo?v=${settings.assetVersion}` : null;
  const office = offices[0];
  const lines = office ? asStringArray(office.addressLines) : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.orgName,
    url: SITE_URL,
    description: settings.tagline || undefined,
    email: settings.contactEmail || undefined,
    telephone: settings.phone || undefined,
    foundingDate: "2025",
    logo: logoSrc ? `${SITE_URL}${logoSrc}` : undefined,
    address: office
      ? {
          "@type": "PostalAddress",
          streetAddress: lines.slice(0, -1).join(", "),
          addressLocality: office.city,
          addressCountry: office.country,
        }
      : undefined,
    sameAs: asSocialLinks(settings.socialLinks).map((s) => s.url),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <EffectsProvider />
      <SiteScripts />
      <NavProgress />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header menu={buildMenu()} wordmark={settings.wordmark} logoSrc={logoSrc} logoAlt={settings.logoAlt} />
      <main id="main" className="page-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <FloatingActions
        whatsappNumber={settings.whatsappNumber}
        whatsappMessage={settings.whatsappMessage}
        whatsappEnabled={settings.whatsappEnabled}
        phone={settings.phone}
        callEnabled={settings.callEnabled}
        scope={settings.floatingScope}
      />
    </>
  );
}
