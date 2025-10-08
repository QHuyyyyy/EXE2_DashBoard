/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/proxy/:path*',
                destination: 'http://vlivingapi-prod.eba-3t3ifafu.ap-southeast-1.elasticbeanstalk.com/api/:path*',
            },
        ];
    },
    // Các cấu hình khác có thể cần
    images: {
        domains: ['vlivingapi-prod.eba-3t3ifafu.ap-southeast-1.elasticbeanstalk.com'],
    },
};

module.exports = nextConfig;