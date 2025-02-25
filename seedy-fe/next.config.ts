import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["qr.sepay.vn", "firebasestorage.googleapis.com"], // ✅ Added Firebase Storage domain
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Disables ESLint during build
  },
  // Add other Next.js configuration options here
};

export default nextConfig;
