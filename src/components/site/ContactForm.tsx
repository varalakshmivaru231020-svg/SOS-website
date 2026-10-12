"use client";

import { useActionState, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { submitContact, type ContactState } from "@/lib/actions/contact";
import { enquirySource } from "@/lib/nav-history";
import { track } from "./SiteScripts";
import type { InterestGroup } from "@/content";

const initial: ContactState = { ok: null };
const noSubscribe = () => () => {};

/** `?interest=` from the URL — "" during server render and hydration, then the real value. */
function useInterestParam(): string {
  return useSyncExternalStore(
    noSubscribe,
    () => new URLSearchParams(window.location.search).get("interest") ?? "",
    () => "",
  );
}

export default function ContactForm({
  groups,
  intent = "enquiry",
}: {
  groups: InterestGroup[];
  /** "demo" on Book a Demo, "enquiry" on Contact and Partners. */
  intent?: "demo" | "enquiry" | "partnership";
}) {
  const [state, action, pending] = useActionState(submitContact, initial);
  const mountedAt = useRef(0);
  const param = useInterestParam();
  const valid = new Set(groups.flatMap((g) => g.options.map((o) => o.value)));
  const preset = valid.has(param) ? param : intent === "partnership" ? "partnership" : "";

  // The time-trap stamp and the "came from" page are added to the submission
  // here rather than rendered as hidden inputs: a rendered stamp would be the
  // build time on a static page, and React re-applies a hidden input's default
  // value on every re-render, wiping anything written to it after mount.
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);
  const submit = (formData: FormData) => {
    formData.set("ts", String(mountedAt.current || Date.now()));
    formData.set("source", enquirySource());
    action(formData);
  };

  useEffect(() => {
    if (state.ok) track(intent === "demo" ? "book_demo_submit" : "enquiry_submit");
  }, [state.ok, intent]);

  if (state.ok) {
    return (
      <div className="form-done" role="status">
        <p className="serif">Thank you — we’ve got it.</p>
        <p>
          {intent === "demo"
            ? "Our team will be in touch shortly to set up your demo."
            : "Our team will get back to you shortly."}
        </p>
      </div>
    );
  }

  const err = state.errors ?? {};
  const v = state.values ?? {};
  const interest = v.interest || preset;
  const described = (k: keyof typeof err) => (err[k] ? { "aria-invalid": true, "aria-describedby": `cf-${k}-err` } : {});

  return (
    <form action={submit} noValidate className="enquiry-form">
      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" defaultValue={v.name} type="text" autoComplete="name" required {...described("name")} />
          {err.name && <span className="err" id="cf-name-err">{err.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="cf-email">Work email</label>
          <input id="cf-email" name="email" defaultValue={v.email} type="email" autoComplete="email" placeholder="you@company.com" required {...described("email")} />
          {err.email && <span className="err" id="cf-email-err">{err.email}</span>}
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-phone">
            Phone <span className="opt">optional</span>
          </label>
          <input id="cf-phone" name="phone" defaultValue={v.phone} type="tel" autoComplete="tel" placeholder="+91" {...described("phone")} />
          {err.phone && <span className="err" id="cf-phone-err">{err.phone}</span>}
        </div>
        <div className="field">
          <label htmlFor="cf-company">
            Company <span className="opt">optional</span>
          </label>
          <input id="cf-company" name="company" defaultValue={v.company} type="text" autoComplete="organization" {...described("company")} />
          {err.company && <span className="err" id="cf-company-err">{err.company}</span>}
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-interest">I’m interested in</label>
        {/* Keyed on the preset so a ?interest= link re-selects after hydration. */}
        <select key={interest} id="cf-interest" name="interest" defaultValue={interest} required {...described("interest")}>
          <option value="" disabled>
            Choose one
          </option>
          {groups.map((g) => (
            <optgroup key={g.label} label={g.label}>
              {g.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {err.interest && <span className="err" id="cf-interest-err">{err.interest}</span>}
      </div>
      <div className="field">
        <label htmlFor="cf-message">
          {intent === "demo" ? "Anything we should know?" : "Message"} <span className="opt">optional</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          defaultValue={v.message}
          placeholder={
            intent === "demo"
              ? "The channels you use today and what you’d like to automate."
              : "Tell us a little about your business and what you need."
          }
          {...described("message")}
        />
        {err.message && <span className="err" id="cf-message-err">{err.message}</span>}
      </div>

      {/* Honeypot — humans never see it; bots fill it. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {err.form && (
        <p className="err" role="alert">
          {err.form}
        </p>
      )}

      <div className="form-foot">
        <button type="submit" className="btn btn-accent" data-magnet disabled={pending}>
          {pending ? "Sending…" : intent === "demo" ? "Book my demo" : "Send message"}
        </button>
        <p className="form-note">
          We use your details only to reply to you. See our <Link href="/legal/privacy">privacy policy</Link>.
        </p>
      </div>
    </form>
  );
}
