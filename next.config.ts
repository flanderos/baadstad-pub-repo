/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['mbqaonctumdtvbnoclzp.supabase.co'],
    // Eventuelt kan du også bruke remotePatterns for mer spesifikk kontroll
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'mbqaonctumdtvbnoclzp.supabase.co',
    //     pathname: '/storage/v1/object/public/**',
    //   },
    // ],
  },
}

module.exports = nextConfig
