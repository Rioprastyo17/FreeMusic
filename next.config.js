/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dwaredmcrlpnbbjigrqw.supabase.co', // <-- Ganti dengan hostname ini
        port: '',
        pathname: '/storage/v1/object/public/images/**', // Pastikan pathname ini sesuai
      },
    ],
  },
};

module.exports = nextConfig;
