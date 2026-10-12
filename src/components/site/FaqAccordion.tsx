"use client";

import { useState } from "react";

type Item = { id: string; question: string; answer: string };

/**
 * One-open-at-a-time accordion. The panel animates on grid-template-rows
 * (0fr → 1fr), so it opens to its natural height without measuring the DOM.
 */
export default function FaqAccordion({ items }: { items: Item[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className="faq-item" data-open={open}>
            <h3 className="faq-h">
              <button
                type="button"
                className="faq-q"
                aria-expanded={open}
                aria-controls={`faq-${item.id}`}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                {item.question}
                <span className="plus" aria-hidden="true">
                  +
                </span>
              </button>
            </h3>
            <div className="faq-a" id={`faq-${item.id}`} role="region" aria-label={item.question} inert={!open}>
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
