import api from './api';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: string;
    isEmailVerified?: boolean;
    message?: string;
    success?: boolean;
}

export interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    isEmailVerified?: boolean;
}

export const authService = {
    // Login function
    login: async (username: string, password: string): Promise<LoginResponse & { user?: User }> => {
        try {
            const response = await api.post<LoginResponse>('/Auth/login', {
                username,
                password,
            });

            const data = response.data;

            // If login successful, extract user info from token or make another API call
            if (data.accessToken) {
                return {
                    ...data,
                    success: true,
                    user: {
                        id: username, // Temporary - should get from token or separate API call
                        username,
                        email: `${username}@example.com`, // Temporary
                        name: username,
                        isEmailVerified: data.isEmailVerified,
                    },
                };
            }

            return { ...data, success: false };
        } catch (error: any) {
            console.error('Login error:', error);
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    },

    // Get current user profile
    getCurrentUser: async (): Promise<User> => {
        try {
            const response = await api.get<User>('/Auth/userinfo');
            return response.data;
        } catch (error: any) {
            console.error('Get user error:', error);
            throw new Error(error.response?.data?.message || 'Failed to get user info');
        }
    },

    // Refresh token
    refreshToken: async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> => {
        try {
            const response = await api.post<{ accessToken: string; refreshToken: string }>('/Auth/refresh', {
                refreshToken,
            });
            return response.data;
        } catch (error: any) {
            console.error('Refresh token error:', error);
            throw new Error(error.response?.data?.message || 'Token refresh failed');
        }
    },

    // Logout
    logout: async (): Promise<void> => {
        try {
            await api.post('/Auth/logout');
        } catch (error: any) {
            console.error('Logout error:', error);
        }
    },
};

export default authService;