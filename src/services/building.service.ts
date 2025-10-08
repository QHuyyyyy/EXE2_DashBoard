import api from './api';

export interface Building {
    buildingId: number;
    subdivisionId: number;
    subdivisionName?: string;
    name: string;
    blockCode: string;
    description?: string;
    createdAt: string;
    apartmentCount?: number;
}

export interface BuildingsResponse {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    items: Building[];
}

export interface CreateBuildingRequest {
    subdivisionId: number;
    name: string;
    blockCode: string;
    description?: string;
}

export interface UpdateBuildingRequest {
    subdivisionId?: number;
    name?: string;
    blockCode?: string;
    description?: string;
}

export interface BuildingsQueryParams {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    subdivisionId?: number;
}

export class BuildingService {
    private static baseUrl = '/Building';

    static async getAllBuildings(params?: BuildingsQueryParams): Promise<BuildingsResponse> {
        const response = await api.get(this.baseUrl, { params });
        return response.data;
    }

    static async getBuildingById(id: string): Promise<Building> {
        const response = await api.get(`${this.baseUrl}/${id}`);
        return response.data;
    }

    static async createBuilding(data: CreateBuildingRequest): Promise<Building> {
        const response = await api.post(this.baseUrl, data);
        return response.data;
    }

    static async updateBuilding(id: string, data: UpdateBuildingRequest): Promise<Building> {
        const response = await api.put(`${this.baseUrl}/${id}`, data);
        return response.data;
    }

    static async deleteBuilding(id: string): Promise<void> {
        await api.delete(`${this.baseUrl}/${id}`);
    }

    static async getBuildingsBySubdivision(subdivisionId: number, params?: BuildingsQueryParams): Promise<BuildingsResponse> {
        const response = await api.get(`${this.baseUrl}/subdivision/${subdivisionId}`, { params });
        return response.data;
    }

    static async searchBuildings(searchTerm: string, params?: BuildingsQueryParams): Promise<BuildingsResponse> {
        const response = await api.get(`${this.baseUrl}/search`, {
            params: { ...params, search: searchTerm }
        });
        return response.data;
    }

    // Get building statistics
    static async getBuildingStats(): Promise<{
        total: number;
        bySubdivision: Record<number, number>;
        totalApartments: number;
        averageApartmentsPerBuilding: number;
    }> {
        const response = await api.get(`${this.baseUrl}/stats`);
        return response.data;
    }

    // Get apartments count for a building
    static async getBuildingApartmentCount(buildingId: number): Promise<{ count: number }> {
        const response = await api.get(`${this.baseUrl}/${buildingId}/apartments/count`);
        return response.data;
    }
}