import Link from "next/link";
import type { Metadata } from "next";
import { getOffices, getFaqGroup, getSettings, asStringArray } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { INTEREST_GROUPS, demoHref } from "@/content";
import PageHero from "@/components/site/PageHero";
import SectionHead from "@/components/site/SectionHead";
import ContactForm from "@/components/site/ContactForm";
import FaqAccordion from "@/components/site/FaqAccordion";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/contact", {
    title: "Contact | Supreme One Software",
    description:
      "Talk to Supreme One Software about WhatsApp Business API, chatbots, campaigns, IVR or a custom app or website. Sales, support and our Bengaluru office.",
  });
}

const tel = (v: string) => v.replace(/[^\d+]/g, "");
const wa = (v: string) => v.replace(/\D/g, "");

export default async function ContactPage() {
  const [offices, faq, settings] = await Promise.all([getOffices(), getFaqGroup("contact"), getSettings()]);
  const office = offices[0];
  const address = office ? asStringArray(office.addressLines) : [];
  // A keyless embed: Google resolves the address itself, so there is no API
  // key to manage and the map follows the office edited in the admin panel.
  const mapSrc = address.length
    ? `https://www.google.com/maps?q=${encodeURIComponent(address.join(", "))}&output=embed`
    : null;

  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact", href: "/contact" }]}
        eyebrow="Contact"
        title="Talk to our team"
        accent="our team"
        lede="Tell us what you need — a demo, a quote or a custom build — and we’ll get back to you."
        actions={
          <Link href={demoHref()} className="btn btn-accent" data-magnet>
            Book a Demo
          </Link>
        }
      />

      {/* ── Ways to reach us ── */}
      <section className="section section-line">
        <div className="container">
          <div className="route-grid">
            <div className="route" data-reveal>
              <span className="eyebrow">Sales &amp; demos</span>
              <ul>
                {settings.contactEmail && (
                  <li>
                    <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>
                  </li>
                )}
                {settings.phone && (
                  <li>
                    <a href={`tel:${tel(settings.phone)}`}>{settings.phone}</a>
                  </li>
                )}
                {settings.whatsappNumber && (
                  <li>
                    <a href={`https://wa.me/${wa(settings.whatsappNumber)}`} target="_blank" rel="noopener noreferrer">
                      WhatsApp us
                    </a>
                  </li>
                )}
              </ul>
            </div>
            {settings.supportEmail && settings.supportEmail !== settings.contactEmail && (
              <div className="route" data-reveal data-delay="0.06">
                <span className="eyebrow">Customer support</span>
                <ul>
                  <li>
                    <a href={`mailto:${settings.supportEmail}`}>{settings.supportEmail}</a>
                  </li>
                </ul>
              </div>
            )}
            {settings.businessHours && (
              <div className="route" data-reveal data-delay="0.12">
                <span className="eyebrow">Business hours</span>
                <p>{settings.businessHours}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── The form ── */}
      <section className="section section-line tint" id="enquiry">
        <div className="container narrow">
          <SectionHead eyebrow="Enquiry" heading="Send us a message" accent="message" />
          <div className="form-card" data-reveal data-delay="0.1">
            <ContactForm groups={INTEREST_GROUPS} />
          </div>
        </div>
      </section>

      {/* ── Registered office ── */}
      {office && (
        <section className="section section-line">
          <div className="container office">
            <div>
              <SectionHead eyebrow="Registered office" heading={settings.orgName} />
              <address className="office-address" data-reveal>
                {address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              {(settings.cin || settings.gst) && (
                <dl className="biz-details" data-reveal>
                  {settings.cin && (
                    <div>
                      <dt>CIN</dt>
                      <dd>{settings.cin}</dd>
                    </div>
                  )}
                  {settings.gst && (
                    <div>
                      <dt>GST</dt>
                      <dd>{settings.gst}</dd>
                    </div>
                  )}
                </dl>
              )}
            </div>
            {mapSrc && (
              <div className="map" data-reveal data-delay="0.1">
                <iframe
                  src={mapSrc}
                  title={`Map showing ${office.city} office`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {faq && faq.items.length > 0 && (
        <section className="section section-line tint">
          <div className="container narrow">
            <SectionHead eyebrow="Before you write" heading={faq.title} />
            <div className="faq-wrap" data-reveal data-delay="0.1">
              <FaqAccordion items={faq.items.map((i) => ({ id: i.id, question: i.question, answer: i.answer }))} />
            </div>
            <p className="faq-more" data-reveal>
              More answers on the <Link href="/faq">FAQ page</Link>.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
