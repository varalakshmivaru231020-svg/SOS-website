"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/lib/actions/contact";
import { NEED_OPTIONS } from "@/lib/validation";

const initial: ContactState = { ok: null };

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.ok) {
    return (
      <div
        style={{
          border: "1px solid var(--good)",
          borderRadius: 14,
          padding: "34px 30px",
          background: "var(--paper2)",
        }}
        role="status"
      >
        <p className="serif" style={{ fontSize: 26 }}>
          ✓ Brief received.
        </p>
        <p style={{ color: "var(--muted)", marginTop: 8 }}>
          You&apos;ll hear from us within one business day.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", columnGap: 18 }}>
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" type="text" placeholder="Your name" autoComplete="name" required />
          {state.errors?.name && <span className="err">{state.errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="cf-email">Work email</label>
          <input id="cf-email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required />
          {state.errors?.email && <span className="err">{state.errors.email}</span>}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", columnGap: 18 }}>
        <div className="field">
          <label htmlFor="cf-company">Company</label>
          <input id="cf-company" name="company" type="text" placeholder="Company name" autoComplete="organization" />
          {state.errors?.company && <span className="err">{state.errors.company}</span>}
        </div>
        <div className="field">
          <label htmlFor="cf-need">What do you need?</label>
          <select id="cf-need" name="need" defaultValue="" required>
            <option value="" disabled>
              Choose one
            </option>
            {NEED_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {state.errors?.need && <span className="err">{state.errors.need}</span>}
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-brief">Project brief</label>
        <textarea
          id="cf-brief"
          name="brief"
          rows={4}
          placeholder="Where it hurts, what you’ve tried, when you need it live."
          required
        />
        {state.errors?.brief && <span className="err">{state.errors.brief}</span>}
      </div>

      {/* Honeypot — humans never see it; bots fill it. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="ts" defaultValue={Date.now()} suppressHydrationWarning />

      {state.errors?.form && (
        <p className="err" role="alert" style={{ color: "#a33", marginBottom: 14 }}>
          {state.errors.form}
        </p>
      )}

      <button type="submit" className="btn btn-accent" data-magnet disabled={pending}>
        {pending ? "Sending…" : "Send brief"}
      </button>
    </form>
  );
}
