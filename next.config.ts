import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "localhost" },
    ],
  },
  turbopack: {},
};

export default nextConfig;
