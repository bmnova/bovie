/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@websites/shared"],
  async redirects() {
    return [
      {
        source: "/projects/kami",
        destination: "/projects/haki",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
