import api from './api';

export interface PostImage {
    imageId: number;
    imageUrl: string;
    displayOrder: number;
    isPrimary: boolean;
}

export interface Post {
    postId: number;
    apartmentId: number;
    userId: number;
    title: string;
    description: string | null;
    price: number | null;
    postType: string | null;
    status: string;
    createdAt: string;
    images: PostImage[];
}

export interface PostsResponse {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    items: Post[];
}

export interface CreatePostRequest {
    title: string;
    description: string;
    price: number;
    postType: string;
    status: string;
}

export interface UpdatePostRequest {
    title?: string;
    description?: string;
    price?: number;
    postType?: string;
    status?: string;
}

export interface PostsQueryParams {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
    searchField?: string;
    defaultSearchField?: string;
    defaultSortBy?: string;
    isDescending?: boolean;
}

export class PostService {
    private static baseEndpoint = '/Post';

    // Lấy tất cả posts với pagination
    static async getAllPosts(params?: PostsQueryParams): Promise<PostsResponse> {
        try {
            const queryParams = new URLSearchParams();

            if (params?.page) queryParams.append('page', params.page.toString());
            if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
            if (params?.search) queryParams.append('search', params.search);
            if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
            if (params?.searchField) queryParams.append('searchField', params.searchField);
            if (params?.defaultSearchField) queryParams.append('defaultSearchField', params.defaultSearchField);
            if (params?.defaultSortBy) queryParams.append('defaultSortBy', params.defaultSortBy);
            if (params?.isDescending !== undefined) queryParams.append('isDescending', params.isDescending.toString());

            const url = queryParams.toString() ? `${this.baseEndpoint}?${queryParams.toString()}` : this.baseEndpoint;
            const response = await api.get<PostsResponse>(url);
            return response.data; // Trả về toàn bộ PostsResponse bao gồm pagination info
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }

    // Lấy post theo ID
    static async getPostById(id: string): Promise<Post> {
        try {
            const response = await api.get(`${this.baseEndpoint}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching post ${id}:`, error);
            throw error;
        }
    }

    // Tạo post mới
    static async createPost(postData: CreatePostRequest): Promise<Post> {
        try {
            const response = await api.post(this.baseEndpoint, postData);
            return response.data;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }

    // Cập nhật post
    static async updatePost(id: string, postData: UpdatePostRequest): Promise<Post> {
        try {
            const response = await api.put(`${this.baseEndpoint}/${id}`, postData);
            return response.data;
        } catch (error) {
            console.error(`Error updating post ${id}:`, error);
            throw error;
        }
    }

    // Xóa post
    static async deletePost(id: string): Promise<void> {
        try {
            await api.delete(`${this.baseEndpoint}/${id}`);
        } catch (error) {
            console.error(`Error deleting post ${id}:`, error);
            throw error;
        }
    }
}