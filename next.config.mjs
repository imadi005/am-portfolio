/** @type {import('next').NextConfig} */

// Aditya's developer portfolio lives on its own Vercel project and is served here at /dev.
const PORTFOLIO = "https://aditya-mishra-portfolio-bice.vercel.app";

const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/dev", destination: `${PORTFOLIO}/dev` },
        { source: "/dev/:path*", destination: `${PORTFOLIO}/dev/:path*` },
      ],
    };
  },
};

export default nextConfig;
