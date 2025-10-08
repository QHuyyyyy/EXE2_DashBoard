"use client";

import { useState } from "react";
import { Post, UpdatePostRequest, PostService } from "@/services/post.service";

interface PostEditModalProps {
    post: Post | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function PostEditModal({ post, isOpen, onClose, onSuccess }: PostEditModalProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<UpdatePostRequest>({
        title: post?.title || "",
        description: post?.description || "",
        price: post?.price || 0,
        postType: post?.postType || "",
        status: post?.status || "",
    });

    if (!isOpen || !post) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!post) return;

        try {
            setLoading(true);
            setError(null);
            await PostService.updatePost(post.postId.toString(), formData);
            onSuccess();
            onClose();
        } catch (err) {
            setError("Failed to update post. Please try again.");
            console.error("Error updating post:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? Number(value) : value
        }));
    };

    return (
        <div className="fixed flex items-center justify-center bg-black bg-opacity-50 inset-0 z-50">
            <div className="mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 dark:bg-boxdark">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-black dark:text-white">
                        Edit Post
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

                {error && (
                    <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-300">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Price (VNĐ)
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                min="0"
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Post Type
                            </label>
                            <select
                                name="postType"
                                value={formData.postType}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white"
                            >
                                <option value="">Select type</option>
                                <option value="ForRent">For Rent</option>
                                <option value="ForSale">For Sale</option>
                                <option value="Sharing">Sharing</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white"
                        >
                            <option value="">Select status</option>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-strokedark dark:text-gray-300 dark:hover:bg-boxdark"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90 disabled:opacity-50"
                        >
                            {loading ? "Updating..." : "Update Post"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}