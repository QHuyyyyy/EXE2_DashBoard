// API Configuration Options
// Bạn có thể thay đổi giữa các cách tiếp cận khác nhau

export const API_CONFIG = {
    // Option 1: Sử dụng Next.js rewrites (được cấu hình trong next.config.js)
    PROXY_REWRITE: '/api/proxy',

    // Option 2: Sử dụng API routes làm proxy
    PROXY_ROUTE: '/api/proxy',

    // Option 3: Direct API call (chỉ dùng khi backend hỗ trợ HTTPS)
    DIRECT: 'https://vlivingapi-prod.eba-3t3ifafu.ap-southeast-1.elasticbeanstalk.com/api',

    // Fallback cho development
    DEVELOPMENT: 'http://localhost:3001/api', // Nếu bạn có local API server
};

// Cấu hình hiện tại
export const CURRENT_API_BASE_URL = API_CONFIG.PROXY_REWRITE;

// Helper function để kiểm tra environment
export const getApiBaseUrl = () => {
    // Trong production, luôn sử dụng proxy
    if (process.env.NODE_ENV === 'production') {
        return API_CONFIG.PROXY_REWRITE;
    }

    // Trong development, có thể sử dụng direct nếu có HTTPS
    return process.env.NEXT_PUBLIC_API_BASE_URL || API_CONFIG.PROXY_REWRITE;
};