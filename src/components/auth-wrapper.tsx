"use client";

import { useAuth } from "@/contexts/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "./Layouts/header";
import { Sidebar } from "./Layouts/sidebar";
import toast from "react-hot-toast";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    const { isLoading, isAuthenticated, isAdmin } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    // Check if current path is dashboard or needs authentication
    const isDashboardPath = pathname?.startsWith('/dashboard');
    const isAuthPath = pathname?.startsWith('/auth/');
    const isLandingPage = pathname === '/';

    // Handle redirects immediately when auth state changes
    useEffect(() => {
        if (!isLoading) {
            // If authenticated and admin, ensure they're not on auth pages
            if (isAuthenticated && isAdmin && isAuthPath) {
                router.replace('/dashboard');
                toast.success('Signed in successfully.');
                return;
            }

            // If not authenticated and trying to access dashboard, redirect to sign in
            if (!isAuthenticated && isDashboardPath) {
                router.replace('/auth/sign-in');
                return;
            }
        }
    }, [isAuthenticated, isAdmin, isLoading, pathname, router, isDashboardPath, isAuthPath]);

    // Show loading only when actually loading
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-2 dark:bg-[#020d1a]">
                <div className="flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    // If on landing page, just show content without dashboard layout
    if (isLandingPage) {
        return <>{children}</>;
    }

    // If on auth pages and authenticated, don't render anything while redirecting
    if (isAuthPath && isAuthenticated && isAdmin) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-2 dark:bg-[#020d1a]">
                <div className="flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
                    <p className="text-gray-600 dark:text-gray-400">Redirecting to dashboard...</p>
                </div>
            </div>
        );
    }

    // If on auth pages, show auth content
    if (isAuthPath) {
        return <>{children}</>;
    }

    // For dashboard pages, show sidebar and header only if authenticated and admin
    if (isDashboardPath && isAuthenticated && isAdmin) {
        return (
            <div className="flex min-h-screen">
                <Sidebar />

                <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
                    <Header />

                    <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                        {children}
                    </main>
                </div>
            </div>
        );
    }

    // If trying to access dashboard without authentication, show loading while redirecting
    if (isDashboardPath && !isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-2 dark:bg-[#020d1a]">
                <div className="flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
                    <p className="text-gray-600 dark:text-gray-400">Redirecting to sign in...</p>
                </div>
            </div>
        );
    }

    // For any other pages, just show content
    return <>{children}</>;
}