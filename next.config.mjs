/** @type {import('next').NextConfig} */

// Aditya's developer portfolio lives on its own Vercel project and is served here at /dev.
const PORTFOLIO = "https://aditya-mishra-portfolio-bice.vercel.app";
// Private concept previews for prospects live in a separate Vercel project (amg-previews).
const PREVIEWS = "https://amg-previews.vercel.app";

const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/dev", destination: `${PORTFOLIO}/dev` },
        { source: "/dev/:path*", destination: `${PORTFOLIO}/dev/:path*` },
        { source: "/preview/:path*", destination: `${PREVIEWS}/preview/:path*` },
      ],
    };
  },
};

export default nextConfig;
