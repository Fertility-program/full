/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  headers: async () => [
    {
      source: "/exercises/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      source: "/sw.js",
      headers: [
        { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        { key: "Service-Worker-Allowed", value: "/" },
      ],
    },
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(self)" },
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.paddle.com https://plausible.io https://api.qrserver.com https://translate.google.com https://translate.googleapis.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://translate.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com https://translate.googleapis.com",
            "img-src 'self' data: blob: https: http:",
            "connect-src 'self' https://*.supabase.co https://*.paddle.com https://plausible.io https://translate.googleapis.com wss://*.supabase.co",
            "frame-src 'self' https://*.paddle.com https://translate.google.com",
            "worker-src 'self' blob:",
            "manifest-src 'self'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
          ].join("; "),
        },
      ],
    },
  ],
};

export default nextConfig;
