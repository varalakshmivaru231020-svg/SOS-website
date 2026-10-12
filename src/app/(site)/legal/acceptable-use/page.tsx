import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/content";
import LegalPage, { type LegalSection } from "@/components/site/LegalPage";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/legal/acceptable-use", {
    title: "Acceptable Use & Messaging Compliance | Supreme One Software",
    description:
      "The rules for sending WhatsApp, SMS, RCS, voice and social messages through the Supreme One Software platform, including opt-in requirements.",
  });
}

const buildSections = (email: string): LegalSection[] => [
  {
    title: "Who this applies to",
    body: [
      "This policy applies to every customer who sends or receives messages or calls through the Supreme One Software platform — on WhatsApp, SMS, RCS, voice, Instagram, Facebook Messenger or web chat — and to anyone acting on their behalf. It forms part of our Terms & Conditions.",
    ],
  },
  {
    title: "Get consent before you message",
    body: [
      "Only message people who have clearly agreed to hear from you on that channel. Collect opt-in in a way the person understands — what they will receive, from whom, and on which channel — and keep a record of when and how they gave it.",
      "Marketing messages and broadcast campaigns need opt-in for marketing specifically. Service messages, like order updates, should relate to something the person asked for or bought.",
    ],
  },
  {
    title: "Make opting out easy",
    body: [
      "Every person you message must be able to stop further messages easily, for example by replying STOP or tapping an unsubscribe option. Honour opt-outs promptly and don’t message the person again on that channel unless they opt back in.",
    ],
  },
  {
    title: "Follow each channel’s rules",
    body: [
      "Each channel has its own policies, and they apply to you as well as to us — including the WhatsApp Business Messaging and Commerce Policies, Meta’s platform terms for Instagram and Messenger, RCS and carrier guidelines, and telecom regulations where you message. In India this includes the TRAI rules on commercial communication, such as registering SMS headers and templates on the DLT platform.",
      "Message templates must match their approved purpose. Don’t use a template approved for one kind of message to send another.",
    ],
  },
  {
    title: "What you must not send",
    body: [
      "Content that is illegal, deceptive or misleading; phishing, malware or links designed to harm; harassment, threats or hate; content that impersonates another person or business; adult content; or promotions for goods and services that are banned, or that you are not licensed to sell, where you are sending.",
      "Don’t use the platform to send messages to purchased, rented or scraped contact lists, or to numbers you don’t have a right to contact.",
    ],
  },
  {
    title: "Data you upload",
    body: [
      "Upload only contact data you are entitled to use for messaging, and keep it accurate. You are responsible for the content of the messages you send and for answering your recipients’ data requests.",
    ],
  },
  {
    title: "What we do if the rules are broken",
    body: [
      "We may pause or block messages, suspend a number, sender or account, or end the service if we reasonably believe this policy has been broken or a channel provider requires it. Where we can, we’ll tell you first and help you fix the problem.",
    ],
  },
  {
    title: "Reporting abuse",
    body: [`If you receive unwanted messages sent through our platform, tell us at ${email} and we’ll look into it.`],
  },
];

export default async function AcceptableUsePage() {
  const settings = await getSettings();
  return (
    <LegalPage
      path="/legal/acceptable-use"
      title="Acceptable Use & Messaging Compliance"
      accent="Messaging Compliance"
      lede="The rules for messaging through our platform — starting with consent."
      updated="October 2026"
      sections={buildSections(settings.supportEmail || settings.contactEmail)}
    />
  );
}
