/**
 * Floating WhatsApp and call buttons, pinned bottom-right.
 * Which buttons show — and whether they show on mobile only or on every screen
 * — is set in the admin panel under Brand & contact.
 */
export type FloatingActionsProps = {
  whatsappNumber: string;
  whatsappMessage: string;
  whatsappEnabled: boolean;
  phone: string;
  callEnabled: boolean;
  scope: string; // "all" | "mobile" | "off"
};

/** Strips spaces, dashes and brackets — wa.me and tel: both want bare digits. */
function digits(v: string): string {
  return v.replace(/[^\d+]/g, "").replace(/^\+/, "");
}

export default function FloatingActions({
  whatsappNumber,
  whatsappMessage,
  whatsappEnabled,
  phone,
  callEnabled,
  scope,
}: FloatingActionsProps) {
  if (scope === "off") return null;

  const wa = whatsappEnabled && whatsappNumber.trim() ? digits(whatsappNumber) : null;
  const tel = callEnabled && phone.trim() ? phone.replace(/[^\d+]/g, "") : null;
  if (!wa && !tel) return null;

  const waHref = `https://wa.me/${wa}${whatsappMessage.trim() ? `?text=${encodeURIComponent(whatsappMessage.trim())}` : ""}`;

  return (
    <div className="floating-actions" data-scope={scope === "mobile" ? "mobile" : "all"}>
      {wa && (
        <a
          href={waHref}
          className="fab fab-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.13h-.01c-1.52 0-3.01-.41-4.31-1.18l-.31-.18-3.2.84.85-3.12-.2-.32a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.24-8.23 8.24z" />
          </svg>
          <span className="fab-label">WhatsApp</span>
        </a>
      )}
      {tel && (
        <a href={`tel:${tel}`} className="fab fab-call" aria-label={`Call ${phone}`}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <span className="fab-label">Call</span>
        </a>
      )}
    </div>
  );
}
