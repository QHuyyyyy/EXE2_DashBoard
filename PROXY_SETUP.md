# HTTPS Proxy Configuration

Dự án này đã được cấu hình để sử dụng proxy HTTPS nhằm giải quyết lỗi mixed content khi gọi API HTTP từ website HTTPS.

## Vấn đề
- Website chạy trên HTTPS: `https://exe-2-dash-board.vercel.app`
- API backend chạy trên HTTP: `http://vlivingapi-prod.eba-3t3ifafu.ap-southeast-1.elasticbeanstalk.com`
- Browser chặn requests HTTP từ trang HTTPS (Mixed Content Error)

## Giải pháp

### 1. Next.js Rewrites (Phương pháp chính)
File `next.config.js` đã được cấu hình để proxy requests:
```javascript
async rewrites() {
  return [
    {
      source: '/api/proxy/:path*',
      destination: 'http://vlivingapi-prod.eba-3t3ifafu.ap-southeast-1.elasticbeanstalk.com/api/:path*',
    },
  ];
}
```

### 2. API Routes Proxy (Backup)
File `src/app/api/proxy/[...path]/route.ts` cung cấp proxy thông qua API routes.

### 3. Environment Configuration
File `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=/api/proxy
```

## Cách hoạt động

1. **Frontend gọi API**: `/api/proxy/Auth/login`
2. **Next.js proxy**: Chuyển tiếp đến `http://vlivingapi-prod.eba-3t3ifafu.ap-southeast-1.elasticbeanstalk.com/api/Auth/login`
3. **Response**: Trả về qua HTTPS

## Files đã được tạo/cập nhật

### Tạo mới:
- `next.config.js` - Cấu hình proxy rewrites
- `.env.local` - Environment variables
- `src/app/api/proxy/[...path]/route.ts` - API route proxy
- `src/config/api.config.ts` - API configuration options
- `src/utils/proxy-utils.ts` - Proxy error handling utilities

### Cập nhật:
- `src/services/api.ts` - Sử dụng proxy URL và tăng timeout
- `src/services/auth.ts` - Thêm proxy error handling

## Testing

1. **Build project**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **Test login functionality** để đảm bảo proxy hoạt động

## Troubleshooting

### Nếu proxy không hoạt động:
1. Kiểm tra console browser cho errors
2. Kiểm tra Network tab trong DevTools
3. Thử thay đổi API_BASE_URL trong `.env.local` thành `/api/proxy` (sử dụng API route thay vì rewrite)

### Logs:
- Server-side logs sẽ hiển thị trong terminal khi chạy `npm run dev`
- Client-side errors sẽ hiển thị trong browser console

## Production Deployment

Khi deploy lên Vercel:
1. Đảm bảo `.env.local` được cấu hình đúng
2. `next.config.js` sẽ tự động được áp dụng
3. Proxy sẽ hoạt động tự động

## Alternative Solutions

Nếu proxy không hoạt động, có thể:
1. Yêu cầu backend team enable HTTPS
2. Sử dụng CORS proxy service
3. Configure Vercel rewrites trong `vercel.json`