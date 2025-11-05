import api from './api';

export interface User {
    userId: number;
    username: string;
    email: string;
    role: string;
    fullName: string;
    isEmailVerified: boolean;
    createdAt: string;
    lastLoginAt?: string;
    phoneNumber?: string;
    address?: string;
    dateOfBirth?: string;
    avatar?: string;
    status: string;
}

export interface UsersResponse {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    items: User[];
}

export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
    role: string;
    fullName?: string;
    phoneNumber?: string;
    address?: string;
    dateOfBirth?: string;
}

export interface UpdateUserRequest {
    username?: string;
    email?: string;
    role?: string;
    fullName?: string;
    phoneNumber?: string;
    address?: string;
    dateOfBirth?: string;
    profilePictureURL?: string | null;
    bio?: string | null;
    status?: string;
    isEmailVerified?: boolean;
}

export interface UsersQueryParams {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    role?: string;
    status?: string;
    isEmailVerified?: boolean;
}

export class UserService {
    private static baseUrl = '/User';

    static async getAllUsers(params?: UsersQueryParams): Promise<UsersResponse> {
        const response = await api.get(this.baseUrl, { params });
        return response.data;
    }

    static async getUserById(id: string): Promise<User> {
        const response = await api.get(`${this.baseUrl}/${id}`);
        return response.data;
    }

    static async createUser(data: CreateUserRequest): Promise<User> {
        const response = await api.post("/Auth/register", data);
        return response.data;
    }

    static async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
        const response = await api.put(`${this.baseUrl}/${id}`, data);
        return response.data;
    }

    static async deleteUser(id: string): Promise<void> {
        await api.delete(`${this.baseUrl}/${id}`);
    }

    static async getUsersByRole(role: string, params?: UsersQueryParams): Promise<UsersResponse> {
        const response = await api.get(`${this.baseUrl}/role/${role}`, { params });
        return response.data;
    }

    static async getUsersByStatus(status: string, params?: UsersQueryParams): Promise<UsersResponse> {
        const response = await api.get(`${this.baseUrl}/status/${status}`, { params });
        return response.data;
    }

    static async searchUsers(searchTerm: string, params?: UsersQueryParams): Promise<UsersResponse> {
        const response = await api.get(`${this.baseUrl}/search`, {
            params: { ...params, search: searchTerm }
        });
        return response.data;
    }

    static async verifyUserEmail(id: string): Promise<void> {
        await api.post(`${this.baseUrl}/${id}/verify-email`);
    }

    static async resetUserPassword(id: string, newPassword: string): Promise<void> {
        await api.post(`${this.baseUrl}/${id}/reset-password`, { password: newPassword });
    }

    static async updateUserStatus(id: string, status: string): Promise<User> {
        const response = await api.put(`${this.baseUrl}/${id}/status`, { status });
        return response.data;
    }

    // Get available user roles
    static async getUserRoles(): Promise<string[]> {
        const response = await api.get(`${this.baseUrl}/roles`);
        return response.data;
    }

    // Get user statistics
    static async getUserStats(): Promise<{
        total: number;
        active: number;
        inactive: number;
        verified: number;
        unverified: number;
        byRole: Record<string, number>;
        recentRegistrations: number;
    }> {
        const response = await api.get(`${this.baseUrl}/stats`);
        return response.data;
    }

    // Get user activity logs
    static async getUserActivityLogs(id: string, params?: {
        page?: number;
        pageSize?: number;
        fromDate?: string;
        toDate?: string;
    }): Promise<{
        currentPage: number;
        totalPages: number;
        totalItems: number;
        items: Array<{
            id: number;
            action: string;
            description: string;
            ipAddress: string;
            userAgent: string;
            createdAt: string;
        }>;
    }> {
        const response = await api.get(`${this.baseUrl}/${id}/activity-logs`, { params });
        return response.data;
    }
}