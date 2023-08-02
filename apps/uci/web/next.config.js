/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.externals.push({
          'utf-8-validate': 'commonjs utf-8-validate',
          'bufferutil': 'commonjs bufferutil',
        })
        return config
      },
      i18n: {
        locales: ['en-US', 'hi'],
        defaultLocale: 'en-US',
      },
      images: {
        domains: ['cdn.samagra.io'],
      },
}

module.exports = nextConfig
