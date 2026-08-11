import { ImageResponse } from "next/og";
import { SITE_TAGLINE } from "@/lib/site";

export const alt = "Amini — the savings and payments app built for Nigeria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card. Drawn rather than stored so it never drifts from the brand,
 * and so the blog cards below can share the same visual language.
 */
export default function Image() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#02534D",
            }}
          />
          <div style={{ fontSize: 44, fontWeight: 700, color: "#0A1F1D" }}>
            amini
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -2,
              color: "#0A1F1D",
              maxWidth: 900,
            }}
          >
            {SITE_TAGLINE}
          </div>
          <div style={{ fontSize: 32, color: "#455D5A", maxWidth: 880 }}>
            Savings plans, Adashi circles, instant transfers and bills — built
            for Nigeria, in Hausa and English.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              background: "#D0F5F3",
              color: "#0A1F1D",
              fontSize: 26,
              padding: "12px 24px",
              borderRadius: 10,
            }}
          >
            amini.ng
          </div>
          <div style={{ fontSize: 26, color: "#5A716E" }}>iOS and Android</div>
        </div>
      </div>
    ),
    size,
  );
}
