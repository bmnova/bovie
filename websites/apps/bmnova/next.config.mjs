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
      {
        source: "/projects/dietpal",
        destination: "/projects/pali",
        permanent: true,
      },
      {
        source: "/tr/projects/dietpal",
        destination: "/tr/projects/pali",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
