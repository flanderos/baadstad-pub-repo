/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify er fjernet da det ikke lenger støttes/er nødvendig i Next.js 15
  images: {
    domains: ['mbqaonctumdtvbnoclzp.supabase.co'],
  },
}

module.exports = nextConfig
