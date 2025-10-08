"use client";

import { useState, useEffect } from "react";
import { User, UserService, UpdateUserRequest } from "@/services/user.service";

interface UserEditModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function UserEditModal({ user, isOpen, onClose, onSuccess }: UserEditModalProps) {
    const [formData, setFormData] = useState<UpdateUserRequest>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                email: user.email,
                role: user.role,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber || '',
                address: user.address || '',
                dateOfBirth: user.dateOfBirth || '',
                status: user.status,
                isEmailVerified: user.isEmailVerified,
            });
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        setError(null);

        try {
            await UserService.updateUser(user.userId.toString(), formData);
            onSuccess();
            onClose();
        } catch (err) {
            setError("Failed to update user. Please try again.");
            console.error("Error updating user:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 z-999999 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-3xl bg-white dark:bg-boxdark rounded-sm shadow-default">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-stroke dark:border-strokedark px-6 py-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                        Edit User
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
                        {/* Left Column - Basic Information */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium text-black dark:text-white border-b border-stroke dark:border-strokedark pb-2">
                                Basic Information
                            </h4>

                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Full Name <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName || ''}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Username <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username || ''}
                                    onChange={handleChange}
                                    placeholder="Enter username"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Email Address <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber || ''}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth || ''}
                                    onChange={handleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                        </div>

                        {/* Right Column - Account Settings */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium text-black dark:text-white border-b border-stroke dark:border-strokedark pb-2">
                                Account Settings
                            </h4>

                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Role <span className="text-meta-1">*</span>
                                </label>
                                <select
                                    name="role"
                                    value={formData.role || ''}
                                    onChange={handleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                >
                                    <option value="">Select role</option>
                                    <option value="admin">Admin</option>
                                    <option value="manager">Manager</option>
                                    <option value="user">User</option>
                                    <option value="tenant">Tenant</option>
                                    <option value="landlord">Landlord</option>
                                </select>
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
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="suspended">Suspended</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address || ''}
                                    onChange={handleChange}
                                    placeholder="Enter address"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isEmailVerified"
                                    name="isEmailVerified"
                                    checked={formData.isEmailVerified || false}
                                    onChange={handleChange}
                                    className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor="isEmailVerified" className="text-black dark:text-white">
                                    Email Verified
                                </label>
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
                            {loading ? 'Updating...' : 'Update User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}