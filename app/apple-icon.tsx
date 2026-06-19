import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

// Home-screen icon for iOS / PWA installs. Rendered to PNG at build time.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 32%, #0f3b34 0%, #08130f 70%)",
          color: "#2DD4BF",
          fontSize: 92,
          fontWeight: 700,
          letterSpacing: -2,
          borderRadius: 40,
        }}
      >
        LA
      </div>
    ),
    { ...size },
  )
}
