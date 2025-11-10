// next.config.js
const nextConfig = {
  experimental: {
    middleware: {
      runtime: 'nodejs', // <- important to switch from 'edge' to 'nodejs'
    },
  },
};

export default nextConfig;
