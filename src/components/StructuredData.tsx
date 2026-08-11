/**
 * Renders a JSON-LD block. Kept in one place so every graph on the site is
 * serialised the same way and escaped consistently.
 */
export default function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is not HTML — close any tag sequence that could
      // end the script element early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
