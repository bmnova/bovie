import { ImageResponse } from "next/og";
import { getPost } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";

export const alt = "BMNova Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  const title = post?.title ?? "BMNova Blog";
  const summary = post?.summary ?? "Evidence-based writing from BMNova.";

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
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#7dd3c0",
          }}
        >
          {SITE_NAME} Blog
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: title.length > 60 ? 44 : 52,
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#f4f7fb",
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#94a3b8",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {summary.length > 140 ? `${summary.slice(0, 137)}...` : summary}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#64748b" }}>
          bmnova.com/blog
        </div>
      </div>
    ),
    { ...size }
  );
}
