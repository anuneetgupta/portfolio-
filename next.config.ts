import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Ensure static files are properly served
  staticPageGenerationTimeout: 60,

  // Allow remote images from PokeAPI sprite CDN
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/PokeAPI/sprites/**",
      },
    ],
  },
  
  // Headers for proper file serving and CORS
  async headers() {
    return [
      {
        source: "/resume.pdf",
        headers: [
          {
            key: "Content-Type",
            value: "application/pdf",
          },
          {
            key: "Content-Disposition",
            value: "attachment; filename=resume.pdf",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
