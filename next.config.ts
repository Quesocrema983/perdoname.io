import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vercel detecta Next.js solo, no hace falta output: standalone */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
