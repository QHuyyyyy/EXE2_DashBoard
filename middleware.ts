import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    // Disable middleware auth check since we're using localStorage
    // Auth checking will be handled client-side in components
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - images (public images)
         */
        '/((?!api|_next/static|_next/image|images).*)',
    ],
};