import Link from "next/link";
import { db } from "@/lib/db";
import { asStringArray } from "@/lib/content";
import {
  saveTeamMember,
  deleteTeamMember,
  saveOffice,
  deleteOffice,
  saveTimelineEntry,
  deleteTimelineEntry,
} from "@/lib/actions/admin/about";

type Tab = "team" | "offices" | "timeline";

const TABS: { tab: Tab; label: string }[] = [
  { tab: "team", label: "Team" },
  { tab: "offices", label: "Offices" },
  { tab: "timeline", label: "Timeline" },
];

export default async function AboutAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const active: Tab = tab === "offices" ? "offices" : tab === "timeline" ? "timeline" : "team";

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="serif">About page</h1>
          <p className="sub">Team, offices and company timeline. Position controls order in each list.</p>
        </div>
      </div>

      <nav className="admin-tabs">
        {TABS.map((t) => (
          <Link key={t.tab} href={`/admin/about?tab=${t.tab}`} className={t.tab === active ? "active" : undefined}>
            {t.label}
          </Link>
        ))}
      </nav>

      {active === "team" && <TeamTab />}
      {active === "offices" && <OfficesTab />}
      {active === "timeline" && <TimelineTab />}
    </>
  );
}

async function TeamTab() {
  const members = await db.teamMember.findMany({ orderBy: { position: "asc" } });

  return (
    <div className="admin-grid">
      {members.map((m) => (
        <details key={m.id} className="admin-editor">
          <summary>
            {m.name} — {m.role}
            <span className="muted">{m.published ? "published" : "hidden"}</span>
          </summary>
          <div className="editor-body">
            <form action={saveTeamMember} className="admin-form">
              <input type="hidden" name="id" value={m.id} />
              <div className="row">
                <label>
                  Position
                  <input name="position" type="number" defaultValue={m.position} min={1} />
                </label>
                <label>
                  Name
                  <input name="name" defaultValue={m.name} required />
                </label>
                <label>
                  Role
                  <input name="role" defaultValue={m.role} />
                </label>
              </div>
              <label>
                Bio
                <textarea name="bio" rows={3} defaultValue={m.bio} />
              </label>
              <label>
                Photo URL (optional)
                <input name="photoUrl" defaultValue={m.photoUrl ?? ""} placeholder="https://…" />
              </label>
              <span className="inline">
                <input id={`team-pub-${m.id}`} name="published" type="checkbox" defaultChecked={m.published} />
                <label htmlFor={`team-pub-${m.id}`} style={{ display: "inline" }}>
                  Published
                </label>
              </span>
              <div>
                <button type="submit" className="btn-admin">
                  Save member
                </button>
              </div>
            </form>
            <form action={deleteTeamMember} style={{ marginTop: 16 }}>
              <input type="hidden" name="id" value={m.id} />
              <button type="submit" className="btn-admin danger small">
                Delete this member
              </button>
            </form>
          </div>
        </details>
      ))}

      <details className="admin-editor">
        <summary>+ Add a team member</summary>
        <div className="editor-body">
          <form action={saveTeamMember} className="admin-form">
            <div className="row">
              <label>
                Position
                <input name="position" type="number" defaultValue={members.length + 1} min={1} />
              </label>
              <label>
                Name
                <input name="name" required />
              </label>
              <label>
                Role
                <input name="role" placeholder="e.g. Principal Engineer" />
              </label>
            </div>
            <label>
              Bio
              <textarea name="bio" rows={3} />
            </label>
            <label>
              Photo URL (optional)
              <input name="photoUrl" placeholder="https://…" />
            </label>
            <span className="inline">
              <input id="team-pub-new" name="published" type="checkbox" defaultChecked />
              <label htmlFor="team-pub-new" style={{ display: "inline" }}>
                Published
              </label>
            </span>
            <div>
              <button type="submit" className="btn-admin">
                Create member
              </button>
            </div>
          </form>
        </div>
      </details>
    </div>
  );
}

