import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for highlighting potential problems in the app
  reactStrictMode: true,

  // Enable SWC minification for faster builds and better performance
  swcMinify: true,

  // Custom build output directory
  distDir: "build",

  // Configure environment variables (you can also use a .env file)
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PINATA_JWT: process.env.PINATA_JWT,
    PINATA_GATEWAY: process.env.PINATA_GATEWAY,
  },

  // Enable internationalized routing (i18n)
  i18n: {
    locales: ["en", "es", "fr"], // Supported languages
    defaultLocale: "en", // Default language
  },

  // API rewrites (useful for proxying API requests to a backend)
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Matches requests to `/api/*`
        destination: "http://localhost:4000/:path*", // Proxy to your Bun backend
      },
    ];
  },

  // Webpack configuration for customizations
  webpack: (config) => {
    // Example: Add a rule to load Markdown files
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    return config;
  },

  // Configure image optimization
  images: {
    domains: ["example.com", "cdn.example.com"], // Add domains for external images
    formats: ["image/avif", "image/webp"], // Enable modern formats for better performance
  },

};

export default nextConfig;
