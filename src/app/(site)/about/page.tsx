import Link from "next/link";
import type { Metadata } from "next";
import { getTimeline, getOffices, getTeam, getSettings, asStringArray } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { demoHref } from "@/content";
import { ABOUT, HOME } from "@/content/site";
import PageHero from "@/components/site/PageHero";
import SectionHead from "@/components/site/SectionHead";
import CtaBanner from "@/components/site/CtaBanner";
import { LinkCard, Steps } from "@/components/site/Cards";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/about", ABOUT.seo);
}

export default async function AboutPage() {
  const [timeline, offices, team, settings] = await Promise.all([getTimeline(), getOffices(), getTeam(), getSettings()]);
  const office = offices[0];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Our Story", href: "/about" }]}
        eyebrow={ABOUT.eyebrow}
        title={ABOUT.headline}
        accent={ABOUT.accent}
        lede={ABOUT.intro}
        actions={
          <>
            <Link href={demoHref()} className="btn btn-accent" data-magnet>
              Book a Demo
            </Link>
            <Link href="/contact" className="btn btn-ghost" data-magnet>
              Contact us
            </Link>
          </>
        }
      />

      {/* ── What we do ── */}
      <section className="section section-line">
        <div className="container">
          <SectionHead eyebrow="What we do" heading="Engineering and messaging under one roof" accent="one roof" />
          <div className="card-grid two">
            <LinkCard href="/products" title={ABOUT.whatWeDo[0].title} note={ABOUT.whatWeDo[0].copy} />
            <LinkCard href="/services" title={ABOUT.whatWeDo[1].title} note={ABOUT.whatWeDo[1].copy} delay={0.06} />
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="section section-line tint">
        <div className="container narrow">
          <span className="eyebrow" data-reveal>
            Our mission
          </span>
          <p className="problem serif" data-reveal data-delay="0.06">
            {ABOUT.mission}
          </p>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section section-line">
        <div className="container">
          <SectionHead eyebrow="What we stand for" heading="How we show up for customers" accent="show up" />
          <div className="why-grid">
            {ABOUT.values.map((v, i) => (
              <div key={v.title} className="why-item" data-reveal data-delay={0.07 * i}>
                <span className="why-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="h3 serif">{v.title}</h3>
                <p>{v.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How we work ── */}
      <section className="section section-line tint">
        <div className="container">
          <SectionHead eyebrow="How we work" heading="Discover, design, build, launch" accent="launch" />
          <Steps steps={ABOUT.process} />
        </div>
      </section>

      {/* ── Milestones (Admin → About page → Timeline) ── */}
      {timeline.length > 0 && (
        <section className="section section-line">
          <div className="container narrow">
            <SectionHead eyebrow="Milestones" heading="Since 2015" accent="2015" />
            <ol className="timeline">
              {timeline.map((t, i) => (
                <li key={t.id} data-reveal data-delay={0.05 * i}>
                  <span className="serif">{t.year}</span>
                  <p>
                    {t.title && <b>{t.title}. </b>}
                    {t.copy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ── Team (Admin → About page → Team) ── */}
      {team.length > 0 && (
        <section className="section section-line">
          <div className="container">
            <SectionHead eyebrow="Our team" heading="The people behind the platform" accent="behind" />
            <div className="team">
              {team.map((m, i) => (
                <div key={m.id} className="member" data-reveal data-delay={0.05 * i}>
                  {m.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- admin-entered URL, any host
                    <img src={m.photoUrl} alt="" className="member-photo" />
                  ) : (
                    <span className="member-photo initials" aria-hidden="true">
                      {m.name
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                  )}
                  <h3 className="serif">{m.name}</h3>
                  <p className="member-role">{m.role}</p>
                  {m.bio && <p>{m.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Company details ── */}
      <section className="section section-line">
        <div className="container narrow">
          <SectionHead eyebrow="Company details" heading={settings.orgName} />
          <dl className="biz-details wide" data-reveal>
            <div>
              <dt>Established</dt>
              <dd>2015</dd>
            </div>
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
            {office && (
              <div>
                <dt>Registered office</dt>
                <dd>{asStringArray(office.addressLines).join(", ")}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      <CtaBanner heading={HOME.banner.heading} accent={HOME.banner.accent} />
    </>
  );
}
