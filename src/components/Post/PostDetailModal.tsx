"use client";

import { Post } from "@/services/post.service";

interface PostDetailModalProps {
    post: Post | null;
    isOpen: boolean;
    onClose: () => void;
}

export function PostDetailModal({ post, isOpen, onClose }: PostDetailModalProps) {
    if (!isOpen || !post) return null;

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 dark:bg-boxdark">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-black dark:text-white">
                        Post Details
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Title
                        </label>
                        <p className="mt-1 text-black dark:text-white">{post.title || 'Untitled'}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Post Type
                        </label>
                        <p className="mt-1 text-black dark:text-white">{post.postType || 'N/A'}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Price
                        </label>
                        <p className="mt-1 text-black dark:text-white">{post.price ? post.price.toLocaleString() : '0'} VNĐ</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Status
                        </label>
                        <span className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(post.status)}`}>
                            {post.status || 'Unknown'}
                        </span>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                        </label>
                        <p className="mt-1 text-black dark:text-white">{post.description || 'No description'}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Images ({post.images?.length || 0})
                        </label>
                        <div className="mt-2">
                            {post.images && post.images.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                    {post.images.map((image, index) => (
                                        <div key={image.imageId || index} className="relative overflow-hidden rounded-lg">
                                            <img
                                                src={image.imageUrl}
                                                alt={`Post image ${index + 1}`}
                                                className="h-24 w-full object-cover transition-transform hover:scale-105"
                                                onError={(e) => {
                                                    console.error('Image failed to load:', image.imageUrl);
                                                    e.currentTarget.src = '/images/placeholder.jpg';
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex h-20 items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
                                    <div className="text-center">
                                        <svg
                                            className="mx-auto h-8 w-8 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">No images</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                User ID
                            </label>
                            <p className="mt-1 text-black dark:text-white">
                                {post.userId}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Apartment ID
                            </label>
                            <p className="mt-1 text-black dark:text-white">
                                {post.apartmentId}
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Created At
                        </label>
                        <p className="mt-1 text-black dark:text-white">
                            {new Date(post.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}