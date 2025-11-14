"use client";

import React, { useEffect, useState } from "react";
import api from "@/services/api";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    year?: number;
    month?: number;
    date?: string; // ISO date string
};

type DailyData = {
    daily: Array<{
        date: string;
        posts: Post[];
    }>;
};

type MonthlyData = {
    year: number;
    monthly: Array<{
        month: number;
        monthName: string;
        posts: Post[];
    }>;
};

type Post = {
    postId: number;
    postName: string;
    username: string;
    newReviews: number;
    averageRating: number;
    reviewsDetailsList: Review[];
};

type Review = {
    reviewId: number;
    reviewUsername: string;
    rating: number;
    comment: string;
    createdAt: string;
};

export default function ReviewsModal({ isOpen, onClose, year, month, date }: Props) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DailyData | MonthlyData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());

    useEffect(() => {
        let mounted = true;
        async function load() {
            if (!isOpen) return;
            setLoading(true);
            setError(null);
            try {
                const params: any = {};
                if (year) params.year = year;
                if (month) params.month = month;
                if (date) params.date = date;

                const res = await api.get("/Report/reviews/daily-by-post", { params: Object.keys(params).length ? params : undefined });
                if (!mounted) return;
                setData(res?.data ?? null);
                setExpandedReviews(new Set());
            } catch (err: any) {
                console.error("ReviewsModal load error", err);
                if (mounted) setError(err?.message ?? String(err));
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();

        return () => {
            mounted = false;
        };
    }, [isOpen, year, month, date]);

    const toggleReviewsExpanded = (postId: number) => {
        const newSet = new Set(expandedReviews);
        if (newSet.has(postId)) {
            newSet.delete(postId);
        } else {
            newSet.add(postId);
        }
        setExpandedReviews(newSet);
    };

    if (!isOpen) return null;

    // Determine header text based on params
    let headerText = "Reviews Details";
    if (date) {
        headerText = `Reviews for ${date}`;
    } else if (month && year) {
        headerText = `Reviews for ${month}/${year}`;
    } else if (year) {
        headerText = `Reviews for Year ${year}`;
    }

    return (
        <div className="fixed inset-0 z-50 mt-20 flex items-center justify-center bg-opacity-40 p-4">
            <div className="relative w-full max-w-4xl bg-white dark:bg-boxdark rounded-xl shadow-2xl overflow-hidden flex flex-col" style={{ maxHeight: '80vh' }}>
                {/* Scroll Area: include header so sticky doesn't overlap */}
                <div className="flex-1 overflow-auto">
                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 border-b border-gray-200 dark:border-slate-600 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{headerText}</h3>
                            <button
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded transition"
                                onClick={onClose}
                                aria-label="Close modal"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {loading && (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                                <span className="ml-3 text-gray-600 dark:text-gray-400">Loading reviews...</span>
                            </div>
                        )}

                        {error && (
                            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
                                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                            </div>
                        )}

                        {!loading && !error && data && (
                            <div className="space-y-6 ">
                                {/* Daily view */}
                                {(data as DailyData).daily && Array.isArray((data as DailyData).daily) ? (
                                    (data as DailyData).daily.map((day: any) => (
                                        <div key={day.date} className="space-y-4">
                                            <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-200 dark:border-slate-600">
                                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                                                    </svg>
                                                    <span className="font-semibold text-lg">{day.date}</span>
                                                </div>
                                            </div>
                                            <PostsList posts={day.posts} expandedReviews={expandedReviews} onToggle={toggleReviewsExpanded} />
                                        </div>
                                    ))
                                ) : (data as MonthlyData).monthly && Array.isArray((data as MonthlyData).monthly) ? (
                                    /* Monthly view */
                                    (data as MonthlyData).monthly.map((monthData: any) => (
                                        <div key={monthData.month} className="space-y-4">
                                            <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-200 dark:border-slate-600">
                                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h.01a1 1 0 100-2H6zm4 0a1 1 0 000 2h.01a1 1 0 100-2h-.01zm4 0a1 1 0 000 2h.01a1 1 0 100-2h-.01zm2 5a1 1 0 100-2H4v6a2 2 0 002 2h12a2 2 0 002-2v-6h-2z" />
                                                    </svg>
                                                    <span className="font-semibold text-lg">{monthData.monthName} {(data as MonthlyData).year}</span>
                                                </div>
                                            </div>
                                            <PostsList posts={monthData.posts} expandedReviews={expandedReviews} onToggle={toggleReviewsExpanded} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-lg bg-gray-50 dark:bg-slate-800 p-6 text-center">
                                        <p className="text-gray-600 dark:text-gray-400">No data available for this period.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function PostsList({ posts, expandedReviews, onToggle }: { posts: Post[]; expandedReviews: Set<number>; onToggle: (postId: number) => void }) {
    return (
        <div className="space-y-4">
            {Array.isArray(posts) && posts.length > 0 ? (
                posts.map((post: Post) => (
                    <div key={post.postId} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        {/* Post Header */}
                        <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white text-base mb-1">{post.postName}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">By <span className="font-medium text-gray-700 dark:text-gray-300">{post.username}</span></p>

                                    {/* Rating & Stats */}
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <div className="flex items-center gap-2">
                                            <Stars rating={post.averageRating} />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{Number(post.averageRating).toFixed(1)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                                            </svg>
                                            <span><span className="font-semibold text-gray-900 dark:text-white">{post.newReviews}</span> new reviews</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Toggle Reviews Button */}
                                {post.reviewsDetailsList && post.reviewsDetailsList.length > 0 && (
                                    <button
                                        onClick={() => onToggle(post.postId)}
                                        className="px-3 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                                    >
                                        {expandedReviews.has(post.postId) ? "Hide" : "Show"} Reviews
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Reviews List */}
                        {expandedReviews.has(post.postId) && post.reviewsDetailsList && (
                            <div className="bg-gray-50 dark:bg-slate-900/50 p-4 space-y-3">
                                {post.reviewsDetailsList.map((review: Review) => (
                                    <ReviewItem key={review.reviewId} review={review} />
                                ))}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="rounded-lg bg-gray-50 dark:bg-slate-800 p-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400">No posts found for this period.</p>
                </div>
            )}
        </div>
    );
}

function ReviewItem({ review }: { review: Review }) {
    const createdDate = new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const createdTime = new Date(review.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded border border-gray-100 dark:border-slate-700">
            <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                        {review.reviewUsername.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{review.reviewUsername}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{createdDate} at {createdTime}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.round(review.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
            </div>
            {review.comment && (
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{review.comment}</p>
            )}
        </div>
    );
}

function Stars({ rating = 0 }: { rating?: number }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const HalfStarSVG = () => (
        <svg
            className="w-4 h-4"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="halfStarGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="50%" stopColor="#FBBF24" />
                    <stop offset="50%" stopColor="#D1D5DB" />
                </linearGradient>
            </defs>
            <path
                fill="url(#halfStarGradient)"
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
        </svg>
    );

    return (
        <div className="flex items-center gap-0.5">
            {/* Full stars */}
            {Array.from({ length: fullStars }).map((_, i) => (
                <svg
                    key={`full-${i}`}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}

            {/* Half star using gradient */}
            {hasHalfStar && <HalfStarSVG />}

            {/* Empty stars */}
            {Array.from({ length: emptyStars }).map((_, i) => (
                <svg
                    key={`empty-${i}`}
                    className="w-4 h-4 text-gray-300 dark:text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}
