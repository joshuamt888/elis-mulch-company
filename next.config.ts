import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // the hidden /tier-4 preview is a static export under public/tier-4
  async rewrites() {
    return [{ source: "/tier-4", destination: "/tier-4/index.html" }];
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
