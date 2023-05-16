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
        locales: ['default', 'en', 'hi'],
        defaultLocale: 'default',
        localeDetection: false,
      },
      trailingSlash: true,
}

module.exports = nextConfig
