import api from './api';

export interface Subdivision {
    subdivisionId: number;
    name: string;
    type: string;
    description: string;
    createdAt: string;
    buildingCount?: number;
}

export interface SubdivisionsResponse {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    items: Subdivision[];
}

export interface CreateSubdivisionRequest {
    name: string;
    type: string;
    description: string;
}

export interface UpdateSubdivisionRequest {
    name?: string;
    type?: string;
    description?: string;
}

export interface SubdivisionsQueryParams {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    type?: string;
}

export class SubdivisionService {
    private static baseUrl = '/Subdivision';

    static async getAllSubdivisions(params?: SubdivisionsQueryParams): Promise<SubdivisionsResponse> {
        const response = await api.get(this.baseUrl, { params });
        return response.data;
    }

    static async getSubdivisionById(id: string): Promise<Subdivision> {
        const response = await api.get(`${this.baseUrl}/${id}`);
        return response.data;
    }

    static async createSubdivision(data: CreateSubdivisionRequest): Promise<Subdivision> {
        const response = await api.post(this.baseUrl, data);
        return response.data;
    }

    static async updateSubdivision(id: string, data: UpdateSubdivisionRequest): Promise<Subdivision> {
        const response = await api.put(`${this.baseUrl}/${id}`, data);
        return response.data;
    }

    static async deleteSubdivision(id: string): Promise<void> {
        await api.delete(`${this.baseUrl}/${id}`);
    }

    static async getSubdivisionsByType(type: string, params?: SubdivisionsQueryParams): Promise<SubdivisionsResponse> {
        const response = await api.get(`${this.baseUrl}/type/${type}`, { params });
        return response.data;
    }

    static async searchSubdivisions(searchTerm: string, params?: SubdivisionsQueryParams): Promise<SubdivisionsResponse> {
        const response = await api.get(`${this.baseUrl}/search`, {
            params: { ...params, search: searchTerm }
        });
        return response.data;
    }

    // Get available subdivision types
    static async getSubdivisionTypes(): Promise<string[]> {
        const response = await api.get(`${this.baseUrl}/types`);
        return response.data;
    }

    // Get subdivision statistics
    static async getSubdivisionStats(): Promise<{
        total: number;
        byType: Record<string, number>;
        totalBuildings: number;
        averageBuildingsPerSubdivision: number;
    }> {
        const response = await api.get(`${this.baseUrl}/stats`);
        return response.data;
    }

    // Get buildings count for a subdivision
    static async getSubdivisionBuildingCount(subdivisionId: number): Promise<{ count: number }> {
        const response = await api.get(`${this.baseUrl}/${subdivisionId}/buildings/count`);
        return response.data;
    }
}