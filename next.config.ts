import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      { source: "/docs/api", destination: "/docs/api-reference", permanent: false },
      { source: "/zh-CN/docs/api", destination: "/zh-CN/docs/api-reference", permanent: false },
      { source: "/auth/login", destination: "/login", permanent: false },
      { source: "/auth/register", destination: "/register", permanent: false },
      { source: "/zh-CN/auth/login", destination: "/zh-CN/login", permanent: false },
      { source: "/zh-CN/auth/register", destination: "/zh-CN/register", permanent: false },
    ];
  },
};

export default nextConfig;
