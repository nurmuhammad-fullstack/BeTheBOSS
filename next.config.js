/** @type {import('next').NextConfig} */

// Content-Security-Policy — inline stillar (style={{}}) va Google Fonts uchun
// 'unsafe-inline' ruxsat etilgan, lekin manbalar cheklangan (himoya + buzilmaslik balansi).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Faqat HTTPS — 2 yil, subdomenlar bilan (kuchli transport himoyasi)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Clickjacking himoyasi
  { key: "X-Frame-Options", value: "DENY" },
  // MIME-sniffing himoyasi
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Referer ma'lumotini cheklash
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Kamera/mikrofon/geo va h.k. ni o'chirish
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,          // "X-Powered-By: Next.js" ni yashirish
  compress: true,                  // gzip/brotli siqish
  outputFileTracingRoot: __dirname, // ikkita lockfile ogohlantirishini o'chirish

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Statik assetlarni uzoq muddat keshlash (performance)
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
