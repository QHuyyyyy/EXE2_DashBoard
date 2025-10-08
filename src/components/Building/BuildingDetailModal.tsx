"use client";

import { Building } from "@/services/building.service";

interface BuildingDetailModalProps {
    building: Building | null;
    isOpen: boolean;
    onClose: () => void;
}

export function BuildingDetailModal({ building, isOpen, onClose }: BuildingDetailModalProps) {
    if (!isOpen || !building) return null;

    return (
        <div className="fixed inset-0 z-999999 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white dark:bg-boxdark rounded-sm shadow-default">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-stroke dark:border-strokedark px-6 py-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                        Building Details
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
                <div className="px-6 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium text-black dark:text-white border-b border-stroke dark:border-strokedark pb-2">
                                Basic Information
                            </h4>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Building Name
                                </label>
                                <p className="text-black dark:text-white font-medium">
                                    {building.name}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Block Code
                                </label>
                                <p className="text-black dark:text-white">
                                    {building.blockCode}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Building ID
                                </label>
                                <p className="text-black dark:text-white">
                                    #{building.buildingId}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Subdivision ID
                                </label>
                                <p className="text-black dark:text-white">
                                    {building.subdivisionId}
                                    {building.subdivisionName && (
                                        <span className="text-gray-500 dark:text-gray-400 ml-2">
                                            ({building.subdivisionName})
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium text-black dark:text-white border-b border-stroke dark:border-strokedark pb-2">
                                Details
                            </h4>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description
                                </label>
                                <p className="text-black dark:text-white">
                                    {building.description || 'No description available'}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Number of Apartments
                                </label>
                                <p className="text-black dark:text-white">
                                    {building.apartmentCount || 0}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Created Date
                                </label>
                                <p className="text-black dark:text-white">
                                    {new Date(building.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Section */}
                    <div className="mt-6">
                        <h4 className="text-lg font-medium text-black dark:text-white border-b border-stroke dark:border-strokedark pb-2 mb-4">
                            Building Statistics
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-50 dark:bg-meta-4 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-primary">
                                    {building.apartmentCount || 0}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Total Apartments
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-meta-4 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-success">
                                    {building.blockCode}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Block Code
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-stroke dark:border-strokedark px-6 py-4">
                    <button
                        onClick={onClose}
                        className="inline-flex justify-center rounded-md border border-stroke dark:border-strokedark bg-gray-50 dark:bg-meta-4 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}