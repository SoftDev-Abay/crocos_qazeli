/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "ru",
    // localeDetection: false,
  },
};

export default nextConfig;
