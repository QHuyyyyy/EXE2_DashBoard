"use client";

import { useState, useEffect } from "react";
import { PostService, Post, PostsResponse, PostsQueryParams } from "@/services/post.service";
import { DataTable, TableColumn, PaginationInfo } from "@/components/ui/DataTable";
import { PostDetailModal } from "@/components/Post/PostDetailModal";
import { PostEditModal } from "@/components/Post/PostEditModal";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function PostManagementPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        pageSize: 6
    });

    // Fetch posts from API when component mounts
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async (params?: PostsQueryParams) => {
        try {
            setLoading(true);
            setError(null);
            const queryParams = {
                page: paginationInfo.currentPage,
                pageSize: 6,
                ...params
            };
            const response: PostsResponse = await PostService.getAllPosts(queryParams);
            setPosts(response.items);
            setPaginationInfo({
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                totalItems: response.totalItems,
                pageSize: 6
            });
            console.log("Fetched posts:", response);
        } catch (err) {
            setError("Failed to fetch posts. Please try again.");
            console.error("Error fetching posts:", err);
        } finally {
            setLoading(false);
        }
    };

    const deletePost = async (id: number) => {
        setPostToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!postToDelete) return;

        try {
            await PostService.deletePost(postToDelete.toString());
            // Refresh current page after delete
            fetchPosts({ page: paginationInfo.currentPage });
        } catch (err) {
            setError("Failed to delete post. Please try again.");
            console.error("Error deleting post:", err);
        } finally {
            setPostToDelete(null);
        }
    };

    const handlePageChange = (page: number) => {
        fetchPosts({ page });
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "123":
            case "active":
            case "published":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "draft":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            case "archived":
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
            default:
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
        }
    };

    const handleViewPost = async (post: Post) => {

        setSelectedPost(post);
        setIsDetailModalOpen(true);

    };

    const handleEditPost = (post: Post) => {
        setSelectedPost(post);
        setIsEditModalOpen(true);
    };

    const handleEditSuccess = () => {
        fetchPosts({ page: paginationInfo.currentPage }); // Refresh current page after successful edit
    };

    // Define table columns
    const columns: TableColumn<Post>[] = [
        {
            key: "title",
            title: "Title",
            width: "min-w-[220px]",
            render: (value, record) => (
                <div>
                    <h5 className="font-medium text-black dark:text-white">
                        {record.title || 'Untitled'}
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate max-w-[200px]">
                        {record.description || 'No description'}
                    </p>
                </div>
            )
        },
        {
            key: "postType",
            title: "Post Type",
            width: "min-w-[150px]",
            render: (value) => (
                <p className="text-black dark:text-white">
                    {value || 'N/A'}
                </p>
            )
        },
        {
            key: "price",
            title: "Price",
            width: "min-w-[120px]",
            render: (value) => (
                <p className="text-black dark:text-white">
                    {value ? value.toLocaleString() : '0'} VNĐ
                </p>
            )
        },
        {
            key: "status",
            title: "Status",
            width: "min-w-[120px]",
            render: (value) => (
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(value)}`}>
                    {value || 'Unknown'}
                </span>
            )
        },
        {
            key: "createdAt",
            title: "Created Date",
            width: "min-w-[120px]",
            render: (value) => (
                <p className="text-black dark:text-white">
                    {new Date(value).toLocaleDateString()}
                </p>
            )
        },
        {
            key: "actions",
            title: "Actions",
            render: (_, record) => (
                <div className="flex items-center space-x-3.5">
                    <button
                        className="hover:text-primary ml-5"
                        onClick={() => handleViewPost(record)}
                        title="View"
                    >
                        <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.17812 8.99981 3.17812C14.5686 3.17812 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.2031 8.99981 13.2031C13.1061 13.2031 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.79687 8.99981 4.79687C4.89356 4.79687 2.4748 7.95936 1.85605 8.99999Z"
                                fill=""
                            />
                            <path
                                d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 8.10938C8.50313 8.10938 8.10938 8.50313 8.10938 9C8.10938 9.49688 8.50313 9.89063 9 9.89063C9.49688 9.89063 9.89063 9.49688 9.89063 9C9.89063 8.50313 9.49688 8.10938 9 8.10938Z"
                                fill=""
                            />
                        </svg>
                    </button>
                    {/* <button
                        className="hover:text-primary"
                        onClick={() => handleEditPost(record)}
                        title="Edit"
                    >
                        <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.1569 2.9281C15.8113 2.58249 15.3738 2.39062 14.9113 2.39062C14.4488 2.39062 14.0113 2.58249 13.6657 2.9281L4.82815 11.7656C4.59065 12.0031 4.43128 12.3031 4.37503 12.6281L3.7969 15.9281C3.77503 16.0687 3.81565 16.2094 3.90003 16.3219C3.98128 16.4343 4.10628 16.5031 4.24378 16.5125C4.25628 16.5125 4.26878 16.5125 4.28128 16.5125L7.59378 15.9031C7.9219 15.8468 8.2219 15.6875 8.4594 15.45L17.2969 6.6125C17.9719 5.9375 17.9719 4.85 17.2969 4.175L16.1569 2.9281ZM6.84065 14.2781L5.05628 14.6656L5.45628 12.8812L12.4 5.93747L13.2938 6.83122L6.84065 14.2781ZM15.8531 5.16872L14.7375 6.28434L13.8438 5.39059L14.9594 4.27497C15.0563 4.17809 15.1813 4.125 15.3063 4.125C15.4313 4.125 15.5563 4.17809 15.6531 4.27497L16.7938 5.52184C16.9875 5.71559 16.9875 6.03434 16.7938 6.22809L15.8531 5.16872Z"
                                fill=""
                            />
                        </svg>
                    </button> */}
                    {/* <button
                        className="hover:text-red-500"
                        onClick={() => deletePost(record.postId)}
                        title="Delete"
                    >
                        <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90039C7.05664 0.478149 6.38164 1.15315 6.38164 1.9969V2.47502H4.21289C3.40039 2.47502 2.72539 3.14065 2.72539 3.95315C2.72539 4.76565 3.39102 5.43127 4.21289 5.43127H13.7535C14.5660 5.43127 15.2410 4.76565 15.2410 3.95315C15.2410 3.14065 14.5754 2.47502 13.7535 2.47502ZM7.67539 1.9969C7.67539 1.85627 7.79102 1.74065 7.93164 1.74065H10.0973C10.2379 1.74065 10.3535 1.85627 10.3535 1.9969V2.47502H7.70664V1.9969H7.67539Z"
                                fill=""
                            />
                            <path
                                d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                fill=""
                            />
                            <path
                                d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                fill=""
                            />
                            <path
                                d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.34120 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                fill=""
                            />
                            <path
                                d="M4.85352 14.8219L5.24727 6.96567C5.27539 6.6282 5.58477 6.37508 5.92227 6.40321C6.25977 6.43133 6.51289 6.74071 6.48477 7.07821L6.09102 14.9344C6.06289 15.2719 5.75352 15.525 5.41602 15.4969C5.10664 15.4688 4.82539 15.1594 4.85352 14.8219Z"
                                fill=""
                            />
                            <path
                                d="M13.1754 6.40321C13.5129 6.37508 13.8223 6.6282 13.8504 6.96567L14.2441 14.8219C14.2723 15.1594 13.991 15.4688 13.6816 15.4969C13.6535 15.4969 13.6535 15.4969 13.6254 15.4969C13.2879 15.4969 13.0066 15.2438 12.9785 14.9063L12.5848 7.05008C12.5566 6.71258 12.8098 6.40321 13.1473 6.37508L13.1754 6.40321Z"
                                fill=""
                            />
                        </svg>
                    </button> */}
                </div>
            )
        }
    ];

    return (
        <>
            <DataTable
                columns={columns}
                data={posts}
                loading={loading}
                error={error}
                title="Post Management"
                onRefresh={() => fetchPosts({ page: paginationInfo.currentPage })}
                emptyMessage="No posts found"
                pagination={paginationInfo}
                onPageChange={handlePageChange}

            />

            {/* Post Detail Modal */}
            <PostDetailModal
                post={selectedPost}
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
            />

            {/* Post Edit Modal */}
            <PostEditModal
                post={selectedPost}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSuccess={handleEditSuccess}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setPostToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                title="Delete Post"
                message="Are you sure you want to delete this post? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
            />
        </>
    );
}