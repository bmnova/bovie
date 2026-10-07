import { ImageResponse } from "next/og";
import { contentMap } from "@/content";
import { isLocale } from "@/lib/i18n";

export const alt = "BMNova — Independent app studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const APP_COLORS = ["#5B8CFF", "#FF7A2F", "#FF3EA5", "#5BC48B", "#A855F7", "#FF6B8B", "#FFB224"];

export default function OpenGraphImage({ params }: { params: { lang: string } }) {
  const { hero } = contentMap[isLocale(params.lang) ? params.lang : "en"];
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0B12",
          padding: "72px",
          fontFamily: "system-ui, sans-serif",
          color: "#F3F2FA",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 40, fontWeight: 800 }}>
          <div style={{ width: 20, height: 20, borderRadius: 999, background: "#DAFF47" }} />
          <span>
            bm<span style={{ color: "#DAFF47" }}>nova</span>
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em" }}>
            <span>{hero.titleLine1}</span>
            <span>
              {hero.titleBig} <span style={{ color: "#DAFF47" }}>{hero.titleAccent}</span>
            </span>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {APP_COLORS.map((color) => (
              <div key={color} style={{ width: 56, height: 56, borderRadius: 16, background: color }} />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#A4A2B8" }}>{hero.badge}</div>
      </div>
    ),
    { ...size }
  );
}
