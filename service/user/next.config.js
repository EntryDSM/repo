/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@packages/ui"]);

const nextConfig = withTM({
  reactStrictMode: true,
  images: {
    domains: ["s3.ap-northeast-2.amazonaws.com"],
  },
});

module.exports = nextConfig;
