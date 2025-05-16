import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [new URL('https://dummyimage.com/**'), new URL('https://www.artic.edu/**')],
    },
};

export default nextConfig;
