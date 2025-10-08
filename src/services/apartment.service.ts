import api from './api';

export interface Apartment {
    apartmentId: number;
    buildingId: number;
    apartmentCode: string;
    floor: number;
    area: number;
    apartmentType: string;
    status: string;
    numberOfBedrooms: number;
    createdAt: string;
    postIds?: number[];
}

export interface ApartmentsResponse {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    items: Apartment[];
}

export interface CreateApartmentRequest {
    buildingId: number;
    apartmentCode: string;
    floor: number;
    area: number;
    apartmentType: string;
    status: string;
    numberOfBedrooms: number;
}

export interface UpdateApartmentRequest {
    buildingId?: number;
    apartmentCode?: string;
    floor?: number;
    area?: number;
    apartmentType?: string;
    status?: string;
    numberOfBedrooms?: number;
}

export interface ApartmentsQueryParams {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    status?: string;
    apartmentType?: string;
    buildingId?: number;
}

export class ApartmentService {
    private static baseUrl = '/Apartment';

    static async getAllApartments(params?: ApartmentsQueryParams): Promise<ApartmentsResponse> {
        const response = await api.get(this.baseUrl, { params });
        return response.data;
    }

    static async getApartmentById(id: string): Promise<Apartment> {
        const response = await api.get(`${this.baseUrl}/${id}`);
        return response.data;
    }

    static async createApartment(data: CreateApartmentRequest): Promise<Apartment> {
        const response = await api.post(this.baseUrl, data);
        return response.data;
    }

    static async updateApartment(id: string, data: UpdateApartmentRequest): Promise<Apartment> {
        const response = await api.put(`${this.baseUrl}/${id}`, data);
        return response.data;
    }

    static async deleteApartment(id: string): Promise<void> {
        await api.delete(`${this.baseUrl}/${id}`);
    }

    static async getApartmentsByStatus(status: string, params?: ApartmentsQueryParams): Promise<ApartmentsResponse> {
        const response = await api.get(`${this.baseUrl}/status/${status}`, { params });
        return response.data;
    }

    static async getApartmentsByBuilding(buildingId: number, params?: ApartmentsQueryParams): Promise<ApartmentsResponse> {
        const response = await api.get(`${this.baseUrl}/building/${buildingId}`, { params });
        return response.data;
    }

    static async searchApartments(searchTerm: string, params?: ApartmentsQueryParams): Promise<ApartmentsResponse> {
        const response = await api.get(`${this.baseUrl}/search`, {
            params: { ...params, search: searchTerm }
        });
        return response.data;
    }

    // Get available apartment types
    static async getApartmentTypes(): Promise<string[]> {
        const response = await api.get(`${this.baseUrl}/types`);
        return response.data;
    }

    // Get apartment statistics
    static async getApartmentStats(): Promise<{
        total: number;
        available: number;
        occupied: number;
        maintenance: number;
        byType: Record<string, number>;
        byFloor: Record<number, number>;
    }> {
        const response = await api.get(`${this.baseUrl}/stats`);
        return response.data;
    }
}