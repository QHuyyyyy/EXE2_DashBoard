import api from './api';

export interface BookingItem {
    bookingId: number;
    renterId?: number;
    renterName?: string;
    renterEmail?: string;
    renterPhone?: string;
    postId?: number;
    postTitle?: string;
    meetingTime?: string; // ISO datetime
    placeMeet?: string;
    note?: string | null;
    status?: string;
    createdAt?: string;
}

export interface BookingsResponse {
    currentPage?: number;
    totalPages?: number;
    totalItems?: number;
    items: BookingItem[];
}

export class BookingService {
    private static baseUrl = '/Booking';

    static async getAllBookings(): Promise<BookingItem[]> {
        const response = await api.get<BookingsResponse>(this.baseUrl);
        return response.data?.items || [];
    }

    static async getBookings(params?: { page?: number; pageSize?: number }): Promise<BookingsResponse> {
        const response = await api.get<BookingsResponse>(this.baseUrl, { params });
        return response.data;
    }

    // Helper to get bookings for a specific date (client-side filter)
    static async getBookingsByDate(date: string): Promise<BookingItem[]> {
        const all = await this.getAllBookings();
        const target = new Date(date).toDateString();
        return all.filter(b => {
            if (!b.meetingTime) return false;
            const d = new Date(b.meetingTime).toDateString();
            return d === target;
        });
    }
}

export default BookingService;
