"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import authService, { User } from '@/services/auth';
import toast from 'react-hot-toast';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for existing auth token on mount
        const accessToken = localStorage.getItem('access-token');
        const userData = localStorage.getItem('user-data');

        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('access-token');
                localStorage.removeItem('refresh-token');
                localStorage.removeItem('user-data');
            }
        }

        // Small delay to prevent flash
        setTimeout(() => {
            setIsLoading(false);
        }, 100);
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        setIsLoading(true);

        try {
            const response = await authService.login(username, password);
            console.log('Login response:', response);
            if (response.success && response.accessToken) {
                localStorage.setItem('access-token', response.accessToken);
                if (response.refreshToken) {
                    localStorage.setItem('refresh-token', response.refreshToken);
                }

                // Get user info after successful login
                try {
                    const userData = await authService.getCurrentUser();

                    setUser(userData);
                    localStorage.setItem('user-data', JSON.stringify(userData));

                    if (userData.role !== 'admin') {
                        toast.success(`Welcome back, ${userData.fullName || userData.name || userData.username}! You've been redirected to the home page.`);
                        setIsLoading(false);
                        return true;
                    }

                    setIsLoading(false);
                } catch (userError) {
                    console.error('Error fetching user data:', userError);
                    toast.error('Unable to fetch user information');
                    setIsLoading(false);
                    return false;
                }

                return true;
            } else {
                setIsLoading(false);
                toast.error(response.message || 'Invalid username or password');
                return false;
            }
        } catch (error: any) {
            console.error('Login error:', error);
            setIsLoading(false);
            toast.error(error.message || 'Login failed. Please try again.');
            return false;
        }
    };

    const logout = async () => {
        const wasAdmin = user?.role === 'admin';

        try {
            await authService.logout();
            toast.success('Logged out successfully');
        } catch (error) {
            console.error('Logout API error:', error);
            toast.success('Logged out successfully');
        }

        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        localStorage.removeItem('user-data');

        setUser(null);

        if (wasAdmin) {
            router.push('/auth/sign-in');
        }
    };

    const value = {
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}