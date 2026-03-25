import { ImageResponse } from "next/og";
import { allGuideArticles } from "@/lib/data/articles/guides";

export const runtime = "edge";
export const alt = "Guide - Indeed Flex Career Hub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return Object.keys(allGuideArticles).map((slug) => ({ slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = allGuideArticles[slug];
  const title = article?.title ?? "Career Guide";
  const category = article?.category ?? "Guide";

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
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "10px",
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "16px",
              fontSize: "24px",
              color: "white",
              fontWeight: 700,
            }}
          >
            IF
          </div>
          <span style={{ color: "#94a3b8", fontSize: "22px", fontWeight: 500 }}>
            Indeed Flex Career Hub
          </span>
        </div>
        <div
          style={{
            background: "rgba(59, 130, 246, 0.2)",
            borderRadius: "8px",
            padding: "6px 18px",
            marginBottom: "20px",
          }}
        >
          <span style={{ color: "#60a5fa", fontSize: "18px", fontWeight: 500 }}>
            {category}
          </span>
        </div>
        <h1
          style={{
            color: "white",
            fontSize: "44px",
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.2,
            margin: 0,
            maxWidth: "900px",
          }}
        >
          {title}
        </h1>
      </div>
    ),
    { ...size }
  );
}
