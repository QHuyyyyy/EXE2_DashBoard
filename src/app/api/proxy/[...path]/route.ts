import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'http://vlivingapi-prod.eba-3t3ifafu.ap-southeast-1.elasticbeanstalk.com/api';

export async function GET(request: NextRequest) {
    return handleRequest(request, 'GET');
}

export async function POST(request: NextRequest) {
    return handleRequest(request, 'POST');
}

export async function PUT(request: NextRequest) {
    return handleRequest(request, 'PUT');
}

export async function DELETE(request: NextRequest) {
    return handleRequest(request, 'DELETE');
}

export async function PATCH(request: NextRequest) {
    return handleRequest(request, 'PATCH');
}

async function handleRequest(request: NextRequest, method: string) {
    try {
        // Lấy path từ URL
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/');
        const apiPath = pathSegments.slice(3).join('/'); // Bỏ qua /api/proxy/

        // Tạo URL đích
        const targetUrl = `${API_BASE_URL}/${apiPath}${url.search}`;

        // Chuẩn bị headers
        const headers: Record<string, string> = {};

        // Copy các headers quan trọng từ request gốc
        const allowedHeaders = [
            'authorization',
            'content-type',
            'accept',
            'user-agent',
            'x-requested-with'
        ];

        allowedHeaders.forEach(header => {
            const value = request.headers.get(header);
            if (value) {
                headers[header] = value;
            }
        });

        // Chuẩn bị body cho POST/PUT/PATCH requests
        let body: any = undefined;
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            try {
                body = await request.text();
            } catch (error) {
                console.error('Error reading request body:', error);
            }
        }

        // Gửi request đến API backend
        const response = await fetch(targetUrl, {
            method,
            headers,
            body,
        });

        // Lấy response data
        const responseData = await response.text();

        // Tạo response headers
        const responseHeaders = new Headers();

        // Copy một số headers quan trọng từ response
        const responseHeadersToKeep = [
            'content-type',
            'cache-control',
            'expires',
            'last-modified',
            'etag'
        ];

        responseHeadersToKeep.forEach(header => {
            const value = response.headers.get(header);
            if (value) {
                responseHeaders.set(header, value);
            }
        });

        // Thêm CORS headers
        responseHeaders.set('Access-Control-Allow-Origin', '*');
        responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

        return new NextResponse(responseData, {
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders,
        });

    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json(
            {
                error: 'Proxy request failed',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

// Xử lý OPTIONS request cho CORS
export async function OPTIONS(request: NextRequest) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
            'Access-Control-Max-Age': '86400',
        },
    });
}