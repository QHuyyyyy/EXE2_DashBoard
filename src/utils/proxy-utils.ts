// Proxy error handler và utilities

export interface ProxyError {
    isProxyError: boolean;
    originalError: any;
    message: string;
}

export function isProxyError(error: any): boolean {
    return error?.response?.status === 500 &&
        error?.response?.data?.error === 'Proxy request failed';
}

export function handleProxyError(error: any): ProxyError {
    if (isProxyError(error)) {
        return {
            isProxyError: true,
            originalError: error,
            message: 'Connection to server failed. Please check your internet connection and try again.',
        };
    }

    return {
        isProxyError: false,
        originalError: error,
        message: error?.response?.data?.message || error?.message || 'An unexpected error occurred',
    };
}

export function createProxyErrorHandler(fallbackMessage: string = 'Service temporarily unavailable') {
    return (error: any) => {
        const proxyError = handleProxyError(error);

        if (proxyError.isProxyError) {
            console.error('Proxy Error:', proxyError.originalError);
            throw new Error(fallbackMessage);
        }

        throw error;
    };
}