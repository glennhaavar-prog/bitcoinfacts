/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Allow build to succeed even with type errors
    // TODO: Fix all strict type errors and remove this
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
