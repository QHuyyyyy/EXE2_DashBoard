"use client";

import { useAuth } from "@/contexts/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "./Layouts/header";
import { Sidebar } from "./Layouts/sidebar";
import toast from "react-hot-toast";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    const { isLoading, isAuthenticated, isAdmin, user } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const isAuthPath = pathname?.startsWith('/auth/');
    const isLandingPage = pathname === '/';
    const isProtectedPath = !isLandingPage && !isAuthPath;

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated && isAdmin && isAuthPath) {
                router.replace('/dashboard');
                toast.success('Signed in successfully.');
                return;
            }

            if (isAuthenticated && !isAdmin && (isAuthPath || isProtectedPath)) {
                router.replace('/');
                return;
            }

            if (!isAuthenticated && isProtectedPath) {
                router.replace('/auth/sign-in');
                return;
            }
        }
    }, [isAuthenticated, isAdmin, isLoading, pathname, router, isProtectedPath, isAuthPath]);

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

    if (isLandingPage) {
        return <>{children}</>;
    }

    if (isAuthPath && isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-2 dark:bg-[#020d1a]">
                <div className="flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
                    <p className="text-gray-600 dark:text-gray-400">
                        {isAdmin ? 'Redirecting to dashboard...' : 'Redirecting to home page...'}
                    </p>
                </div>
            </div>
        );
    }

    if (isAuthPath) {
        return <>{children}</>;
    }

    if (isProtectedPath && isAuthenticated && isAdmin) {
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

    if (isProtectedPath && !isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-2 dark:bg-[#020d1a]">
                <div className="flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
                    <p className="text-gray-600 dark:text-gray-400">Redirecting to sign in...</p>
                </div>
            </div>
        );
    }
    return <>{children}</>;
}