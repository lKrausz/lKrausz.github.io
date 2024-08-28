// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// const nextConfig = {
//   images: {
//     formats: ['image/avif', 'image/webp'],
//     domains: ['hotoffers.casino'],
//   },
//   swcMinify: true,
//   analyze: process.env.NODE_ENV === 'production' && process.env.ANALYZE === 'true',
// };

// module.exports = nextConfig;

// // Добавляем анализ только в режиме продакшн
// if (nextConfig.analyze) {
//   module.exports.webpack = (config, { isServer }) => {
//     if (!isServer) {
//       config.plugins.push(new BundleAnalyzerPlugin({
//         analyzerMode: 'server',
//         analyzerPort: 8888,
//         openAnalyzer: true,
//       }));
//     }

//     return config;
//   };
// }
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['hotoffers.casino', 'gobig.finance', 'trckln.com'],
  },
  swcMinify: true,
}

module.exports = nextConfig;
