import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { updateBrand } from "@/lib/actions/admin/brand";

// Admin-only editor for the brand marks, published contact details, and the
// floating WhatsApp / call buttons. Writes the same SiteSettings singleton the
// Appearance screen uses.
export default async function BrandAdminPage() {
  await requireSession("ADMIN");

  const s = await db.siteSettings.findUnique({ where: { id: 1 } });
  const v = String(s?.updatedAt?.getTime() ?? 0);

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="serif">Brand &amp; contact</h1>
          <p className="sub">Logo, browser icon, the contact details shown across the site, and the floating buttons.</p>
        </div>
      </div>

      <form action={updateBrand} className="admin-form admin-card">
        <h2 style={{ fontSize: 15, fontWeight: 600 }}>Logo</h2>
        <p style={{ fontSize: 13, color: "var(--muted)", marginTop: -8 }}>
          PNG, SVG, JPEG or WebP up to 512&nbsp;KB. Leave empty to use the text wordmark below.
        </p>
        <div className="row">
          <label>
            Upload a logo
            <input type="file" name="logo" accept="image/png,image/jpeg,image/svg+xml,image/webp" />
          </label>
          <label>
            Logo alt text
            <input name="logoAlt" defaultValue={s?.logoAlt ?? ""} placeholder="Supreme One Software" />
          </label>
        </div>
        {s?.logoData && (
          <div className="inline" style={{ gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/brand/logo?v=${v}`}
              alt="Current logo"
              style={{ height: 34, background: "var(--paper3)", padding: 6, borderRadius: 8 }}
            />
            <label className="inline" style={{ fontSize: 13 }}>
              <input type="checkbox" name="removeLogo" style={{ width: "auto" }} /> Remove logo
            </label>
          </div>
        )}
        <label style={{ maxWidth: 320 }}>
          Wordmark text (used when there is no logo)
          <input name="wordmark" defaultValue={s?.wordmark ?? "Supreme One Software"} />
        </label>

        <h2 style={{ fontSize: 15, fontWeight: 600, marginTop: 10 }}>Browser icon (favicon)</h2>
        <p style={{ fontSize: 13, color: "var(--muted)", marginTop: -8 }}>
          A square PNG, SVG or ICO — 64&times;64 or larger. Without one, the site generates an icon from the wordmark
          initial on the accent colour.
        </p>
        <div className="row">
          <label>
            Upload an icon
            <input type="file" name="favicon" accept="image/png,image/svg+xml,image/x-icon,image/webp" />
          </label>
          <div className="inline" style={{ gap: 16, alignSelf: "end", paddingBottom: 8 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/brand/favicon?v=${v}`}
              alt="Current browser icon"
              style={{ width: 32, height: 32, borderRadius: 7 }}
            />
            {s?.faviconData && (
              <label className="inline" style={{ fontSize: 13 }}>
                <input type="checkbox" name="removeFavicon" style={{ width: "auto" }} /> Remove
              </label>
            )}
          </div>
        </div>

        <h2 style={{ fontSize: 15, fontWeight: 600, marginTop: 10 }}>Contact details</h2>
        <p style={{ fontSize: 13, color: "var(--muted)", marginTop: -8 }}>
          These appear on the contact page, in the footer, and on the legal pages.
        </p>
        <div className="row">
          <label>
            New projects email
            <input name="contactEmail" type="email" defaultValue={s?.contactEmail ?? ""} />
          </label>
          <label>
            Support email
            <input name="supportEmail" type="email" defaultValue={s?.supportEmail ?? ""} />
          </label>
        </div>
        <div className="row">
          <label>
            Partnerships email
            <input name="partnersEmail" type="email" defaultValue={s?.partnersEmail ?? ""} />
          </label>
          <label>
            Phone
            <input name="phone" defaultValue={s?.phone ?? ""} placeholder="+91 20 4890 2200" />
          </label>
        </div>

        <h2 style={{ fontSize: 15, fontWeight: 600, marginTop: 10 }}>Floating buttons</h2>
        <p style={{ fontSize: 13, color: "var(--muted)", marginTop: -8 }}>
          A WhatsApp and a call button pinned to the bottom-right corner. The call button uses the phone number above.
        </p>
        <div className="row">
          <label>
            WhatsApp number (with country code)
            <input name="whatsappNumber" defaultValue={s?.whatsappNumber ?? ""} placeholder="+91 98765 43210" />
          </label>
          <label>
            Show buttons on
            <select name="floatingScope" defaultValue={s?.floatingScope ?? "mobile"}>
              <option value="mobile">Mobile only</option>
              <option value="all">All screen sizes</option>
              <option value="off">Hidden everywhere</option>
            </select>
          </label>
        </div>
        <label>
          Pre-filled WhatsApp message
          <input
            name="whatsappMessage"
            defaultValue={s?.whatsappMessage ?? ""}
            placeholder="Hi Supreme One Software — I'd like to talk about a project."
          />
        </label>
        <div className="inline" style={{ gap: 24, flexWrap: "wrap" }}>
          <label className="inline">
            <input
              type="checkbox"
              name="whatsappEnabled"
              defaultChecked={s?.whatsappEnabled ?? false}
              style={{ width: "auto" }}
            />
            Show WhatsApp button
          </label>
          <label className="inline">
            <input
              type="checkbox"
              name="callEnabled"
              defaultChecked={s?.callEnabled ?? false}
              style={{ width: "auto" }}
            />
            Show call button
          </label>
        </div>

        <div>
          <button type="submit" className="btn-admin">
            Save brand &amp; contact
          </button>
        </div>
      </form>
    </>
  );
}
