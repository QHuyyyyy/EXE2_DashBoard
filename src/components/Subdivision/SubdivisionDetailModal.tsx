"use client";

import { Subdivision } from "@/services/subdivision.service";

interface SubdivisionDetailModalProps {
    subdivision: Subdivision | null;
    isOpen: boolean;
    onClose: () => void;
}

export function SubdivisionDetailModal({ subdivision, isOpen, onClose }: SubdivisionDetailModalProps) {
    if (!isOpen || !subdivision) return null;

    const getTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case "cao tầng":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
            case "thấp tầng":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "villa":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
            case "commercial":
                return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
        }
    };

    return (
        <div className="fixed inset-0 z-999999 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-3xl bg-white dark:bg-boxdark rounded-sm shadow-default">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-stroke dark:border-strokedark px-6 py-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                        Subdivision Details
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
                    {/* Header Section with Name and Type */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-black dark:text-white">
                                {subdivision.name}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">ID: #{subdivision.subdivisionId}</p>
                        </div>
                        <span className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${getTypeColor(subdivision.type)}`}>
                            {subdivision.type}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium text-black dark:text-white border-b border-stroke dark:border-strokedark pb-2">
                                Basic Information
                            </h4>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Subdivision Name
                                </label>
                                <p className="text-black dark:text-white font-medium">
                                    {subdivision.name}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Subdivision ID
                                </label>
                                <p className="text-black dark:text-white">
                                    #{subdivision.subdivisionId}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Type
                                </label>
                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getTypeColor(subdivision.type)}`}>
                                    {subdivision.type}
                                </span>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Created Date
                                </label>
                                <p className="text-black dark:text-white">
                                    {new Date(subdivision.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Description and Statistics */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium text-black dark:text-white border-b border-stroke dark:border-strokedark pb-2">
                                Details & Statistics
                            </h4>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description
                                </label>
                                <p className="text-black dark:text-white">
                                    {subdivision.description || 'No description available'}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Number of Buildings
                                </label>
                                <p className="text-black dark:text-white">
                                    {subdivision.buildingCount || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Section */}
                    <div className="mt-6">
                        <h4 className="text-lg font-medium text-black dark:text-white border-b border-stroke dark:border-strokedark pb-2 mb-4">
                            Subdivision Statistics
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-50 dark:bg-meta-4 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-primary">
                                    {subdivision.subdivisionId}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Subdivision ID
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-meta-4 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-success">
                                    {subdivision.buildingCount || 0}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Total Buildings
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-meta-4 p-4 rounded-lg">
                                <div className="text-lg font-bold text-warning">
                                    {subdivision.type}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Type
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-meta-4 p-4 rounded-lg">
                                <div className="text-lg font-bold text-danger">
                                    {new Date(subdivision.createdAt).getFullYear()}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Created Year
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description Detail Section */}
                    {subdivision.description && (
                        <div className="mt-6">
                            <h4 className="text-lg font-medium text-black dark:text-white border-b border-stroke dark:border-strokedark pb-2 mb-4">
                                Full Description
                            </h4>
                            <div className="bg-gray-50 dark:bg-meta-4 p-4 rounded-lg">
                                <p className="text-black dark:text-white whitespace-pre-wrap">
                                    {subdivision.description}
                                </p>
                            </div>
                        </div>
                    )}
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