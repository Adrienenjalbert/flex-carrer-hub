import { ImageResponse } from "next/og";
import { roles } from "@/lib/data/roles";

export const runtime = "edge";
export const alt = "Role Details - Indeed Flex Career Hub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return roles.map((role) => ({ roleSlug: role.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ roleSlug: string }>;
}) {
  const { roleSlug } = await params;
  const role = roles.find((r) => r.slug === roleSlug);

  const title = role?.title ?? "Job Role";
  const pay = role
    ? `$${role.avgHourlyRate.min}-$${role.avgHourlyRate.max}/hr`
    : "";

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
            marginBottom: "30px",
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
        <h1
          style={{
            color: "white",
            fontSize: "52px",
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {title}
        </h1>
        {pay && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "24px",
              background: "rgba(59, 130, 246, 0.2)",
              borderRadius: "12px",
              padding: "12px 28px",
            }}
          >
            <span style={{ color: "#60a5fa", fontSize: "32px", fontWeight: 600 }}>
              {pay}
            </span>
          </div>
        )}
        <p
          style={{
            color: "#94a3b8",
            fontSize: "22px",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Flexible shifts, salary data, and career path info
        </p>
      </div>
    ),
    { ...size }
  );
}
