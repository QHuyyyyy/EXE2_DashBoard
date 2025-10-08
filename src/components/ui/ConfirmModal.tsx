"use client";

import { useEffect } from "react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    type?: "danger" | "warning" | "info";
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to proceed?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "danger"
}) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const getIconColor = () => {
        switch (type) {
            case "danger":
                return "text-red-600";
            case "warning":
                return "text-yellow-600";
            case "info":
                return "text-blue-600";
            default:
                return "text-red-600";
        }
    };

    const getConfirmButtonColor = () => {
        switch (type) {
            case "danger":
                return "bg-red-600 hover:bg-red-700 focus:ring-red-500";
            case "warning":
                return "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500";
            case "info":
                return "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500";
            default:
                return "bg-red-600 hover:bg-red-700 focus:ring-red-500";
        }
    };

    // Handle ESC key press
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-boxdark rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all">
                <div className="p-6">
                    <div className="flex items-center">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 sm:mx-0 sm:h-10 sm:w-10">
                            <svg
                                className={`h-6 w-6 ${getIconColor()}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                {title}
                            </h3>
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {message}
                        </p>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-gray-300 dark:border-strokedark bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            onClick={onClose}
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${getConfirmButtonColor()}`}
                            onClick={handleConfirm}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};