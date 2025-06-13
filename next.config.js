/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "steamuserimages-a.akamaihd.net",
      },
      {
        protocol: "https",
        hostname: "images.steamusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
