import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",

  basePath: isProd ? "/TigerHacks-2025" : "",
  assetPrefix: isProd ? "/TigerHacks-2025/" : "",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
