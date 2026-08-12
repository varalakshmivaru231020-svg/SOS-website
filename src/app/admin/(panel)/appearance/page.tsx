import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { updateSiteSettings } from "@/lib/actions/admin/settings";

// Admin-only singleton editor for SiteSettings (id 1). One form, one action.
const ACCENT_PRESETS: { key: string; label: string; hex: string }[] = [
  { key: "terracotta", label: "Terracotta", hex: "#b8502a" },
  { key: "moss", label: "Moss", hex: "#1c7d55" },
  { key: "indigo", label: "Indigo", hex: "#2b3a8f" },
  { key: "plum", label: "Plum", hex: "#7a3ea8" },
];

export default async function AppearanceAdminPage() {
  await requireSession("ADMIN");

  const stored = await db.siteSettings.findUnique({ where: { id: 1 } });
  const settings = stored ?? {
    id: 1,
    accentPreset: "terracotta",
    accentColor: "#b8502a",
    motionIntensity: 1,
    cursorEffects: true,
    orgName: "Supreme One Software Pvt Ltd",
    tagline: "",
    contactEmail: "hello@supremeonesoftware.com",
    footerNote: "",
  };

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="serif">Appearance</h1>
          <p className="sub">Site-wide look, motion, and organisation details.</p>
        </div>
      </div>

      <form action={updateSiteSettings} className="admin-form admin-card">
        <div>
          <span style={{ display: "block", fontSize: 12, color: "var(--muted)", fontWeight: 500, marginBottom: 8 }}>
            Accent colour
          </span>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
            {ACCENT_PRESETS.map((p) => (
              <span key={p.key} className="inline">
                <input
                  id={`accent-${p.key}`}
                  type="radio"
                  name="accentPreset"
                  value={p.key}
                  defaultChecked={settings.accentPreset === p.key}
                  style={{ width: "auto" }}
                />
                <label htmlFor={`accent-${p.key}`} className="inline" style={{ cursor: "pointer" }}>
                  <span
                    aria-hidden
                    style={{
                      display: "inline-block",
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: p.hex,
                      border: "1px solid var(--line)",
                    }}
                  />
                  {p.label}
                </label>
              </span>
            ))}
          </div>
          <label style={{ marginTop: 12, maxWidth: 260 }}>
            Custom hex (wins when filled)
            <input
              name="accentCustom"
              placeholder="#a1b2c3"
              defaultValue={settings.accentPreset === "custom" ? settings.accentColor : ""}
            />
          </label>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
            Changes apply to the whole site instantly.
          </p>
        </div>

        <div className="row">
          <label>
            Motion intensity (currently {settings.motionIntensity})
            <input
              name="motionIntensity"
              type="range"
              min={0}
              max={1.6}
              step={0.1}
              defaultValue={settings.motionIntensity}
            />
          </label>
          <span className="inline" style={{ alignSelf: "end" }}>
            <input
              id="cursor-effects"
              name="cursorEffects"
              type="checkbox"
              defaultChecked={settings.cursorEffects}
            />
            <label htmlFor="cursor-effects" style={{ display: "inline" }}>
              Cursor effects
            </label>
          </span>
        </div>

        <div className="row">
          <label>
            Organisation name
            <input name="orgName" defaultValue={settings.orgName} required />
          </label>
          <label>
            Contact email (enquiry notifications are sent here)
            <input name="contactEmail" type="email" defaultValue={settings.contactEmail} required />
          </label>
        </div>
        <label>
          Tagline
          <input name="tagline" defaultValue={settings.tagline} />
        </label>
        <label>
          Footer note
          <input name="footerNote" defaultValue={settings.footerNote} />
        </label>

        <div>
          <button type="submit" className="btn-admin">
            Save appearance
          </button>
        </div>
      </form>
    </>
  );
}
