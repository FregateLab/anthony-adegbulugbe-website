import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt =
  "Sermon Podcast — Pst. (Prof.) Anthony Adegbulugbe. Stream & subscribe."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Branded 1200x630 share card so links to /podcast preview well on
// social platforms and in chat apps.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f5f1e8",
          padding: 56,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            border: "6px solid #000000",
            padding: "56px 64px",
            justifyContent: "space-between",
          }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                width: 56,
                height: 56,
                backgroundColor: "#dc2626",
                color: "#ffffff",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                fontSize: 26,
                fontWeight: 800,
              }}
            >
              AA
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 6,
                color: "#dc2626",
              }}
            >
              THE SERMON PODCAST
            </div>
          </div>

          {/* Title */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                fontSize: 104,
                fontWeight: 800,
                lineHeight: 1,
                color: "#111111",
              }}
            >
              LISTEN &amp;
            </div>
            <div
              style={{
                fontSize: 104,
                fontWeight: 800,
                lineHeight: 1,
                color: "#111111",
              }}
            >
              SUBSCRIBE
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: 34,
                color: "#444444",
              }}
            >
              Pst. (Prof.) Anthony Adegbulugbe
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: 14 }}>
              {["Spotify", "Apple", "RSS"].map((label) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    border: "3px solid #000000",
                    padding: "8px 22px",
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#111111",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, color: "#111111" }}>
              aoa.ng/podcast
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
