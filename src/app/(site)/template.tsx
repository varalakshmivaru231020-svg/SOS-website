"use client";

// Remounts on every navigation, which is what makes a real cut possible.
// The App Router can't hold a page back to play an exit animation, so the
// transition is enter-side: an ink panel wipes off the top of the frame
// while the incoming page settles up into place underneath it.

import { useEffect, useState } from "react";

let firstLoad = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const [cut, setCut] = useState(false);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    if (firstLoad) {
      firstLoad = false;
      return;
    }
    setCut(true);
    setEntering(true);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    const t1 = window.setTimeout(() => setCut(false), 900);
    // Drop the enter class once it has played, so it can't fight the
    // scroll-reveal transforms later on the same elements.
    const t2 = window.setTimeout(() => setEntering(false), 1100);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <>
      {cut && <div className="page-dissolve" aria-hidden="true" />}
      <div className={entering ? "route-enter" : undefined}>{children}</div>
    </>
  );
}
