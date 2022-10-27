/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["vn", "en"],
    defaultLocale: "vn",
    localeDetection: false,
  },
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "https://api-voucher.shopdi.io/" },
          { key: "Access-Control-Allow-Origin", value: "https://api.shopdi.io/" },
        ],
      },
    ]
  },
}
