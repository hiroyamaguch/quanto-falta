/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://avatars.githubusercontent.com/**?v=4')],
  },
}

module.exports = nextConfig
