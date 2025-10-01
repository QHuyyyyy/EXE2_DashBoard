import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Define protected routes
    const protectedRoutes = [
        '/',
        '/calendar',
        '/charts',
        '/forms',
        '/pages',
        '/profile',
        '/tables',
        '/ui-elements'
    ];

    // Check if current path is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    );

    // Get auth token from cookies
    const token = localStorage.getItem('access-token');

    // If trying to access protected route without token, redirect to login
    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/auth/sign-in', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // If logged in and trying to access login page, redirect to home
    if (token && pathname.startsWith('/auth/sign-in')) {
        const redirectTo = request.nextUrl.searchParams.get('redirect') || '/';
        return NextResponse.redirect(new URL(redirectTo, request.url));
    }

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