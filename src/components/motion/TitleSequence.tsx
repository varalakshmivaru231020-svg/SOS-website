// The title card. Server-rendered on purpose: a curtain that appears after
// hydration is worse than none at all — you'd see the page, then have it
// covered. This ships in the first HTML byte and lifts itself with a pure CSS
// animation, so it is on screen before anything else paints and it works
// even if the JS never arrives.
//
// The inline script in the root layout decides whether it plays at all
// (once per session, never under reduced motion) before this markup is
// parsed, so repeat visits never flash a curtain.

export default function TitleSequence({ wordmark = "Supreme One Software" }: { wordmark?: string }) {
  return (
    <div className="title-seq" aria-hidden="true">
      <div>
        <span className="seq-mark">
          <i>
            {wordmark}
            <b>.</b>
          </i>
        </span>
        <span className="seq-rule" />
      </div>
    </div>
  );
}
