/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
  outputFileTracingIncludes: {
    '/**': ['./prisma/dev.db', './dev.db'],
  },
};

export default nextConfig;
