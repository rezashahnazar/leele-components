/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/dkapi/:path*/",
        destination: `https://api.digikala.com/:path*/`,
        basePath: false,
      },
    ];
  },
  basePath: "/components",
  trailingSlash: true,
  env: {
    DIGIKALA_TOKEN_COOKIE_KEY: "Digikala:User:Token:new",
    CUSTOM_TOKEN_COOKIE_KEY: "Pmp:User:Token",
    CUSTOME_TOKEN_PERMISSION_SCOPE: "PMP00",
    CUSTOM_COOKIE_MAX_AGE: "300",
    DK_API_BASE:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/dkapi"
        : "https://api.digikala.com",
  },
  experimental: {
    urlImports: [
      "http://localhost:3000",
      "https://about.digikala.com",
      "https://www.digikala.com",
    ],
    serverActions: {
      allowedForwardedHosts: [
        "localhost",
        "about.digikala.com",
        "localhost:3000",
      ],
      allowedOrigins: ["localhost", "localhost:3000", "about.digikala.com"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
