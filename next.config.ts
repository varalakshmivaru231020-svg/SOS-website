import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages retired in the site revamp keep their inbound links working.
  async redirects() {
    return [
      { source: "/work", destination: "/customers", permanent: true },
      { source: "/platform", destination: "/products", permanent: true },
    ];
  },
};

export default nextConfig;
