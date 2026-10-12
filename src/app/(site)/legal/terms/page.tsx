import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/content";
import LegalPage, { type LegalSection } from "@/components/site/LegalPage";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/legal/terms", {
    title: "Terms & Conditions | Supreme One Software",
    description: "The terms that govern use of Supreme One Software’s website, platform and services.",
  });
}

const buildSections = (email: string): LegalSection[] => [
  {
    title: "Acceptance",
    body: [
      "By using this website, or by engaging Supreme One Software Pvt Ltd for services, you accept these terms. If you’re acting for a company, you confirm you have the authority to bind it. If you don’t agree with something here, the right move is not to use the site or the services.",
    ],
  },
  {
    title: "Our services",
    body: [
      "Supreme One Software Pvt Ltd is a software studio and messaging platform. We design and build custom software for clients, and we operate a conversational-messaging platform spanning channels such as WhatsApp, RCS, SMS, and voice.",
      "The specifics of any engagement — scope, deliverables, timelines, and fees — live in the proposal, statement of work, or order form we agree with you. Where those documents and these terms differ, the signed document wins.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      "Deliverables we build for you under a signed engagement belong to you once they’re paid for, as set out in that engagement. The Supreme One Software platform, our tooling, our pre-existing code, and everything on this site remain ours. Neither side gets rights in the other’s trademarks without written permission.",
    ],
  },
  {
    title: "Acceptable use",
    body: [
      "If you use our platform, you agree not to send unlawful, deceptive, or abusive messages; not to spam; and to hold the consents required to message your recipients. You also agree to follow the policies of the channels involved — carrier rules, WhatsApp Business policies, and the like. We may suspend traffic that breaks these rules.",
      <>
        The full rules are in our <Link href="/legal/acceptable-use">Acceptable Use &amp; Messaging Compliance</Link> policy.
      </>,
    ],
  },
  {
    title: "Warranties and liability",
    body: [
      "We build carefully and run the platform to a high standard, but the site and services are provided “as is” — we can’t promise they will be uninterrupted or error-free.",
      "To the fullest extent the law allows, Supreme One Software’s total liability arising from an engagement is capped at the fees you paid us for that engagement in the twelve months before the claim, and neither side is liable for indirect or consequential losses. Nothing in these terms excludes liability that cannot lawfully be excluded.",
    ],
  },
  {
    title: "Governing law",
    body: [
      "These terms are governed by the laws of India, and the courts at Bengaluru, Karnataka have exclusive jurisdiction over disputes arising from them — unless a signed engagement with you says otherwise.",
    ],
  },
  {
    title: "Changes",
    body: [
      "We may update these terms from time to time. The “last updated” date above tells you when. Continuing to use the site or services after a change means you accept the revised terms.",
    ],
  },
  {
    title: "Contact",
    body: [
      `Questions about these terms go to ${email}. Supreme One Software Pvt Ltd operates from Bengaluru, Karnataka, India.`,
    ],
  },
];

export default async function TermsPage() {
  const settings = await getSettings();
  return (
    <LegalPage
      path="/legal/terms"
      title="Terms & Conditions"
      accent="Conditions"
      lede="The ground rules for using this site, engaging our team, and sending messages through the platform."
      updated="October 2026"
      sections={buildSections(settings.contactEmail)}
    />
  );
}
