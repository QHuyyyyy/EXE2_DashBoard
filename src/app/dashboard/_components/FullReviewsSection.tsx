"use client";

import React, { useEffect, useMemo, useState } from "react";
import api from "@/services/api";

type Review = {
    reviewId: number;
    reviewUsername: string;
    rating: number;
    comment: string;
    createdAt: string;
};

type Post = {
    postId: number;
    postName: string;
    username: string;
    averageRating: number;
    reviewsDetailsList: Review[];
};

// API may return either daily or monthly structures. We'll support both.
interface DailyResponse {
    daily: Array<{
        date: string;
        posts: Post[];
    }>;
}

interface MonthlyResponse {
    year: number;
    monthly: Array<{
        month: number;
        monthName: string;
        posts: Post[];
    }>;
}

export default function FullReviewsSection() {
    const now = new Date();
    const [year, setYear] = useState<number>(now.getFullYear());
    const [month, setMonth] = useState<string>(String(now.getMonth() + 1));
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<DailyResponse | MonthlyResponse | null>(null);

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const params: any = {};
                if (year) params.year = year;
                if (month) params.month = Number(month);
                const res = await api.get("/Report/reviews/daily-by-post", {
                    params: Object.keys(params).length ? params : undefined,
                });
                if (!mounted) return;
                setData(res?.data ?? null);
            } catch (e: any) {
                if (!mounted) return;
                setError(e?.message ?? "Failed to load reviews");
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => {
            mounted = false;
        };
    }, [year, month]);

    const reviews = useMemo(() => {
        const items: Array<{
            id: number;
            user: string;
            rating: number;
            comment: string;
            createdAt: string;
            postName: string;
            postOwner: string;
            label: string; // date or month label
        }> = [];

        if (!data) return items;

        if ((data as DailyResponse).daily && Array.isArray((data as DailyResponse).daily)) {
            (data as DailyResponse).daily.forEach((d) => {
                d.posts?.forEach((p) => {
                    p.reviewsDetailsList?.forEach((r) => {
                        items.push({
                            id: r.reviewId,
                            user: r.reviewUsername,
                            rating: r.rating,
                            comment: r.comment,
                            createdAt: r.createdAt,
                            postName: p.postName,
                            postOwner: p.username,
                            label: d.date,
                        });
                    });
                });
            });
        } else if ((data as MonthlyResponse).monthly && Array.isArray((data as MonthlyResponse).monthly)) {
            (data as MonthlyResponse).monthly.forEach((m) => {
                m.posts?.forEach((p) => {
                    p.reviewsDetailsList?.forEach((r) => {
                        items.push({
                            id: r.reviewId,
                            user: r.reviewUsername,
                            rating: r.rating,
                            comment: r.comment,
                            createdAt: r.createdAt,
                            postName: p.postName,
                            postOwner: p.username,
                            label: `${m.monthName} ${(data as MonthlyResponse).year}`,
                        });
                    });
                });
            });
        }

        // Most recent first
        return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [data]);

    return (
        <div className="col-span-12 rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-body-2xlg font-bold text-dark dark:text-white">All Reviews</h2>

                <div className="flex items-center gap-2">
                    <label className="text-sm">Month:</label>
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="rounded border px-2 py-1 text-sm"
                    >
                        <option value="">All</option>
                        <option value="1">Jan</option>
                        <option value="2">Feb</option>
                        <option value="3">Mar</option>
                        <option value="4">Apr</option>
                        <option value="5">May</option>
                        <option value="6">Jun</option>
                        <option value="7">Jul</option>
                        <option value="8">Aug</option>
                        <option value="9">Sep</option>
                        <option value="10">Oct</option>
                        <option value="11">Nov</option>
                        <option value="12">Dec</option>
                    </select>

                    <label className="text-sm ml-2">Year:</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value || now.getFullYear()))}
                        className="w-20 rounded border px-2 py-1 text-sm"
                    />
                </div>
            </div>

            <div className="mt-5 max-h-[520px] overflow-auto pr-1">
                {loading && (
                    <div className="py-10 text-center text-gray-500 dark:text-gray-400">Loading reviews…</div>
                )}
                {error && (
                    <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                        {error}
                    </div>
                )}

                {!loading && !error && reviews.length === 0 && (
                    <div className="py-10 text-center text-gray-500 dark:text-gray-400">No reviews found.</div>
                )}

                {!loading && !error && reviews.length > 0 && (
                    <ul className="space-y-3">
                        {reviews.map((r) => (
                            <li key={r.id} className="rounded border border-gray-100 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 text-sm font-semibold text-white">
                                            {r.user?.charAt(0)?.toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{r.user}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(r.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`h-4 w-4 ${i < Math.round(r.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                {r.comment && (
                                    <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{r.comment}</p>
                                )}
                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    Post: <span className="font-medium text-gray-700 dark:text-gray-300">{r.postName}</span> by {r.postOwner} — {r.label}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
