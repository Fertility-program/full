import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Veronica Bloom - The Complete Fertility Wellness Program";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #e8f5f2 0%, #b8ddd6 50%, #8dc4b8 100%)",
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
            flexDirection: "column",
            alignItems: "center",
            background: "rgba(255,255,255,0.85)",
            borderRadius: "40px",
            padding: "60px 80px",
            boxShadow: "0 20px 60px rgba(45,90,82,0.15)",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#2d5a52",
              marginBottom: "16px",
              fontFamily: "serif",
            }}
          >
            Veronica Bloom
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#5a7570",
              textAlign: "center",
              maxWidth: "700px",
              lineHeight: 1.4,
            }}
          >
            The Complete Fertility Wellness Program — Cycle-Synced Exercises, Nutrition & Supplements
          </div>
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              gap: "20px",
            }}
          >
            <div style={{ background: "#5ba89d", color: "white", padding: "12px 24px", borderRadius: "20px", fontSize: "18px" }}>
              Cycle-Synced Plans
            </div>
            <div style={{ background: "#5ba89d", color: "white", padding: "12px 24px", borderRadius: "20px", fontSize: "18px" }}>
              Under €7/day Meals
            </div>
            <div style={{ background: "#5ba89d", color: "white", padding: "12px 24px", borderRadius: "20px", fontSize: "18px" }}>
              Evidence-Based
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
