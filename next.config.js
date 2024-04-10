/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
        port: "",
        pathname: "/maps/api/place/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/nearby",
        permanent: false,
      },
      {
        source: "/lodging",
        destination: "/nearby",
        permanent: false,
      },
      {
        source: "/hosting",
        destination: "/hosting/new",
        permanent: false,
      },
    ];
  },
};
module.exports = nextConfig;
