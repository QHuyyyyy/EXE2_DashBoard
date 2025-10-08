"use client";

import { User } from "@/services/user.service";

interface UserDetailModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
}

export function UserDetailModal({ user, isOpen, onClose }: UserDetailModalProps) {
    if (!isOpen || !user) return null;

    const getRoleColor = (role: string) => {
        switch (role?.toLowerCase()) {
            case "admin":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
            case "manager":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
            case "user":
            case "tenant":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "landlord":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case "active":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "inactive":
            case "suspended":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
            case "pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
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
                        User Details
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
                    {/* User Avatar and Basic Info */}
                    <div className="flex items-center space-x-6 mb-6">
                        <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.fullName}
                                    className="h-20 w-20 rounded-full object-cover"
                                />
                            ) : (
                                <span className="text-2xl font-medium text-gray-600 dark:text-gray-300">
                                    {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-black dark:text-white">
                                {user.fullName}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">@{user.username}</p>
                            <div className="flex items-center space-x-3 mt-2">
                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getRoleColor(user.role)}`}>
                                    {user.role}
                                </span>
                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(user.status)}`}>
                                    {user.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Contact Information */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium text-black dark:text-white border-b border-stroke dark:border-strokedark pb-2">
                                Contact Information
                            </h4>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email Address
                                </label>
                                <div className="flex items-center space-x-2">
                                    <p className="text-black dark:text-white">
                                        {user.email}
                                    </p>
                                    {user.isEmailVerified ? (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Verified
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            Unverified
                                        </span>
                                    )}
                                </div>
                            </div>

                            {user.phoneNumber && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Phone Number
                                    </label>
                                    <p className="text-black dark:text-white">
                                        {user.phoneNumber}
                                    </p>
                                </div>
                            )}

                            {user.address && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Address
                                    </label>
                                    <p className="text-black dark:text-white">
                                        {user.address}
                                    </p>
                                </div>
                            )}

                            {user.dateOfBirth && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Date of Birth
                                    </label>
                                    <p className="text-black dark:text-white">
                                        {new Date(user.dateOfBirth).toLocaleDateString()}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Account Information */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium text-black dark:text-white border-b border-stroke dark:border-strokedark pb-2">
                                Account Information
                            </h4>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    User ID
                                </label>
                                <p className="text-black dark:text-white">
                                    #{user.userId}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Username
                                </label>
                                <p className="text-black dark:text-white">
                                    {user.username}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Role
                                </label>
                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getRoleColor(user.role)}`}>
                                    {user.role}
                                </span>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Account Status
                                </label>
                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(user.status)}`}>
                                    {user.status}
                                </span>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Member Since
                                </label>
                                <p className="text-black dark:text-white">
                                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>

                            {user.lastLoginAt && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Last Login
                                    </label>
                                    <p className="text-black dark:text-white">
                                        {new Date(user.lastLoginAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            )}
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