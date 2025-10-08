"use client";

import { useState, useEffect } from "react";
import { Building, BuildingService, UpdateBuildingRequest } from "@/services/building.service";

interface BuildingEditModalProps {
    building: Building | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function BuildingEditModal({ building, isOpen, onClose, onSuccess }: BuildingEditModalProps) {
    const [formData, setFormData] = useState<UpdateBuildingRequest>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (building) {
            setFormData({
                subdivisionId: building.subdivisionId,
                name: building.name,
                blockCode: building.blockCode,
                description: building.description || '',
            });
        }
    }, [building]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!building) return;

        setLoading(true);
        setError(null);

        try {
            await BuildingService.updateBuilding(building.buildingId.toString(), formData);
            onSuccess();
            onClose();
        } catch (err) {
            setError("Failed to update building. Please try again.");
            console.error("Error updating building:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'subdivisionId' ? parseInt(value) || 0 : value
        }));
    };

    if (!isOpen || !building) return null;

    return (
        <div className="fixed inset-0 z-999999 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white dark:bg-boxdark rounded-sm shadow-default">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-stroke dark:border-strokedark px-6 py-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                        Edit Building
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
                                Building Name <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                placeholder="Enter building name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Block Code <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="blockCode"
                                    value={formData.blockCode || ''}
                                    onChange={handleChange}
                                    placeholder="Enter block code"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Subdivision ID <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="subdivisionId"
                                    value={formData.subdivisionId || ''}
                                    onChange={handleChange}
                                    placeholder="Enter subdivision ID"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2.5 block text-black dark:text-white">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description || ''}
                                onChange={handleChange}
                                placeholder="Enter building description"
                                rows={4}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary resize-none"
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
                            {loading ? 'Updating...' : 'Update Building'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}