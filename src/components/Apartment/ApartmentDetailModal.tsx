"use client";

import { Apartment } from "@/services/apartment.service";

interface ApartmentDetailModalProps {
    apartment: Apartment | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ApartmentDetailModal({ apartment, isOpen, onClose }: ApartmentDetailModalProps) {
    if (!isOpen || !apartment) return null;

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "available":
            case "vacant":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "occupied":
            case "rented":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
            case "maintenance":
            case "under maintenance":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            case "unavailable":
            case "reserved":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
        }
    };

    return (
        <div className="fixed inset-0 z-999999 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white dark:bg-boxdark rounded-sm shadow-default">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-stroke dark:border-strokedark px-6 py-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                        Apartment Details
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
                                    Apartment Code
                                </label>
                                <p className="text-black dark:text-white font-medium">
                                    {apartment.apartmentCode}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Building ID
                                </label>
                                <p className="text-black dark:text-white">
                                    {apartment.buildingId}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Floor
                                </label>
                                <p className="text-black dark:text-white">
                                    {apartment.floor}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Area
                                </label>
                                <p className="text-black dark:text-white">
                                    {apartment.area} m²
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
                                    Apartment Type
                                </label>
                                <p className="text-black dark:text-white">
                                    {apartment.apartmentType}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Number of Bedrooms
                                </label>
                                <p className="text-black dark:text-white">
                                    {apartment.numberOfBedrooms}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Status
                                </label>
                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(apartment.status)}`}>
                                    {apartment.status}
                                </span>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Created Date
                                </label>
                                <p className="text-black dark:text-white">
                                    {new Date(apartment.createdAt).toLocaleDateString('en-US', {
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

                    {/* Posts Information */}
                    {apartment.postIds && apartment.postIds.length > 0 && (
                        <div className="mt-6">
                            <h4 className="text-lg font-medium text-black dark:text-white border-b border-stroke dark:border-strokedark pb-2 mb-4">
                                Related Posts
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {apartment.postIds.map((postId) => (
                                    <span
                                        key={postId}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                    >
                                        Post #{postId}
                                    </span>
                                ))}
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