async function OfficesTab() {
  const offices = await db.office.findMany({ orderBy: { position: "asc" } });

  return (
    <div className="admin-grid">
      {offices.map((o) => (
        <details key={o.id} className="admin-editor">
          <summary>
            {o.city}, {o.country}
            <span className="muted">
              {o.tag ? `${o.tag} · ` : ""}
              {o.published ? "published" : "hidden"}
            </span>
          </summary>
          <div className="editor-body">
            <form action={saveOffice} className="admin-form">
              <input type="hidden" name="id" value={o.id} />
              <div className="row">
                <label>
                  Position
                  <input name="position" type="number" defaultValue={o.position} min={1} />
                </label>
                <label>
                  City
                  <input name="city" defaultValue={o.city} required />
                </label>
                <label>
                  Country
                  <input name="country" defaultValue={o.country} />
                </label>
                <label>
                  Tag (optional)
                  <input name="tag" defaultValue={o.tag ?? ""} placeholder="e.g. HQ" />
                </label>
              </div>
              <label>
                Address lines (one per line)
                <textarea name="addressLines" rows={4} defaultValue={asStringArray(o.addressLines).join("\n")} />
              </label>
              <span className="inline">
                <input id={`office-pub-${o.id}`} name="published" type="checkbox" defaultChecked={o.published} />
                <label htmlFor={`office-pub-${o.id}`} style={{ display: "inline" }}>
                  Published
                </label>
              </span>
              <div>
                <button type="submit" className="btn-admin">
                  Save office
                </button>
              </div>
            </form>
            <form action={deleteOffice} style={{ marginTop: 16 }}>
              <input type="hidden" name="id" value={o.id} />
              <button type="submit" className="btn-admin danger small">
                Delete this office
              </button>
            </form>
          </div>
        </details>
      ))}

      <details className="admin-editor">
        <summary>+ Add an office</summary>
        <div className="editor-body">
          <form action={saveOffice} className="admin-form">
            <div className="row">
              <label>
                Position
                <input name="position" type="number" defaultValue={offices.length + 1} min={1} />
              </label>
              <label>
                City
                <input name="city" required />
              </label>
              <label>
                Country
                <input name="country" />
              </label>
              <label>
                Tag (optional)
                <input name="tag" placeholder="e.g. HQ" />
              </label>
            </div>
            <label>
              Address lines (one per line)
              <textarea name="addressLines" rows={4} />
            </label>
            <span className="inline">
              <input id="office-pub-new" name="published" type="checkbox" defaultChecked />
              <label htmlFor="office-pub-new" style={{ display: "inline" }}>
                Published
              </label>
            </span>
            <div>
              <button type="submit" className="btn-admin">
                Create office
              </button>
            </div>
          </form>
        </div>
      </details>
    </div>
  );
}

async function TimelineTab() {
  const entries = await db.timelineEntry.findMany({ orderBy: { position: "asc" } });

  return (
    <div className="admin-grid">
      {entries.map((e) => (
        <details key={e.id} className="admin-editor">
          <summary>
            {e.year}
            {e.title ? ` — ${e.title}` : ""}
            <span className="muted">{e.published ? "published" : "hidden"}</span>
          </summary>
          <div className="editor-body">
            <form action={saveTimelineEntry} className="admin-form">
              <input type="hidden" name="id" value={e.id} />
              <div className="row">
                <label>
                  Position
                  <input name="position" type="number" defaultValue={e.position} min={1} />
                </label>
                <label>
                  Year
                  <input name="year" defaultValue={e.year} required />
                </label>
                <label>
                  Title (optional)
                  <input name="title" defaultValue={e.title} />
                </label>
              </div>
              <label>
                Copy
                <textarea name="copy" rows={3} defaultValue={e.copy} />
              </label>
              <span className="inline">
                <input id={`tl-pub-${e.id}`} name="published" type="checkbox" defaultChecked={e.published} />
                <label htmlFor={`tl-pub-${e.id}`} style={{ display: "inline" }}>
                  Published
                </label>
              </span>
              <div>
                <button type="submit" className="btn-admin">
                  Save entry
                </button>
              </div>
            </form>
            <form action={deleteTimelineEntry} style={{ marginTop: 16 }}>
              <input type="hidden" name="id" value={e.id} />
              <button type="submit" className="btn-admin danger small">
                Delete this entry
              </button>
            </form>
          </div>
        </details>
      ))}

      <details className="admin-editor">
        <summary>+ Add a timeline entry</summary>
        <div className="editor-body">
          <form action={saveTimelineEntry} className="admin-form">
            <div className="row">
              <label>
                Position
                <input name="position" type="number" defaultValue={entries.length + 1} min={1} />
              </label>
              <label>
                Year
                <input name="year" placeholder="2024" required />
              </label>
              <label>
                Title (optional)
                <input name="title" />
              </label>
            </div>
            <label>
              Copy
              <textarea name="copy" rows={3} />
            </label>
            <span className="inline">
              <input id="tl-pub-new" name="published" type="checkbox" defaultChecked />
              <label htmlFor="tl-pub-new" style={{ display: "inline" }}>
                Published
              </label>
            </span>
            <div>
              <button type="submit" className="btn-admin">
                Create entry
              </button>
            </div>
          </form>
        </div>
      </details>
    </div>
  );
}
