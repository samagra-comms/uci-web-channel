/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  serverRuntimeConfig: {
    secret: "secret"
  },
  nextConfig
}
