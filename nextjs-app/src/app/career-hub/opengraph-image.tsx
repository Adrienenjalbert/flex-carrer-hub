import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Indeed Flex Career Hub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "12px",
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px",
              fontSize: "32px",
              color: "white",
              fontWeight: 700,
            }}
          >
            IF
          </div>
          <span style={{ color: "#94a3b8", fontSize: "28px", fontWeight: 500 }}>
            Indeed Flex
          </span>
        </div>
        <h1
          style={{
            color: "white",
            fontSize: "56px",
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          Career Hub
        </h1>
        <p
          style={{
            color: "#94a3b8",
            fontSize: "24px",
            textAlign: "center",
            marginTop: "20px",
            maxWidth: "700px",
          }}
        >
          Flexible jobs, salary tools, and career guides for hourly workers
        </p>
      </div>
    ),
    { ...size }
  );
}
