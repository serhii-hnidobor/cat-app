/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn2.thecatapi.com',
            port: '',
            pathname: '/images/**',
          },
        ],
      },
    
}

module.exports = nextConfig
