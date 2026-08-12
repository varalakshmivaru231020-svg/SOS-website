/**
 * The site logo. Renders the image uploaded in the admin panel when there is
 * one, otherwise the text wordmark with its accent full stop. Used by both the
 * header (client) and footer (server), so it stays a plain presentational
 * component with no data fetching of its own.
 */
export type BrandmarkProps = {
  wordmark: string;
  logoSrc?: string | null;
  logoAlt?: string | null;
  className?: string;
  height?: number;
};

export default function Brandmark({ wordmark, logoSrc, logoAlt, className, height = 30 }: BrandmarkProps) {
  if (logoSrc) {
    return (
      // Not next/image: the logo is served from the database through /api/brand
      // at its own intrinsic size, so there is nothing for the optimizer to do.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoSrc}
        alt={logoAlt || wordmark}
        className={`brand-logo${className ? ` ${className}` : ""}`}
        style={{ height }}
      />
    );
  }
  return (
    <span className={className}>
      {wordmark}
      <b>.</b>
    </span>
  );
}
