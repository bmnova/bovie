import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = "BMNova — AI, Mobile & SaaS Development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #0c1222 0%, #152238 45%, #1a3348 100%)",
          padding: "72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#7dd3c0",
          }}
        >
          {SITE_NAME}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#f4f7fb",
              maxWidth: 900,
            }}
          >
            AI apps, mobile products, and SaaS tools
          </div>
          <div style={{ fontSize: 28, color: "#94a3b8", maxWidth: 800 }}>
            Clean code. Thoughtful design. Built by BMNova.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#64748b" }}>
          bmnova.com
        </div>
      </div>
    ),
    { ...size }
  );
}
