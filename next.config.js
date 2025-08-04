/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true, // Убрано для совместимости с Next.js 14
  },
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    YOOKASSA_SHOP_ID: process.env.YOOKASSA_SHOP_ID,
    YOOKASSA_SECRET_KEY: process.env.YOOKASSA_SECRET_KEY,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 