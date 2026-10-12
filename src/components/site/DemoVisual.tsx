import type { CSSProperties } from "react";
import type { ChatDemo, ChatMessage, Demo, InboxDemo } from "@/content/types";

// Hero mockups, drawn in markup rather than shipped as screenshots: a phone for
// the messaging channels, a browser with a docked chat widget for the website
// service, and a team inbox for the inbox product. Messages play in one by one
// once the figure scrolls into view (CSS only — see .chat in globals.css).
// The whole figure is a single labelled image to assistive tech; the dialogue
// is illustration, not content.

const CHANNEL_LABEL: Record<ChatDemo["channel"], string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  messenger: "Messenger",
  rcs: "RCS",
  voice: "IVR call",
  web: "website chat",
};

const HEAD_SUB: Record<ChatDemo["channel"], string> = {
  whatsapp: "Business account",
  instagram: "Instagram",
  messenger: "Typically replies instantly",
  rcs: "Verified business",
  voice: "Calling… 00:42",
  web: "Typically replies instantly",
};

const VERIFIED = new Set<ChatDemo["channel"]>(["whatsapp", "rcs"]);

export default function DemoVisual({ demo, className }: { demo: Demo; className?: string }) {
  if (demo.channel === "inbox") return <InboxMock demo={demo} className={className} />;
  if (demo.channel === "web") return <BrowserMock demo={demo} className={className} />;
  return <PhoneMock demo={demo} className={className} />;
}

function Tick() {
  return (
    <svg className="chat-verified" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path d="M4.6 8.2l2.2 2.2 4.6-4.8" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Messages({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="chat-body">
      {messages.map((m, i) => (
        <Message key={i} m={m} i={i} />
      ))}
    </div>
  );
}

function Message({ m, i }: { m: ChatMessage; i: number }) {
  const style = { "--i": i } as CSSProperties;
  if (m.from === "event") {
    return (
      <div className="chat-msg chat-event" style={style}>
        {m.text}
      </div>
    );
  }
  const side = m.from === "customer" ? "out" : "in";
  return (
    <div className={`chat-msg chat-${side}`} style={style}>
      {m.text && <div className="chat-bubble">{m.text}</div>}
      {m.card && (
        <div className="chat-bubble chat-card">
          <b>{m.card.title}</b>
          {m.card.body && <span>{m.card.body}</span>}
          {m.card.actions && (
            <span className="chat-actions">
              {m.card.actions.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </span>
          )}
        </div>
      )}
      {m.catalog && (
        <div className="chat-bubble chat-catalog">
          {m.catalog.map((p, k) => (
            <span key={p.name} className="chat-product">
              <span className="chat-thumb" style={{ "--k": k } as CSSProperties} />
              <b>{p.name}</b>
              <span>{p.price}</span>
            </span>
          ))}
        </div>
      )}
      {m.replies && (
        <div className="chat-replies">
          {m.replies.map((r) => (
            <span key={r}>{r}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function PhoneMock({ demo, className }: { demo: ChatDemo; className?: string }) {
  return (
    <figure
      className={`device phone chat ch-${demo.channel}${className ? ` ${className}` : ""}`}
      role="img"
      aria-label={`Example ${CHANNEL_LABEL[demo.channel]} conversation with ${demo.contact}`}
      data-reveal
      data-delay="0.12"
    >
      <div className="screen">
        <div className="chat-head">
          <span className="chat-avatar">{demo.contact.replace(/[^A-Za-z]/g, "").charAt(0).toUpperCase()}</span>
          <span className="chat-who">
            <b>
              {demo.contact}
              {VERIFIED.has(demo.channel) && <Tick />}
            </b>
            <small>{HEAD_SUB[demo.channel]}</small>
          </span>
        </div>
        <Messages messages={demo.messages} />
        {demo.channel === "voice" ? (
          <div className="chat-callbar" aria-hidden="true">
            <span>Mute</span>
            <span>Keypad</span>
            <span className="end">End</span>
          </div>
        ) : (
          <div className="chat-compose" aria-hidden="true">
            <span>{demo.channel === "rcs" ? "RCS message" : "Message"}</span>
            <i />
          </div>
        )}
      </div>
    </figure>
  );
}

function BrowserMock({ demo, className }: { demo: ChatDemo; className?: string }) {
  const host = demo.contact.toLowerCase().replace(/[^a-z]/g, "");
  return (
    <figure
      className={`device browser chat ch-web${className ? ` ${className}` : ""}`}
      role="img"
      aria-label={`Example website with a live chat widget for ${demo.contact}`}
      data-reveal
      data-delay="0.12"
    >
      <div className="browser-bar">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <span className="url">{host}.in/book-appointment</span>
      </div>
      <div className="browser-page">
        <div className="page-skel">
          <i className="w60" />
          <i className="w90" />
          <i className="w75" />
          <span className="skel-btn" />
          <span className="skel-img" />
        </div>
        <div className="widget">
          <div className="chat-head">
            <span className="chat-avatar">{demo.contact.charAt(0)}</span>
            <span className="chat-who">
              <b>{demo.contact}</b>
              <small>{HEAD_SUB.web}</small>
            </span>
          </div>
          <Messages messages={demo.messages} />
        </div>
      </div>
    </figure>
  );
}

function InboxMock({ demo, className }: { demo: InboxDemo; className?: string }) {
  return (
    <figure
      className={`device inbox chat${className ? ` ${className}` : ""}`}
      role="img"
      aria-label="Example team inbox with WhatsApp, Instagram, Messenger and web chat conversations in one list"
      data-reveal
      data-delay="0.12"
    >
      <div className="inbox-head">
        <b>Team inbox</b>
        <span className="inbox-tabs">
          <span className="on">All</span>
          <span>Mine</span>
          <span>Unassigned</span>
        </span>
      </div>
      <div className="chat-body">
        {demo.rows.map((r, i) => (
          <div key={r.name} className={`chat-msg inbox-row${i === 0 ? " on" : ""}`} style={{ "--i": i } as CSSProperties}>
            <span className="chat-avatar">{r.name.replace(/[^A-Za-z]/g, "").charAt(0).toUpperCase()}</span>
            <span className="inbox-text">
              <b>
                {r.name} <em data-ch={r.channel}>{r.channel}</em>
              </b>
              <span>{r.preview}</span>
            </span>
            <span className="inbox-tag">{r.tag}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}
