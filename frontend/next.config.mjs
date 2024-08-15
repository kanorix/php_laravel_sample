/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: () => [
    {
      source: "/api/:path*",
      destination: "http://localhost:8000/api/:path*", // LaravelのAPIエンドポイント
    },
    {
      source: "/sanctum/:path*",
      destination: "http://localhost:8000/sanctum/:path*", // SanctumのCSRFエンドポイント
    },
  ],
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};

export default nextConfig;
