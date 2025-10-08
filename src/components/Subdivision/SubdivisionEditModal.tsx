"use client";

import { useState, useEffect } from "react";
import { Subdivision, SubdivisionService, UpdateSubdivisionRequest } from "@/services/subdivision.service";

interface SubdivisionEditModalProps {
    subdivision: Subdivision | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function SubdivisionEditModal({ subdivision, isOpen, onClose, onSuccess }: SubdivisionEditModalProps) {
    const [formData, setFormData] = useState<UpdateSubdivisionRequest>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (subdivision) {
            setFormData({
                name: subdivision.name,
                type: subdivision.type,
                description: subdivision.description || '',
            });
        }
    }, [subdivision]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subdivision) return;

        setLoading(true);
        setError(null);

        try {
            await SubdivisionService.updateSubdivision(subdivision.subdivisionId.toString(), formData);
            onSuccess();
            onClose();
        } catch (err) {
            setError("Failed to update subdivision. Please try again.");
            console.error("Error updating subdivision:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!isOpen || !subdivision) return null;

    return (
        <div className="fixed inset-0 z-999999 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white dark:bg-boxdark rounded-sm shadow-default">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-stroke dark:border-strokedark px-6 py-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                        Edit Subdivision
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="px-6 py-6">
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="mb-2.5 block text-black dark:text-white">
                                Subdivision Name <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                placeholder="Enter subdivision name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2.5 block text-black dark:text-white">
                                Type <span className="text-meta-1">*</span>
                            </label>
                            <select
                                name="type"
                                value={formData.type || ''}
                                onChange={handleChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                required
                            >
                                <option value="">Select subdivision type</option>
                                <option value="Cao tầng">Cao tầng</option>
                                <option value="Thấp tầng">Thấp tầng</option>
                                <option value="Villa">Villa</option>
                                <option value="Commercial">Commercial</option>
                                <option value="Mixed Use">Mixed Use</option>
                                <option value="Residential">Residential</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2.5 block text-black dark:text-white">
                                Description <span className="text-meta-1">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description || ''}
                                onChange={handleChange}
                                placeholder="Enter subdivision description"
                                rows={5}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary resize-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-stroke dark:border-strokedark">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex justify-center rounded-md border border-stroke dark:border-strokedark bg-gray-50 dark:bg-meta-4 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Subdivision'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}