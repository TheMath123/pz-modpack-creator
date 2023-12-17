/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "steamuserimages-a.akamaihd.net",
      },
    ],
  },
};

module.exports = nextConfig;
