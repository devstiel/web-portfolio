import { ImageResponse } from "next/og";
import Star from "@/components/Star";
export const alt =
  "Devy Relliani — Product QA, business analysis & creative work";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f4f2e9",
          color: "#252720",
          padding: "55px 65px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 19,
            borderBottom: "1px solid #b8baac",
            paddingBottom: 23,
          }}
        >
          <span>DEVY RELLIANI SAFFIYAH</span>
          <span>SELECTED WORK / 2026</span>
        </div>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontWeight: 700,
              fontSize: 116,
              lineHeight: 0.95,
              letterSpacing: -7,
            }}
          >
            <span>DEVY</span>
            <span>RELLIANI.</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#d9f76b",
              width: 165,
              height: 165,
              fontSize: 120,
            }}
          >
            <Star size={110} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #b8baac",
            paddingTop: 23,
            fontSize: 23,
          }}
        >
          Product QA　/　Business analysis　/　Creative work
        </div>
      </div>
    ),
    size,
  );
}
