import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["via.placeholder.com"], // Add the domain of your images
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Disables ESLint during build
  },
  // Add other Next.js configuration options here
};

export default nextConfig;
