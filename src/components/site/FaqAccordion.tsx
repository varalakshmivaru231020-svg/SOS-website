"use client";

import { useRef, useState } from "react";

type Item = { id: string; question: string; answer: string };

export default function FaqAccordion({ items }: { items: Item[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const refs = useRef(new Map<string, HTMLDivElement>());

  return (
    <div>
      {items.map((item) => {
        const open = openId === item.id;
        const panel = refs.current.get(item.id);
        return (
          <div key={item.id} className="faq-item" data-open={open}>
            <button
              className="faq-q"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              {item.question}
              <span className="plus" aria-hidden="true">
                +
              </span>
            </button>
            <div
              className="faq-a"
              ref={(el) => {
                if (el) refs.current.set(item.id, el);
              }}
              style={{ maxHeight: open && panel ? panel.scrollHeight : 0 }}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
