"use client";

import { ReactNode } from "react";
import { Pagination } from "@/components/ui/Pagination";

export interface TableColumn<T> {
    key: string;
    title: string;
    render?: (value: any, record: T, index: number) => ReactNode;
    width?: string;
    className?: string;
}

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
}

export interface DataTableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    loading?: boolean;
    error?: string | null;
    title?: string;
    actions?: ReactNode;
    onRefresh?: () => void;
    emptyMessage?: string;
    className?: string;
    pagination?: PaginationInfo;
    onPageChange?: (page: number) => void;
}

export function DataTable<T extends Record<string, any>>({
    columns,
    data,
    loading = false,
    error = null,
    title,
    actions,
    onRefresh,
    emptyMessage = "No data found",
    className = "",
    pagination,
    onPageChange
}: DataTableProps<T>) {
    return (
        <div className={`rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 ${className}`}>
            {/* Header */}
            {(title || actions || onRefresh) && (
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {title && (
                        <h4 className="text-xl font-semibold text-black dark:text-white">
                            {title}
                        </h4>
                    )}
                    <div className="flex gap-2">
                        {onRefresh && (
                            <button
                                onClick={onRefresh}
                                className="inline-flex items-center justify-center rounded-md bg-gray-600 px-4 py-2 text-center font-medium text-white hover:bg-opacity-90"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Refresh"}
                            </button>
                        )}
                        {actions}
                    </div>
                </div>
            )}

            {/* Error message */}
            {error && (
                <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-300">
                    {error}
                </div>
            )}

            {/* Loading state */}
            {loading ? (
                <div className="flex items-center justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <span className="ml-2 text-black dark:text-white">Loading...</span>
                </div>
            ) : (
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                {columns.map((column, index) => (
                                    <th
                                        key={column.key}
                                        className={`px-4 py-4 font-medium text-black dark:text-white ${column.width || "min-w-[120px]"
                                            } ${index === 0 ? "xl:pl-11" : ""
                                            } ${column.className || ""}`}
                                    >
                                        {column.title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="border-b border-[#eee] px-4 py-8 text-center dark:border-strokedark"
                                    >
                                        <p className="text-gray-500 dark:text-gray-400">
                                            {emptyMessage}
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                data.map((record, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {columns.map((column, colIndex) => (
                                            <td
                                                key={column.key}
                                                className={`border-b border-[#eee] px-4 py-5 dark:border-strokedark ${colIndex === 0 ? "pl-9 xl:pl-11" : ""
                                                    } ${column.className || ""}`}
                                            >
                                                {column.render
                                                    ? column.render(record[column.key], record, rowIndex)
                                                    : record[column.key] || "-"}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {pagination && onPageChange && !loading && (
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    totalItems={pagination.totalItems}
                    pageSize={pagination.pageSize}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
}