/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-253f4f98a29547d189d929dd4b0273e2.r2.dev",
      },
    ],
  },
};

export default nextConfig;
