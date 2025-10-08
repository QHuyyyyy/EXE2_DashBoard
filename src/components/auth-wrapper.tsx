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

    // Handle redirects immediately when auth state changes
    useEffect(() => {
        if (!isLoading) {
            // If authenticated and admin, ensure they're not on auth pages
            if (isAuthenticated && isAdmin && pathname?.startsWith('/auth/')) {
                router.replace('/');
                toast.success('Signed in successfully.');
                return;
            }

            // If not authenticated and not on auth pages, redirect to sign in
            if (!isAuthenticated && !pathname?.startsWith('/auth/')) {
                router.replace('/auth/sign-in');
                return;
            }
        }
    }, [isAuthenticated, isAdmin, isLoading, pathname, router]);

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

    // If on auth pages and authenticated, don't render anything while redirecting
    if (pathname?.startsWith('/auth/') && isAuthenticated && isAdmin) {
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
    if (pathname?.startsWith('/auth/')) {
        return <>{children}</>;
    }

    // For dashboard pages, show sidebar and header only if authenticated and admin
    if (isAuthenticated && isAdmin) {
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

    // If not authenticated and not on auth pages, show loading while redirecting
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-2 dark:bg-[#020d1a]">
            <div className="flex flex-col items-center space-y-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
                <p className="text-gray-600 dark:text-gray-400">Redirecting to sign in...</p>
            </div>
        </div>
    );
}