const isElectron = process.env.ELECTRON === 'true';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: '',
};

export default nextConfig;