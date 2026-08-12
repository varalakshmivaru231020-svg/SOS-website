import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import EffectsProvider from "@/components/motion/EffectsProvider";
import TitleSequence from "@/components/motion/TitleSequence";
import Atmosphere from "@/components/motion/Atmosphere";
import FloatingActions from "@/components/site/FloatingActions";
import { getSettings } from "@/lib/content";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const assetVersion = settings.assetVersion;
  const logoSrc = settings.logoData ? `/api/brand/logo?v=${assetVersion}` : null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.orgName,
    description: settings.tagline,
    email: settings.contactEmail,
    foundingDate: "2015",
    location: ["Bengaluru, Karnataka, India"],
    url: "https://www.supremeonesoftware.com",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TitleSequence wordmark={settings.wordmark} />
      <div className="grid-overlay" aria-hidden="true" />
      <Atmosphere />
      <EffectsProvider />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header wordmark={settings.wordmark} logoSrc={logoSrc} logoAlt={settings.logoAlt} />
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
