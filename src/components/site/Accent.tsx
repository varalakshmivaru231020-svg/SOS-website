/**
 * Renders a heading with its accent phrase in the serif italic — the brand's
 * "one italic orange word" device. The accent is matched as an exact substring,
 * so it can be a word ("speaks") or a phrase ("one place"); when it isn't
 * found the heading renders plain rather than guessing.
 */
export default function Accent({ text, accent }: { text: string; accent?: string }) {
  const i = accent ? text.indexOf(accent) : -1;
  if (!accent || i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <em>{accent}</em>
      {text.slice(i + accent.length)}
    </>
  );
}
