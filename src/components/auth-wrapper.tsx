"use client";

import { useAuth } from "@/contexts/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "./Layouts/header";
import { Sidebar } from "./Layouts/sidebar";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    const { isLoading, isAuthenticated } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // If not on auth pages and not authenticated, redirect to signin
        if (!isLoading && !isAuthenticated && !pathname?.startsWith('/auth/')) {
            router.push('/auth/sign-in');
        }

        // If authenticated and on auth pages, redirect to dashboard
        if (!isLoading && isAuthenticated && pathname?.startsWith('/auth/')) {
            router.push('/');
        }
    }, [isAuthenticated, isLoading, pathname, router]);

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

    // If on auth pages, don't show sidebar/header
    if (pathname?.startsWith('/auth/')) {
        return <>{children}</>;
    }

    // For dashboard pages, show sidebar and header only if authenticated
    if (isAuthenticated) {
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

    // If not authenticated and not on auth pages, show loading
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-2 dark:bg-[#020d1a]">
            <div className="flex flex-col items-center space-y-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
                <p className="text-gray-600 dark:text-gray-400">Redirecting...</p>
            </div>
        </div>
    );
}