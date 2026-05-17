/** @type {import('next').NextConfig} */
const createWithVercelToolbar = require('@vercel/toolbar/plugins/next')

const nextConfig = {
  images: {
    remotePatterns: [new URL('https://avatars.githubusercontent.com/**?v=4')],
  },
}

const withVercelToolbar = createWithVercelToolbar()
module.exports = withVercelToolbar(nextConfig)
