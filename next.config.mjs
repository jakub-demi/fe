/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.NEXT_PUBLIC_API_BASE_URL.split("://", 2)[1]
      }
    ]
  }
};

export default nextConfig;
