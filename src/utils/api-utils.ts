export interface ApiError {
    message: string;
    status?: number;
    code?: string;
}

export function handleApiError(error: any): ApiError {
    if (error.response) {
        // Server responded with error status
        return {
            message: error.response.data?.message || 'An error occurred',
            status: error.response.status,
            code: error.response.data?.code,
        };
    } else if (error.request) {
        // Request was made but no response received
        return {
            message: 'Network error. Please check your connection.',
            status: 0,
        };
    } else {
        // Something else happened
        return {
            message: error.message || 'An unexpected error occurred',
        };
    }
}

export function isTokenExpired(error: any): boolean {
    return error.response?.status === 401;
}

export function isNetworkError(error: any): boolean {
    return !error.response && error.request;
}