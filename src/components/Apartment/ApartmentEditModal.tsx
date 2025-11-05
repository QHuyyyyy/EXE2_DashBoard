"use client";

import { useState, useEffect } from "react";
import { Apartment, ApartmentService, UpdateApartmentRequest } from "@/services/apartment.service";

interface ApartmentEditModalProps {
    apartment: Apartment | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function ApartmentEditModal({ apartment, isOpen, onClose, onSuccess }: ApartmentEditModalProps) {
    const [formData, setFormData] = useState<UpdateApartmentRequest>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (apartment) {
            setFormData({
                buildingId: apartment.buildingId,
                apartmentCode: apartment.apartmentCode,
                floor: apartment.floor,
                area: apartment.area,
                apartmentType: apartment.apartmentType,
                status: apartment.status,
                numberBathroom: apartment.numberBathroom,
            });
        }
    }, [apartment]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!apartment) return;

        setLoading(true);
        setError(null);

        try {
            await ApartmentService.updateApartment(apartment.apartmentId.toString(), formData);
            onSuccess();
            onClose();
        } catch (err) {
            setError("Failed to update apartment. Please try again.");
            console.error("Error updating apartment:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'buildingId' || name === 'floor' || name === 'area' || name === 'numberBathroom'
                ? parseInt(value) || 0
                : value
        }));
    };

    if (!isOpen || !apartment) return null;

    return (
        <div className="fixed inset-0 z-999999 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white dark:bg-boxdark rounded-sm shadow-default">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-stroke dark:border-strokedark px-6 py-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                        Edit Apartment
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Apartment Code <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="apartmentCode"
                                    value={formData.apartmentCode || ''}
                                    onChange={handleChange}
                                    placeholder="Enter apartment code"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Building ID <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="buildingId"
                                    value={formData.buildingId || ''}
                                    onChange={handleChange}
                                    placeholder="Enter building ID"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Floor <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="floor"
                                    value={formData.floor || ''}
                                    onChange={handleChange}
                                    placeholder="Enter floor number"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Area (m²) <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="area"
                                    value={formData.area || ''}
                                    onChange={handleChange}
                                    placeholder="Enter area in square meters"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Apartment Type <span className="text-meta-1">*</span>
                                </label>
                                <select
                                    name="apartmentType"
                                    value={formData.apartmentType || ''}
                                    onChange={handleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                >
                                    <option value="">Select apartment type</option>
                                    <option value="Studio">Studio</option>
                                    <option value="1BR">1 Bedroom</option>
                                    <option value="2BR">2 Bedroom</option>
                                    <option value="3BR">3 Bedroom</option>
                                    <option value="4BR">4 Bedroom</option>
                                    <option value="Penthouse">Penthouse</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Number of BathRoom <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="numberBathroom"
                                    value={formData.numberBathroom || ''}
                                    onChange={handleChange}
                                    placeholder="Enter number of bathrooms"
                                    min="0"
                                    max="10"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Status <span className="text-meta-1">*</span>
                                </label>
                                <select
                                    name="status"
                                    value={formData.status || ''}
                                    onChange={handleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                >
                                    <option value="">Select status</option>
                                    <option value="available">Available</option>
                                    <option value="occupied">Occupied</option>
                                    <option value="maintenance">Under Maintenance</option>
                                    <option value="unavailable">Unavailable</option>
                                    <option value="reserved">Reserved</option>
                                </select>
                            </div>
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
                            {loading ? 'Updating...' : 'Update Apartment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}