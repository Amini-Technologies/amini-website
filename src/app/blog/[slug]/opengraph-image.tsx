import { ImageResponse } from "next/og";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";

export const alt = "Amini blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

/**
 * The card renders in the bundled Noto Sans latin subset, which has no ₦
 * (U+20A6). Without this, Satori tries to fetch a font mid-build and draws a
 * blank box when that fails. "N500" is how the amount is written informally
 * anyway.
 */
function ogSafe(text: string): string {
  return text.replace(/₦/g, "N");
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#02534D",
              }}
            />
            <div style={{ fontSize: 38, fontWeight: 700, color: "#0A1F1D" }}>
              amini
            </div>
          </div>
          <div
            style={{
              background: "#D0F5F3",
              color: "#0A1F1D",
              fontSize: 24,
              padding: "10px 22px",
              borderRadius: 999,
            }}
          >
            {post?.category ?? "Blog"}
          </div>
        </div>

        <div
          style={{
            fontSize: (post?.title.length ?? 0) > 70 ? 56 : 66,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -1.5,
            color: "#0A1F1D",
            maxWidth: 1000,
            display: "flex",
          }}
        >
          {post ? ogSafe(post.title) : "The Amini blog"}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            color: "#5A716E",
          }}
        >
          <span>{post?.author ?? "The Amini Team"}</span>
          <span>·</span>
          <span>{post?.readTime ?? "amini.ng/blog"}</span>
        </div>
      </div>
    ),
    size,
  );
}
